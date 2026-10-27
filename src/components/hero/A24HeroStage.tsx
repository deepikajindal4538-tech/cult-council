"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { ISociety } from "@/models/Society";
import { createDiscTexture } from "./textures";

interface A24HeroStageProps {
  societies: (ISociety | any)[];
  onIndexChange?: (index: number) => void;
  externalProgress?: number;
}

export function A24HeroStage({
  societies,
  onIndexChange,
  externalProgress,
}: A24HeroStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const n = societies.length;

  const stateRef = useRef({
    currentProgress: 0,
    targetProgress: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartProgress: 0,
    mouseX: 0,
    mouseY: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  // Sync external scroll progress if provided
  useEffect(() => {
    if (externalProgress !== undefined && !stateRef.current.isDragging) {
      stateRef.current.targetProgress = externalProgress * (n - 1);
    }
  }, [externalProgress, n]);

  const notifyIndexChange = useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      if (onIndexChange) onIndexChange(idx);
    },
    [onIndexChange]
  );

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Realistic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 1.6);
    rimLight.position.set(-6, -2, 3);
    scene.add(rimLight);

    const topFill = new THREE.PointLight(0xffedd5, 1.5, 20);
    topFill.position.set(0, 4, 3);
    scene.add(topFill);

    // 3. Build 3D Discs for Each Society
    const discGroup = new THREE.Group();
    scene.add(discGroup);

    const discMeshes: THREE.Group[] = [];

    societies.forEach((soc, i) => {
      const singleDiscGroup = new THREE.Group();

      // Disc Face Canvas Texture
      const textureCanvas = createDiscTexture(soc);
      const faceTexture = new THREE.CanvasTexture(textureCanvas);
      faceTexture.anisotropy = 8;
      faceTexture.generateMipmaps = true;

      // Outer silver beveled disc chassis
      const discGeo = new THREE.CylinderGeometry(1.65, 1.65, 0.035, 64);

      // Face materials: Top = Custom Canvas Texture, Side = Metallic Rim, Bottom = Metallic Backing
      const rimMaterial = new THREE.MeshStandardMaterial({
        color: 0xd8d4cc,
        roughness: 0.25,
        metalness: 0.85,
      });

      const faceMaterial = new THREE.MeshStandardMaterial({
        map: faceTexture,
        roughness: 0.35,
        metalness: 0.2,
      });

      const backMaterial = new THREE.MeshStandardMaterial({
        color: 0xc8c2b5,
        roughness: 0.25,
        metalness: 0.8,
      });

      const materials = [rimMaterial, faceMaterial, backMaterial];
      const discMesh = new THREE.Mesh(discGeo, materials);
      // Face camera (rotate cylinder so flat top faces Z)
      discMesh.rotation.x = Math.PI / 2;
      singleDiscGroup.add(discMesh);

      // Inner Transparent Acrylic Spindle Hub
      const spindleGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.04, 32);
      const spindleMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.65,
        roughness: 0.1,
        transmission: 0.85,
        ior: 1.45,
      });
      const spindleMesh = new THREE.Mesh(spindleGeo, spindleMat);
      spindleMesh.rotation.x = Math.PI / 2;
      singleDiscGroup.add(spindleMesh);

      // Center Spindle Hole Cutout Ring
      const holeRimGeo = new THREE.TorusGeometry(0.2, 0.015, 16, 32);
      const holeRimMat = new THREE.MeshStandardMaterial({
        color: 0x8a8478,
        roughness: 0.3,
        metalness: 0.7,
      });
      const holeRimMesh = new THREE.Mesh(holeRimGeo, holeRimMat);
      singleDiscGroup.add(holeRimMesh);

      // Store initial index metadata
      singleDiscGroup.userData = { index: i, slug: soc.slug };

      discGroup.add(singleDiscGroup);
      discMeshes.push(singleDiscGroup);
    });

    // 4. Parabolic 3D Curve Placement (Matching the uploaded A24 screenshot)
    let animationFrameId: number;
    let lastReportedIndex = -1;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth inertia damping toward target progress
      stateRef.current.currentProgress +=
        (stateRef.current.targetProgress - stateRef.current.currentProgress) * 0.085;

      const p = stateRef.current.currentProgress;

      // Identify active centered index
      const centerIdx = Math.min(n - 1, Math.max(0, Math.round(p)));
      if (centerIdx !== lastReportedIndex) {
        lastReportedIndex = centerIdx;
        notifyIndexChange(centerIdx);
      }

      // Parallax mouse tilt
      const targetRotX = stateRef.current.mouseY * 0.12;
      const targetRotY = stateRef.current.mouseX * 0.15;
      discGroup.rotation.x += (targetRotX - discGroup.rotation.x) * 0.05;
      discGroup.rotation.y += (targetRotY - discGroup.rotation.y) * 0.05;

      // Position each disc along the signature A24 upward arc
      discMeshes.forEach((mesh, i) => {
        const delta = i - p;

        // X: Horizontal stride
        const x = delta * 2.85;

        // Y: Distinct gentle upward parabolic arc seen in A24 reference
        const y = -Math.pow(delta, 2) * 0.14 + delta * 0.42 - 0.15;

        // Z: Center disc is closest; left discs recede back; right disc enters forward
        const z = -Math.abs(delta) * 0.95 + delta * 0.35;

        mesh.position.set(x, y, z);

        // Scale: Center = 1.05, Left = ~0.8, Right = ~1.2
        const baseScale = Math.max(0.45, 1.05 - Math.abs(delta) * 0.22 + delta * 0.1);
        mesh.scale.set(baseScale, baseScale, baseScale);

        // Rotation: subtle tilt and rotation around Z/Y as they travel along the curve
        mesh.rotation.z = -delta * 0.16 + 0.04;
        mesh.rotation.y = -delta * 0.22;
        mesh.rotation.x = Math.PI * 0.04;
      });

      renderer.render(scene, camera);
    };

    animate();

    // 5. User Input Handling: Wheel, Drag & Touch for Momentum
    const onWheel = (e: WheelEvent) => {
      // Do not block page scroll if at boundaries
      const delta = (e.deltaY || e.deltaX) * 0.0022;
      stateRef.current.targetProgress = Math.min(
        n - 1 + 0.35,
        Math.max(-0.35, stateRef.current.targetProgress + delta)
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartX = e.clientX;
      stateRef.current.dragStartProgress = stateRef.current.targetProgress;
    };

    const onPointerMove = (e: PointerEvent) => {
      // Mouse coordinates for parallax
      const rect = container.getBoundingClientRect();
      stateRef.current.mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      stateRef.current.mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.dragStartX;
      const progressDelta = -dx / (width * 0.35);
      stateRef.current.targetProgress = Math.min(
        n - 1 + 0.35,
        Math.max(-0.35, stateRef.current.dragStartProgress + progressDelta)
      );
    };

    const onPointerUp = () => {
      if (stateRef.current.isDragging) {
        stateRef.current.isDragging = false;
        // Snap gently to nearest integer index
        stateRef.current.targetProgress = Math.min(
          n - 1,
          Math.max(0, Math.round(stateRef.current.targetProgress))
        );
      }
    };

    // Click disc to bring to center
    const onRaycastClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(discGroup.children, true);

      if (intersects.length > 0) {
        let parent: THREE.Object3D | null = intersects[0].object;
        while (parent && parent.parent !== discGroup) {
          parent = parent.parent;
        }
        if (parent && parent.userData?.index !== undefined) {
          stateRef.current.targetProgress = parent.userData.index;
        }
      }
    };

    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("click", onRaycastClick);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("click", onRaycastClick);
      window.removeEventListener("resize", onResize);

      // Dispose 3D resources
      renderer.dispose();
      discGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [societies, n, notifyIndexChange]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
      style={{ touchAction: "none" }}
    />
  );
}
