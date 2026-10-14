"use client";

import { ArrowLeftRight, TriangleAlert } from "lucide-react";
import { RAIL_ROWS } from "@/lib/track-data";
import type { RailRow } from "@/types/track";
import { TempCell } from "./TempCell";
import { BandLegend } from "./BandLegend";

interface RailGridProps {
  rows?: RailRow[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** Cell ids flagged with a warning badge (e.g. overheating). */
  alertIds?: string[];
}

/** 4-rail locking-temperature grid. Client component: selection is interactive. */
export function RailGrid({ rows = RAIL_ROWS, selectedId, onSelect, alertIds = ["DT-05"] }: RailGridProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-2.5">
        <h2 className="text-[15px] font-bold text-slate-900">Sơ đồ 4 dải ray</h2>
        <span className="flex items-center gap-1 text-[12px] text-slate-500">
          <ArrowLeftRight className="h-3.5 w-3.5" /> Cuộn ngang để theo dõi theo lý trình
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="rounded-md bg-slate-100 px-3 py-1 text-[12.5px] font-semibold text-slate-900">
            Nhiệt độ khóa
          </span>
          <span className="rounded-md px-3 py-1 text-[12.5px] text-slate-400">Tiến độ</span>
          <button className="rounded-md bg-slate-100 px-3 py-1 text-[12.5px] font-semibold text-slate-700">
            Gọn
          </button>
        </div>
      </div>

      <div className="space-y-4 px-4 py-3">
        {rows.map((row) => (
          <div key={row.line + row.rail}>
            <div className="grid grid-cols-[110px_repeat(7,1fr)] items-end gap-x-2">
              <div />
              {row.cells.map((c) => (
                <div key={c.id} className="pb-1 text-center text-[11px] text-slate-500">
                  {c.id}
                  {alertIds.includes(c.id) && (
                    <TriangleAlert className="ml-1 inline h-3.5 w-3.5 text-red-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-[110px_repeat(7,1fr)] items-stretch gap-x-2">
              <div className="leading-tight">
                <div className="text-[11.5px] font-bold text-slate-900">{row.line}</div>
                <div className="text-[11.5px] text-slate-500">{row.rail}</div>
              </div>
              {row.cells.map((c) => (
                <TempCell
                  key={c.id}
                  id={c.id}
                  temp={c.temp}
                  selected={c.id === selectedId}
                  onSelect={onSelect}
                />
              ))}
            </div>
            <div className="mt-1 grid grid-cols-[110px_repeat(7,1fr)] gap-x-2">
              <div />
              {row.cells.map((c) => (
                <div key={c.id} className="flex justify-between text-[10.5px] text-slate-500">
                  <span>{c.from}</span>
                  <span>{c.to}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BandLegend />
    </div>
  );
}
