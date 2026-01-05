const RIOT_API_KEY = process.env.RIOT_API_KEY;

if (!RIOT_API_KEY) {
  throw new Error("Missing Riot API Key");
}

export async function riotFetch<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { "X-Riot-Token": RIOT_API_KEY as string },
  });

  if (!res.ok) {
    throw new Error(`Riot API Error: ${res.status}`);
  }

  return res.json();
}
