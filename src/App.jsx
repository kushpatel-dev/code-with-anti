// src/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar         from "./components/Sidebar";
import LearningModules from "./components/LearningModules";
import MyModules       from "./components/MyModules";
import Progress        from "./components/Progress";
import CreateModule    from "./components/CreateModule";
import ModuleDetail    from "./components/ModuleDetail";
import LessonView      from "./components/LessonView";
import QuizView        from "./components/QuizView";

// ─── Local data fallback (used when backend API is not available) ────────────
import { LEARNING_MODULES } from "./data/modules";

export default function App() {
  // ── Navigation ──────────────────────────────────────────────────────────
  const [section,      setSection]      = useState("learn");  // learn | mine | progress | create
  const [activeModule, setActiveModule] = useState(null);     // { mod, src: "learn"|"mine" }
  const [activeLesson, setActiveLesson] = useState(null);     // lesson object
  const [lessonView,   setLessonView]   = useState(null);     // "lesson" | "quiz"

  // ── Sidebar toggle (mobile/tablet) ─────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Start with local data, then try to fetch from API ──────────────────
  const [learningModules, setLearningModules] = useState(LEARNING_MODULES);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    if (apiUrl) {
      axios.get(`${apiUrl}/modules`)
        .then(res => {
          if (res.data && res.data.length > 0) {
            setLearningModules(res.data);
            console.log("✅ Loaded modules from API");
          }
        })
        .catch(() => console.log("ℹ️ Backend not available — using local data"));
    }
  }, []);

  // ── Favorites (learning modules the user hearts) ────────────────────────
  const [favorites, setFavorites] = useState(new Set());

  // ── Custom modules created by user ──────────────────────────────────────
  const [customModules, setCustomModules] = useState([]);

  // ── Progress: { [moduleId]: { [lessonId]: true } } ──────────────────────
  const [learnProgress, setLearnProgress] = useState({});
  const [myProgress,    setMyProgress]    = useState({});

  // ── Toast ───────────────────────────────────────────────────────────────
  const [toast, setToast] = useState(null);
  const fire = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };

  // ── Helpers ─────────────────────────────────────────────────────────────
  const getProgress = (modId, src) =>
    (src === "learn" ? learnProgress : myProgress)[modId] || {};

  const markDone = (modId, src, lessonId) => {
    const setter = src === "learn" ? setLearnProgress : setMyProgress;
    setter(prev => ({ ...prev, [modId]: { ...(prev[modId] || {}), [lessonId]: true } }));
  };

  const toggleFav = (modId) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(modId)) { next.delete(modId); fire("💔 Removed from My Modules"); }
      else                 { next.add(modId);    fire("❤️ Added to My Modules!"); }
      return next;
    });
  };

  // ── Overall stats ───────────────────────────────────────────────────────
  const allMods    = [...learningModules, ...customModules];
  const totalDone  = allMods.reduce((s, m) => {
    const src = m.id.toString().startsWith("my_") ? "mine" : "learn";
    return s + Object.keys(getProgress(m.id, src)).length;
  }, 0);
  const totalLess  = allMods.reduce((s, m) => s + m.lessons.length, 0);
  const overallPct = totalLess ? Math.round((totalDone / totalLess) * 100) : 0;

  // ── Navigation actions ───────────────────────────────────────────────────
  const navTo = (key) => {
    setSection(key);
    setActiveModule(null);
    setActiveLesson(null);
    setLessonView(null);
    setSidebarOpen(false);  // close sidebar on mobile after nav
  };

  const openModule = (mod, src) => {
    setActiveModule({ mod, src });
    setActiveLesson(null);
    setLessonView(null);
  };

  const openLesson = (lesson) => {
    setActiveLesson(lesson);
    setLessonView(lesson.type === "quiz" ? "quiz" : "lesson");
  };

  const backToModule = () => {
    setActiveLesson(null);
    setLessonView(null);
  };

  const backToList = () => {
    setActiveModule(null);
    setActiveLesson(null);
    setLessonView(null);
  };

  const handleComplete = () => {
    if (!activeModule || !activeLesson) return;
    markDone(activeModule.mod.id, activeModule.src, activeLesson.id);
    fire("✅ Done! Next task unlocked 🔓");
    backToModule();
  };

  const saveNewModule = (mod) => {
    setCustomModules(prev => [...prev, mod]);
    fire("🎉 Module created!");
    setSection("mine");
  };

  // ─── RENDER ────────────────────────────────────────────────────────────
  const renderMain = () => {
    // Lesson / Quiz views (deepest level)
    if (lessonView === "lesson" && activeLesson && activeModule) {
      const already = !!getProgress(activeModule.mod.id, activeModule.src)[activeLesson.id];
      return (
        <LessonView
          lesson={activeLesson}
          alreadyDone={already}
          onBack={backToModule}
          onComplete={handleComplete}
        />
      );
    }

    if (lessonView === "quiz" && activeLesson && activeModule) {
      return (
        <QuizView
          lesson={activeLesson}
          onBack={backToModule}
          onComplete={() => markDone(activeModule.mod.id, activeModule.src, activeLesson.id)}
        />
      );
    }

    // Module detail view
    if (activeModule) {
      const prog = getProgress(activeModule.mod.id, activeModule.src);
      return (
        <ModuleDetail
          mod={activeModule.mod}
          progress={prog}
          onBack={backToList}
          onOpenLesson={openLesson}
          onShowToast={fire}
        />
      );
    }

    // Top-level section views
    if (section === "learn")
      return (
        <LearningModules
          modules={learningModules}
          progress={learnProgress}
          favorites={favorites}
          onToggleFav={toggleFav}
          onOpen={openModule}
        />
      );

    if (section === "mine")
      return (
        <MyModules
          modules={learningModules}
          favorites={favorites}
          customModules={customModules}
          learnProgress={learnProgress}
          myProgress={myProgress}
          onToggleFav={toggleFav}
          onOpen={openModule}
          onCreate={() => setSection("create")}
        />
      );

    if (section === "progress")
      return (
        <Progress
          learnProgress={learnProgress}
          myProgress={myProgress}
          customModules={customModules}
          overallPct={overallPct}
          totalDone={totalDone}
          totalLess={totalLess}
        />
      );

    if (section === "create")
      return (
        <CreateModule
          onBack={() => setSection("mine")}
          onSave={saveNewModule}
          onToast={fire}
        />
      );
  };

  return (
    <div className="app-root">
      {toast && <div className="toast">{toast}</div>}

      {/* Hamburger button — visible on mobile/tablet only */}
      <button
        className="sidebar-hamburger"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* Overlay when sidebar is open on mobile */}
      <div
        className={`sidebar-overlay${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <Sidebar
        section={activeModule ? null : section}
        onNav={navTo}
        overallPct={overallPct}
        totalDone={totalDone}
        totalLess={totalLess}
        isOpen={sidebarOpen}
      />

      <div className="main-content">
        {renderMain()}
      </div>
    </div>
  );
}
