import { getGitHubStats } from "@/lib/github";
import { getPetState } from "@/lib/pet";
import { ASSETS } from "@/lib/assets";

export async function GET() {
  const stats = await getGitHubStats("bel-n");
  const pet = getPetState(stats.currentStreak);

  // No streak: show a message instead of the butterfly
  if (!pet) {
    const svg = `
      <svg width="330" height="330" xmlns="http://www.w3.org/2000/svg">
        <text
          x="165"
          y="155"
          fill="white"
          font-size="20"
          font-weight="bold"
          font-family="Arial, sans-serif"
          text-anchor="middle"
        >
          No Commit Streak yet 
        </text>
        <text
          x="165"
          y="185"
          fill="#999"
          font-size="14"
          font-family="Arial, sans-serif"
          text-anchor="middle"
        >
          Commit today to start one!
        </text>
      </svg>
    `;
    return new Response(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const svg = `
    <svg width="330" height="330" xmlns="http://www.w3.org/2000/svg">
      <image href="${pet.asset}" x="30" y="90" width="250" height="250" />
      <text x="70" y="70" fill="#5f23a7" font-size="16" font-weight="bold" font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif">
        Commit Streak
      </text>

    <text
      x="90"
      y="105"
      fill="#5f23a7"
      font-family="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
    >
      <tspan font-size="32" font-weight="700">
        ${stats.currentStreak}
      </tspan>

      <tspan font-size="16" font-weight="700">
        ${stats.currentStreak === 1 ? "Day" : "Days"}
      </tspan>
    </text>

    </svg>
  `;
  return new Response(svg, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}