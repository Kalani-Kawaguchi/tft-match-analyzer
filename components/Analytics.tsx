import PlacementChart from "./PlacementChart";

type Props = {
  data: any;
};

export default function Analytics({ data }: Props) {
  const { analytics, matches } = data;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Avg Placement" value={analytics.averagePlacement} />
        <StatCard label="Top 4 Rate" value={`${analytics.top4Rate}%`} />
        <StatCard label="Matches" value={matches.length} />
      </div>
      <TraitList traits={analytics.mostPlayedTraits} />
      <PlacementChart matches={matches} />
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded bg-neutral-900 p-4">
      <p className="text-sm text-neutral-400">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function TraitList({ traits }: { traits: [string, number][] }) {
  return (
    <div className="rounded bg-neutral-900 p-4">
      <h2 className="mb-2 text-lg font-semibold">Most Played Traits</h2>
      <ul className="space-y-1">
        {traits.map(([name, count]) => (
          <li key={name} className="flex justify-between">
            <span>{name}</span>
            <span className="text-neutral-400">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
