import { type Project } from "@/projects";

export type ReadinessFactorKey = "status" | "location" | "scale" | "model" | "objectives" | "partnership";

export type ReadinessFactor = {
  key: ReadinessFactorKey;
  points: number;
  max: number;
};

export type ProjectReadiness = {
  score: number;
  factors: ReadinessFactor[];
};

type ReadinessProject = Omit<Project, "status"> & { status?: Project["status"] | "" };

/**
 * Measures how complete the published project profile is. It is not a
 * financing, investment, legal, or technical due-diligence rating.
 */
export function projectReadiness(project: ReadinessProject): ProjectReadiness {
  const factors: ReadinessFactor[] = [
    { key: "status", points: project.status ? 15 : 0, max: 15 },
    { key: "location", points: project.location ? 15 : 0, max: 15 },
    { key: "scale", points: project.scale ? 15 : 0, max: 15 },
    { key: "model", points: project.model ? 15 : 0, max: 15 },
    { key: "objectives", points: Math.min(project.objectives.length, 4) * 5, max: 20 },
    { key: "partnership", points: Math.min(project.partnership.length, 4) * 5, max: 20 },
  ];

  return {
    score: factors.reduce((total, factor) => total + factor.points, 0),
    factors,
  };
}
