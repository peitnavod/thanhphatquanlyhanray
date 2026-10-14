import { TRACK_EVENTS } from "@/lib/track-data";

interface LegendEntry {
  glyph: string;
  vi: string;
  en: string;
}

function LegendGlyph({ kind }: { kind: string }) {
  const stroke = "#c2571a";
  if (kind === "left")
    return (
      <svg width="34" height="22" viewBox="0 0 34 22">
        <path d="M2 20 H30 M2 20 L14 20 L26 4" stroke={stroke} strokeWidth="1.6" fill="none" />
      </svg>
    );
  if (kind === "right")
    return (
      <svg width="34" height="22" viewBox="0 0 34 22">
        <path d="M4 20 H32 M14 4 L26 20" stroke={stroke} strokeWidth="1.6" fill="none" />
      </svg>
    );
  if (kind === "cross")
    return (
      <svg width="30" height="22" viewBox="0 0 30 22">
        <path d="M4 4 L26 18 M26 4 L4 18" stroke="#334155" strokeWidth="1.5" fill="none" />
        <path d="M15 2 L19 11 L15 20 L11 11 Z" stroke="#334155" strokeWidth="1.3" fill="none" />
      </svg>
    );
  if (kind === "diamond")
    return (
      <svg width="34" height="22" viewBox="0 0 34 22">
        <path d="M2 6 L12 11 L2 16 M32 6 L22 11 L32 16 M12 11 H22" stroke="#334155" strokeWidth="1.5" fill="none" />
      </svg>
    );
  if (kind === "bridge")
    return (
      <svg width="38" height="22" viewBox="0 0 38 22">
        <path d="M8 3 V19 M30 3 V19 M8 6 H30 M8 16 H30" stroke="#1d4ed8" strokeWidth="1.8" />
      </svg>
    );
  if (kind === "tunnel")
    return (
      <svg width="34" height="22" viewBox="0 0 34 22">
        <path d="M7 20 V12 A10 10 0 0 1 27 12 V20" fill="#94a3b8" stroke="#475569" strokeWidth="1.4" />
        <path d="M12 20 V13 A5 5 0 0 1 22 13 V20" fill="#475569" />
      </svg>
    );
  if (kind === "enter")
    return (
      <svg width="10" height="30" viewBox="0 0 10 30">
        <line x1="5" y1="2" x2="5" y2="28" stroke="#c2571a" strokeWidth="1.6" strokeDasharray="3 2" />
      </svg>
    );
  return <span className="inline-block h-[18px] w-[34px] bg-[#f6c9cd]" />;
}

const LEGEND: LegendEntry[] = [
  { glyph: "left", vi: "Ghi rẽ trái", en: "Left turnout" },
  { glyph: "right", vi: "Ghi rẽ phải", en: "Right turnout" },
  { glyph: "cross", vi: "Ghi bắt chéo", en: "Crossing" },
  { glyph: "diamond", vi: "Ghi hình thoi", en: "Diamond crossing" },
  { glyph: "bridge", vi: "Cầu", en: "Bridge" },
  { glyph: "tunnel", vi: "Hầm", en: "Tunnel" },
  { glyph: "enter", vi: "Đầu cầu / Đầu hầm", en: "Bridge/Tunnel entrance" },
  { glyph: "enter", vi: "Cuối cầu / Cuối hầm", en: "Bridge/Tunnel exit" },
  { glyph: "zone", vi: "Vùng hạn chế hàn ray", en: "Non-welding zone" },
];

const KM_TICKS = ["Km 0+000", "Km 1", "Km 2", "Km 3", "Km 4", "Km 5", "Km 6", "Km 7", "Km 8", "Km 9", "Km 9", "Km 10+000"];

interface TrackSchematicProps {
  title?: string;
}

/** Linear 0–10 km schematic with structure symbols and non-welding zones.
 *  Pure presentational server component — no browser APIs. */
export function TrackSchematic({ title = "Ký hiệu công trình (theo tiêu chuẩn quốc tế)" }: TrackSchematicProps) {
  const zonedEvents = TRACK_EVENTS.filter((e) => e.span !== undefined);
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white px-4 pb-2 pt-3">
      <p className="text-[12.5px] font-semibold text-slate-900">{title}</p>
      <div className="mt-2 flex flex-wrap items-start gap-x-6 gap-y-2">
        {LEGEND.map((l, i) => (
          <div key={`${l.vi}-${i}`} className="flex items-center gap-1.5">
            <LegendGlyph kind={l.glyph} />
            <div className="leading-tight">
              <div className="text-[11px] text-slate-700">{l.vi}</div>
              <div className="text-[10px] text-slate-400">{l.en}</div>
            </div>
          </div>
        ))}
      </div>

      {/* linear map */}
      <div className="relative mt-5">
        {/* event labels */}
        <div className="relative h-[38px]">
          {TRACK_EVENTS.map((e) => (
            <div
              key={e.label}
              className="absolute -translate-x-1/2 text-center"
              style={{ left: `${e.at * 100}%` }}
            >
              <div className="text-[11px] font-semibold text-slate-800">{e.label}</div>
              <div className="whitespace-nowrap text-[10px] text-slate-500">{e.km}</div>
            </div>
          ))}
        </div>
        {/* non-welding pink bands */}
        <div className="relative h-[14px]">
          {zonedEvents.map((e) => {
            const [from, to] = e.span ?? [0, 0];
            return (
              <div
                key={e.label}
                className="absolute top-0 h-full bg-[#f6c9cd]/90"
                style={{ left: `${from * 100}%`, width: `${(to - from) * 100}%` }}
              />
            );
          })}
          {/* base rails */}
          <div className="absolute top-[5px] h-[3px] w-full rounded bg-[#2ca15f]" />
          {/* orange joint segments */}
          {[0.082, 0.21, 0.235, 0.48, 0.56, 0.675, 0.79, 0.811, 0.92, 0.98].map((p, i) => (
            <div key={i} className="absolute top-[5px] h-[3px] w-[14px] bg-[#e8930c]" style={{ left: `calc(${p * 100}% - 7px)` }} />
          ))}
          {/* turnout crosses */}
          {[0.082, 0.675].map((p) => (
            <div key={p} className="absolute top-[-4px] text-[16px] font-bold text-red-500" style={{ left: `calc(${p * 100}% - 7px)` }}>
              ✕
            </div>
          ))}
          {/* bridge portals */}
          {[0.21, 0.235, 0.79, 0.811].map((p) => (
            <div key={p} className="absolute top-[-3px] h-[18px] w-[5px] rounded-sm bg-blue-600" style={{ left: `calc(${p * 100}% - 2px)` }} />
          ))}
          {/* tunnel icons */}
          {[0.52, 0.95].map((p) => (
            <div key={p} className="absolute top-[-10px] -translate-x-1/2" style={{ left: `${p * 100}%` }}>
              <svg width="34" height="24" viewBox="0 0 34 24">
                <path d="M4 22 V12 A13 11 0 0 1 30 12 V22" fill="#7d8ea3" stroke="#475569" strokeWidth="1.4" />
                <path d="M11 22 V13 A6 6 0 0 1 23 13 V22" fill="#334155" />
              </svg>
            </div>
          ))}
        </div>
        {/* km ticks */}
        <div className="relative mt-1 flex justify-between text-[11px] text-slate-600">
          {KM_TICKS.map((k, i) => (
            <span key={`${k}-${i}`} className="relative">
              <span className="absolute -top-[9px] left-1/2 h-[6px] w-px -translate-x-1/2 bg-slate-500" />
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
