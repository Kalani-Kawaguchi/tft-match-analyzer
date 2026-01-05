import { riotFetch } from "./client";
import { TftMatch } from "@/types/riot";

const AMERICA_BASE = "https://americas.api.riotgames.com";

export async function getTftMatchIds(puuid: string, count = 20) {
  return riotFetch<string[]>(
    `${AMERICA_BASE}/tft/match/v1/matches/by-puuid/${puuid}/ids?count=${count}`
  );
}

export async function getTftMatch(matchId: string) {
  return riotFetch<TftMatch>(`${AMERICA_BASE}/tft/match/v1/matches/${matchId}`);
}
