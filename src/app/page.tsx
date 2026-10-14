import { TrackDashboard } from "@/components/track";

/** Server-component route: renders the client dashboard boundary. */
export default function Home() {
  return (
    <main className="min-h-screen bg-[#edf1f5] p-3 text-slate-900">
      <TrackDashboard />
    </main>
  );
}
