// src/components/MyModules.jsx
import ModuleCard from "./ModuleCard";

const S = {
  h1:    { fontSize: 28, fontWeight: 900, color: "#f1f5f9", letterSpacing: -0.5, margin: 0, marginBottom: 4 },
  sub:   { fontSize: 14, color: "#64748b", marginTop: 4, marginBottom: 28 },
  secLbl:{ fontSize: 12, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700, margin: "24px 0 12px" },
  addCard: {
    background: "none",
    border: "2px dashed #1e293b",
    borderRadius: 16,
    padding: 30,
    cursor: "pointer",
    color: "#64748b",
    textAlign: "center",
    fontFamily: "inherit",
    fontSize: 14,
    fontWeight: 700,
    minHeight: 120,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    transition: "border-color .2s",
  },
  plusIcon: { fontSize: 28, lineHeight: 1 },
};

export default function MyModules({
  modules, favorites, customModules, learnProgress, myProgress,
  onToggleFav, onOpen, onCreate,
}) {
  const favMods = modules.filter(m => favorites.has(m.id));

  return (
    <div className="panel">
      <h1 style={S.h1}>My Modules</h1>
      <p style={S.sub}>Your saved and custom-created modules</p>

      {/* Favorited modules */}
      {favMods.length > 0 && (
        <>
          <div style={S.secLbl}>❤️ Saved from Learning</div>
          <div className="module-grid" style={{ marginBottom: 12 }}>
            {favMods.map(mod => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                progress={learnProgress[mod.id] || {}}
                isFav
                onToggleFav={onToggleFav}
                onClick={() => onOpen(mod, "learn")}
              />
            ))}
          </div>
        </>
      )}

      {/* Custom modules */}
      <div style={S.secLbl}>🛠️ Custom Modules</div>
      <div className="module-grid">
        {customModules.map(mod => (
          <ModuleCard
            key={mod.id}
            mod={mod}
            progress={myProgress[mod.id] || {}}
            isFav={false}
            onToggleFav={() => {}}
            onClick={() => onOpen(mod, "mine")}
          />
        ))}

        {/* Add new module card */}
        <button style={S.addCard} onClick={onCreate}>
          <span style={S.plusIcon}>＋</span>
          Create a Module
        </button>
      </div>

      {favMods.length === 0 && customModules.length === 0 && (
        <p style={{ color: "#475569", marginTop: 20 }}>
          No modules saved yet. Go to Learning Modules and tap ❤️ to save some!
        </p>
      )}
    </div>
  );
}
