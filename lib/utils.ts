import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a GitHub repository URL and extracts owner and repo name
 * @param url - Full GitHub repository URL
 * @returns Object with repoOwner and repoName, or null if invalid
 */
export function parseGithubRepoUrl(url: string): { repoOwner: string; repoName: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    return null;
  }
  const [, repoOwner, repoName] = match;
  return {
    repoOwner,
    repoName: repoName.replace(/\.git$/, ""),
  };
}
