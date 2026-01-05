import { NextResponse } from "next/server";
import { getAccountByRiotId } from "@/lib/riot/account";
import { getTftMatchIds, getTftMatch } from "@/lib/riot/matches";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const riotId = searchParams.get("riotId");

  if (!riotId) {
    return NextResponse.json({ error: "Missing riotId" }, { status: 400 });
  }

  const [gameName, tagLine] = riotId.split("#");

  try {
    const account = await getAccountByRiotId(gameName, tagLine);
    const matchIds = await getTftMatchIds(account.puuid, 5);
    const matches = await Promise.all(matchIds.map((id) => getTftMatch(id)));

    return NextResponse.json({
      account,
      matches,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
