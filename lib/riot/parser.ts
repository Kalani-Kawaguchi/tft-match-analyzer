import { TftMatch, TftParticipant } from "@/types/riot";

export function getPlayerFromMatch(
  match: TftMatch,
  puuid: string
): TftParticipant | null {
  return match.info.participants.find((p) => p.puuid === puuid) ?? null;
}
