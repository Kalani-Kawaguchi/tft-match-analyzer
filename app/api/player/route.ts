import { NextResponse } from "next/server";
import { getAccountByRiotId } from "@/lib/riot/account";
import { getTftMatchIds, getTftMatch } from "@/lib/riot/matches";
import { getPlayerFromMatch } from "@/lib/riot/parser";
import {
  averagePlacement,
  top4Rate,
  mostPlayedTrait,
} from "@/lib/riot/analytics";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const riotId = searchParams.get("riotId");

  if (!riotId) {
    return NextResponse.json({ error: "Missing riotId" }, { status: 400 });
  }

  const [gameName, tagLine] = riotId.split("#");

  try {
    const account = await getAccountByRiotId(gameName, tagLine);
    const matchIds = await getTftMatchIds(account.puuid, 15);
    const matches = await Promise.all(matchIds.map((id) => getTftMatch(id)));

    const players = matches
      .map((m) => getPlayerFromMatch(m, account.puuid))
      .filter((p): p is NonNullable<typeof p> => p !== null);

    const analytics = {
      averagePlacement: averagePlacement(players),
      top4Rate: top4Rate(players),
      mostPlayedTraits: mostPlayedTrait(players),
    };

    return NextResponse.json({
      account,
      analytics,
      matches,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
