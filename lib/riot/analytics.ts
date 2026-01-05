import { TftParticipant } from "@/types/riot";

export function averagePlacement(players: TftParticipant[]) {
  const total = players.reduce((sum, p) => sum + p.placement, 0);
  return Number((total / players.length).toFixed(2));
}

export function top4Rate(players: TftParticipant[]) {
  const top4 = players.filter((p) => p.placement <= 4).length;
  return Math.round((top4 / players.length) * 100);
}

export function mostPlayedTrait(players: TftParticipant[]) {
  const traitCount: Record<string, number> = {};

  players.forEach((p) => {
    p.traits.forEach((t) => {
      if (t.tier_current > 0) {
        traitCount[t.name] = (traitCount[t.name] || 0) + 1;
      }
    });
  });

  return Object.entries(traitCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
}
