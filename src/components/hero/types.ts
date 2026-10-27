import { ISociety } from "@/models/Society";

export interface SocietyObjectProps {
  society: ISociety | any;
  isActive: boolean;
  progress: number; // 0 to 1 progress within this society's slice
  globalProgress?: number; // 0 to 1 across entire hero scroll
  isReducedMotion?: boolean;
}

/**
 * Standard interface for Society 3D/Visual objects.
 * Enables drop-in replacement by React Three Fiber / Drei Draco GLB loaders in future phases.
 */
export interface ISocietyVisualObject {
  id: string;
  name: string;
  type: string;
  modelUrl?: string;
  fallbackImageUrl?: string;
  color: string;
}
