import assert from "node:assert";
import { isAllowedMethod, ALLOWED_FLICKR_METHODS } from "../lib/flickr/allowlist";
import { albumIdSchema, paginationQuerySchema } from "../lib/flickr/schemas";
import { transformAlbumsList, transformAlbumPhotos } from "../lib/flickr/transform";
import { cache } from "../lib/cache";
import { rateLimiter } from "../lib/rateLimit";
import { getAlbums, getAlbumPhotos, FlickrClientError } from "../lib/flickr/client";

// Set test environment variables
process.env.FLICKR_API_KEY = "test_api_key_123";
process.env.FLICKR_USER_ID = "test_user_id_456";

console.log("=========================================");
console.log("  Running Flickr Wrapper Test Suite      ");
console.log("=========================================\n");

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void | Promise<void>) {
  return Promise.resolve()
    .then(fn)
    .then(() => {
      console.log(`✓ PASS: ${name}`);
      passed++;
    })
    .catch((err) => {
      console.error(`✗ FAIL: ${name}`);
      console.error("  ", err);
      failed++;
    });
}

async function runTests() {
  // Test 1: Allowlist
  await test("Allowlist accepts allowed methods and rejects arbitrary ones", () => {
    assert.strictEqual(isAllowedMethod("flickr.photosets.getList"), true);
    assert.strictEqual(isAllowedMethod("flickr.photosets.getPhotos"), true);
    assert.strictEqual(isAllowedMethod("flickr.people.getPhotos"), false);
    assert.strictEqual(isAllowedMethod("flickr.photos.delete"), false);
    assert.strictEqual(isAllowedMethod("arbitrary.injection"), false);
  });

  // Test 2: Input validation
  await test("Album ID validation accepts valid numeric string and rejects bad inputs", () => {
    assert.strictEqual(albumIdSchema.parse("72177720310234567"), "72177720310234567");
    assert.throws(() => albumIdSchema.parse(""), /Album ID is required/);
    assert.throws(() => albumIdSchema.parse("abc-123"), /must be a numeric string/);
    assert.throws(() => albumIdSchema.parse("../etc/passwd"), /must be a numeric string/);
    assert.throws(() => albumIdSchema.parse("<script>alert(1)</script>"), /must be a numeric string/);
  });

  // Test 3: Pagination validation
  await test("Pagination query enforces boundaries (page >= 1, per_page <= 50)", () => {
    const valid = paginationQuerySchema.parse({ page: 2, per_page: 30 });
    assert.strictEqual(valid.page, 2);
    assert.strictEqual(valid.per_page, 30);

    const defaulted = paginationQuerySchema.parse({});
    assert.strictEqual(defaulted.page, 1);
    assert.strictEqual(defaulted.per_page, 20);

    assert.throws(() => paginationQuerySchema.parse({ page: 0 }));
    assert.throws(() => paginationQuerySchema.parse({ per_page: 51 }));
  });

  // Test 4: Transform photosets list
  await test("Transform photosets list strips sensitive internals and produces trimmed schema", () => {
    const mockRawFlickrResponse = {
      stat: "ok",
      photosets: {
        page: 1,
        pages: 2,
        perpage: 10,
        total: 15,
        photoset: [
          {
            id: "72177720310001",
            primary: "53000001",
            secret: "abc123secret",
            server: "65535",
            photos: 42,
            title: { _content: "Effervescence 2025 Pro-Nights" },
            description: { _content: "Highlights from the concert night." },
            date_create: "1729000000",
          },
        ],
      },
    };

    const transformed = transformAlbumsList(mockRawFlickrResponse);
    assert.strictEqual(transformed.total, 15);
    assert.strictEqual(transformed.albums.length, 1);
    assert.strictEqual(transformed.albums[0].id, "72177720310001");
    assert.strictEqual(transformed.albums[0].title, "Effervescence 2025 Pro-Nights");
    assert.strictEqual(transformed.albums[0].photoCount, 42);
    assert.strictEqual(
      transformed.albums[0].coverImageUrl,
      "https://live.staticflickr.com/65535/53000001_abc123secret_b.jpg"
    );
    // Secret and server should not be directly exposed as root fields
    assert.strictEqual((transformed.albums[0] as any).secret, undefined);
    assert.strictEqual((transformed.albums[0] as any).server, undefined);
  });

  // Test 5: Transform photos
  await test("Transform photos list generates standardized URLs with fixed sizes", () => {
    const mockRawPhotoResponse = {
      stat: "ok",
      photoset: {
        id: "72177720310001",
        title: "Effervescence 2025",
        total: 1,
        page: 1,
        perpage: 20,
        pages: 1,
        photo: [
          {
            id: "53000001",
            secret: "sec890",
            server: "65535",
            title: "Rock Band Performance",
            width_b: 1920,
            height_b: 1080,
          },
        ],
      },
    };

    const transformed = transformAlbumPhotos("72177720310001", mockRawPhotoResponse);
    assert.strictEqual(transformed.photos.length, 1);
    const photo = transformed.photos[0];
    assert.strictEqual(photo.id, "53000001");
    assert.strictEqual(photo.title, "Rock Band Performance");
    assert.strictEqual(photo.thumbnailUrl, "https://live.staticflickr.com/65535/53000001_sec890_q.jpg");
    assert.strictEqual(photo.displayUrl, "https://live.staticflickr.com/65535/53000001_sec890_z.jpg");
    assert.strictEqual(photo.fullUrl, "https://live.staticflickr.com/65535/53000001_sec890_b.jpg");
    assert.strictEqual(photo.width, 1920);
    assert.strictEqual(photo.height, 1080);
  });

  // Test 6: Mock client call with caching
  await test("Mock Flickr client fetches, transforms, and caches responses", async () => {
    cache.clear();
    let fetchCount = 0;

    const mockFetcher = (async (url: string | URL | Request) => {
      fetchCount++;
      return new Response(
        JSON.stringify({
          stat: "ok",
          photosets: {
            page: 1,
            pages: 1,
            perpage: 20,
            total: 1,
            photoset: [
              {
                id: "72177720310002",
                primary: "53000002",
                secret: "sec999",
                server: "65535",
                photos: 10,
                title: { _content: "Rangoli 2025" },
                description: { _content: "Folk and traditional fests" },
              },
            ],
          },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }) as unknown as typeof fetch;

    // First fetch - should hit mockFetcher
    const result1 = await getAlbums({ page: 1, per_page: 20 }, mockFetcher);
    assert.strictEqual(fetchCount, 1);
    assert.strictEqual(result1.albums[0].title, "Rangoli 2025");

    // Second fetch - should hit cache, NOT mockFetcher
    const result2 = await getAlbums({ page: 1, per_page: 20 }, mockFetcher);
    assert.strictEqual(fetchCount, 1, "Expected fetchCount to remain 1 due to cache hit");
    assert.strictEqual(result2.albums[0].title, "Rangoli 2025");
  });

  // Test 7: Error masking
  await test("Upstream Flickr failures (stat: fail) are shielded and return generic error", async () => {
    cache.clear();
    const failingFetcher = (async () => {
      return new Response(
        JSON.stringify({
          stat: "fail",
          code: 1,
          message: "Photoset not found (internal Flickr database message)",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }) as unknown as typeof fetch;

    await assert.rejects(
      async () => {
        await getAlbumPhotos("99999999", { page: 1, per_page: 20 }, failingFetcher);
      },
      (err: any) => {
        assert(err instanceof FlickrClientError);
        // Error message must NOT leak internal Flickr message or error code
        assert.strictEqual(err.message, "Requested album or photo collection could not be retrieved.");
        assert.strictEqual(err.statusCode, 404);
        return true;
      }
    );
  });

  // Test 8: Rate Limiter
  await test("Rate limiter tracks IP calls and limits exceeding threshold", () => {
    const testIp = "192.168.1.100";
    let lastResult;
    for (let i = 0; i < 60; i++) {
      lastResult = rateLimiter.check(testIp);
      assert.strictEqual(lastResult.success, true);
    }
    // 61st call should be rejected
    const blocked = rateLimiter.check(testIp);
    assert.strictEqual(blocked.success, false);
    assert.strictEqual(blocked.remaining, 0);
  });

  console.log("\n=========================================");
  console.log(`  Tests completed: ${passed} passed, ${failed} failed`);
  console.log("=========================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
