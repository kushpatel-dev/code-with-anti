// src/components/ModuleCard.jsx
import { LEVEL_COLORS } from "../data/modules";

const S = {
  bar:    { position: "absolute", top: 0, left: 0, right: 0, height: 3 },
  top:    { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
  icon:   { fontSize: 32 },
  fav:    { background: "none", border: "none", fontSize: 18, cursor: "pointer", padding: 4, lineHeight: 1, borderRadius: 6, minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" },
  badge:  { fontSize: 11, fontWeight: 700, border: "1px solid", borderRadius: 20, padding: "2px 10px", textTransform: "uppercase", letterSpacing: 0.5 },
  title:  { fontSize: 15, fontWeight: 800, color: "#f1f5f9", marginBottom: 4, lineHeight: 1.3 },
  meta:   { fontSize: 12, color: "#475569", marginBottom: 10 },
  barBg:  { flex: 1, height: 4, background: "#1e293b", borderRadius: 99, overflow: "hidden" },
  barFill:{ height: "100%", borderRadius: 99, transition: "width .4s" },
  pRow:   { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 },
  pct:    { fontSize: 12, color: "#64748b", minWidth: 32, textAlign: "right" },
  foot:   { textAlign: "right", fontSize: 12, fontWeight: 700 },
};

export default function ModuleCard({ mod, progress, isFav, onToggleFav, onClick }) {
  const done = Object.keys(progress || {}).length;
  const pct  = mod.lessons.length ? Math.round((done / mod.lessons.length) * 100) : 0;
  const lc   = LEVEL_COLORS[mod.level];

  return (
    <div className="module-card" style={{ borderColor: isFav ? "#22d3ee44" : undefined }} onClick={onClick}>
      <div style={{ ...S.bar, background: mod.color }} />

      <div style={S.top}>
        <span style={S.icon}>{mod.icon}</span>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          {/* Favorite toggle */}
          <button
            style={{ ...S.fav, color: isFav ? "#f43f5e" : "#334155" }}
            title={isFav ? "Remove from My Modules" : "Add to My Modules"}
            onClick={e => { e.stopPropagation(); onToggleFav(mod.id); }}
          >
            {isFav ? "❤️" : "🤍"}
          </button>
          <span style={{ ...S.badge, color: lc, background: lc + "18", borderColor: lc + "44" }}>{mod.level}</span>
        </div>
      </div>

      <div style={S.title}>{mod.title}</div>
      <div style={S.meta}>{mod.duration} · {mod.lessons.length} tasks</div>

      <div style={S.pRow}>
        <div style={S.barBg}>
          <div style={{ ...S.barFill, width: `${pct}%`, background: mod.color }} />
        </div>
        <span style={S.pct}>{pct}%</span>
      </div>

      <div style={S.foot}>
        {pct === 100
          ? <span style={{ color: "#22c55e" }}>✓ Completed</span>
          : pct > 0
          ? <span style={{ color: "#22d3ee" }}>→ Continue</span>
          : <span style={{ color: "#64748b" }}>▶ Start</span>}
      </div>
    </div>
  );
}
