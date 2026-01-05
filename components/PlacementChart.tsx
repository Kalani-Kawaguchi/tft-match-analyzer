import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PlacementChart({ matches }: { matches: any[] }) {
  const data = matches.map((m, i) => {
    const player = m.info.participants.find((p: any) => p.puuid);

    return {
      game: i + 1,
      placement: player?.placement,
    };
  });

  return (
    <div className="h-64 rounded bg-neutral-900 p-4">
      <h2 className="mb-2 text-lg font-semibold">Placement Over Time</h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="game" />
          <YAxis reversed domain={[1, 8]} />
          <Tooltip />
          <Line type="monotone" dataKey="placement" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
