"use client";

import { useState } from "react";
import { DEFAULT_CELL_ID, getCellById, stepCellId } from "@/lib/track-data";
import { TrackHeader } from "./TrackHeader";
import { TrackSchematic } from "./TrackSchematic";
import { RailGrid } from "./RailGrid";
import { DetailPanel } from "./DetailPanel";

interface TrackDashboardProps {
  initialCellId?: string;
}

/** Client boundary for the dashboard: owns the selected-cell state and
 *  composes server-capable presentational components. */
export function TrackDashboard({ initialCellId = DEFAULT_CELL_ID }: TrackDashboardProps) {
  const [selectedId, setSelectedId] = useState(initialCellId);
  const cell = getCellById(selectedId) ?? getCellById(DEFAULT_CELL_ID);

  if (!cell) return null;

  return (
    <div className="mx-auto max-w-[1280px] space-y-3">
      <TrackHeader />
      <TrackSchematic />
      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[1fr_330px]">
        <RailGrid selectedId={cell.id} onSelect={setSelectedId} />
        <DetailPanel
          cell={cell}
          onPrev={() => setSelectedId((id) => stepCellId(id, -1))}
          onNext={() => setSelectedId((id) => stepCellId(id, 1))}
        />
      </div>
    </div>
  );
}
