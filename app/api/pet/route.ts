import { getGitHubStats } from "@/lib/github";
import { getPetState } from "@/lib/pet";
import { ASSETS } from "@/lib/assets";

export async function GET() {
  const stats = await getGitHubStats("bel-n");

  const pet = getPetState(stats.currentStreak);

  if (!pet) {
    return new Response("", {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  }

  const svg = `
    <svg
      width="330"
      height="330"
      xmlns="http://www.w3.org/2000/svg"
    >
 
      <image
        href="${pet.asset}"        
        x="60"
        y="60"
        width="125"
        height="125"
      />
      <text
        x="70"
        y="70"
        fill="black"
        font-size="32"
        font-weight="bold"
        font-family="Chalkduster, fantasy"
      >
        Commit Streak
      </text>
      <text
        x="90"
        y="105"
        fill="white"
        font-family="Chalkduster, fantasy"
      >
        <tspan font-size="16" font-weight="bold"> 
          ${stats.currentStreak}
        </tspan>

        <tspan font-size="16" font-weight="bold">
          Days
        </tspan>
      </text>

    </svg>
  `;
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml", //tells the browser this is an SVG image
    },
  });
}

