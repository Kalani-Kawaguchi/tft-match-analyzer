import { riotFetch } from "./client";

const AMERICA_BASE = "https://americas.api.riotgames.com";

export async function getAccountByRiotId(gameName: string, tagLine: string) {
  return riotFetch<{
    puuid: string;
    gameName: string;
    tagLine: string;
  }>(
    `${AMERICA_BASE}/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      gameName
    )}/${encodeURIComponent(tagLine)}`
  );
}
