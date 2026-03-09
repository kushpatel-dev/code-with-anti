// src/components/Progress.jsx
import { LEARNING_MODULES } from "../data/modules";

const S = {
  h1:       { fontSize: 28, fontWeight: 900, color: "#f1f5f9", letterSpacing: -0.5, margin: 0, marginBottom: 4 },
  sub:      { fontSize: 14, color: "#64748b", marginTop: 4, marginBottom: 28 },
  statLbl:  { fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  statVal:  { fontSize: 30, fontWeight: 900 },
  modList:  { display: "flex", flexDirection: "column", gap: 12 },
  modRow:   { background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: "16px 20px" },
  modTop:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  modInfo:  { display: "flex", alignItems: "center", gap: 12 },
  modIcon:  { fontSize: 22 },
  modName:  { fontWeight: 700, color: "#f1f5f9", fontSize: 14 },
  modSrc:   { fontSize: 11, color: "#475569" },
  modPct:   { fontWeight: 800, fontSize: 18 },
  bar:      { height: 5, background: "#1e293b", borderRadius: 99, overflow: "hidden" },
  fill:     { height: "100%", borderRadius: 99, transition: "width .4s" },
  sectionLbl: { fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, margin: "24px 0 12px" },
};

function ModRow({ mod, done, total, color }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div style={S.modRow}>
      <div style={S.modTop}>
        <div style={S.modInfo}>
          <span style={S.modIcon}>{mod.icon}</span>
          <div>
            <div style={S.modName}>{mod.title}</div>
            <div style={S.modSrc}>{done}/{total} tasks · {mod.level}</div>
          </div>
        </div>
        <span style={{ ...S.modPct, color: pct === 100 ? "#22c55e" : "#94a3b8" }}>{pct}%</span>
      </div>
      <div style={S.bar}>
        <div style={{ ...S.fill, width: `${pct}%`, background: pct === 100 ? "#22c55e" : (color || "#3b82f6") }} />
      </div>
    </div>
  );
}

export default function Progress({ learnProgress, myProgress, customModules, overallPct, totalDone, totalLess }) {
  const allLearn = LEARNING_MODULES;
  const started  = [...allLearn, ...customModules].filter(m => {
    const src = m.id.toString().startsWith("my_") ? "mine" : "learn";
    const prog = src === "mine" ? myProgress : learnProgress;
    return Object.keys(prog[m.id] || {}).length > 0;
  }).length;
  const finished = [...allLearn, ...customModules].filter(m => {
    const src  = m.id.toString().startsWith("my_") ? "mine" : "learn";
    const prog = src === "mine" ? myProgress : learnProgress;
    const done = Object.keys(prog[m.id] || {}).length;
    return m.lessons.length > 0 && done === m.lessons.length;
  }).length;

  return (
    <div className="panel">
      <h1 style={S.h1}>Progress</h1>
      <p style={S.sub}>Your complete learning journey at a glance</p>

      {/* Summary cards */}
      <div className="stats-row">
        {[
          { label: "Overall",    val: `${overallPct}%`,        color: "#22c55e" },
          { label: "Completed",  val: `${totalDone}/${totalLess}`, color: "#22d3ee" },
          { label: "Started",    val: started,                  color: "#f59e0b" },
          { label: "Finished",   val: finished,                 color: "#a78bfa" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={S.statLbl}>{s.label}</div>
            <div style={{ ...S.statVal, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Learning Modules progress */}
      <div style={S.sectionLbl}>📚 Learning Modules</div>
      <div style={S.modList}>
        {allLearn.map(mod => (
          <ModRow
            key={mod.id}
            mod={mod}
            done={Object.keys(learnProgress[mod.id] || {}).length}
            total={mod.lessons.length}
            color={mod.color}
          />
        ))}
      </div>

      {/* Custom modules progress */}
      {customModules.length > 0 && (
        <>
          <div style={S.sectionLbl}>🛠️ My Custom Modules</div>
          <div style={S.modList}>
            {customModules.map(mod => (
              <ModRow
                key={mod.id}
                mod={mod}
                done={Object.keys(myProgress[mod.id] || {}).length}
                total={mod.lessons.length}
                color="#10b981"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
