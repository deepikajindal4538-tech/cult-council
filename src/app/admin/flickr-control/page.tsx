import React from "react";
import FlickrControlClient from "@/components/admin/FlickrControlClient";

export const metadata = {
  title: "Flickr Master Control & Visual Media Terminal | Cultural Council IIIT Allahabad",
  description: "Administrative control center for Flickr API gateway, emergency kill switches, and website media assets inventory.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function FlickrControlPage() {
  return <FlickrControlClient />;
}
