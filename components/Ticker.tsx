"use client";

const TICKER_DATA = [
  { sym: "KMF-DASH", chg: "▲ LIVE", cls: "up" },
  { sym: "OLIVE-CAP", chg: "▲ LIVE", cls: "up" },
  { sym: "DCF-VALUATION", chg: "SHIPPED", cls: "flat" },
  { sym: "MONTE-CARLO", chg: "▲ RISK MODEL", cls: "up" },
  { sym: "ADV-EXCEL", chg: "PROFICIENT", cls: "flat" },
  { sym: "POWER-BI", chg: "PROFICIENT", cls: "flat" },
  { sym: "MBA-FIN", chg: "PES UNIVERSITY", cls: "flat" },
  { sym: "PYTHON", chg: "▲ APPLIED", cls: "up" },
];

export default function Ticker() {
  const rows = [0, 1, 2].flatMap((r) =>
    TICKER_DATA.map((d, i) => (
      <span className="ticker-item" key={`${r}-${i}`}>
        {d.sym} <b className={d.cls}>{d.chg}</b>
      </span>
    ))
  );

  return (
    <div className="ticker-bar">
      <div className="ticker-track">{rows}</div>
    </div>
  );
}
