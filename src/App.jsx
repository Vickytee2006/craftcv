import { useRef, useState } from "react";

export default function App() {
  const printRef = useRef(null);

  const [view, setView] = useState("landing");
  const [template, setTemplate] = useState("modern");

  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiOutput, setAiOutput] = useState("");

  const [data, setData] = useState({
    header: {
      name: "",
      title: "",
      email: "",
      phone: "",
    },

    summary: "",

    skills: ["React", "JavaScript", "UI Design"],

    experience: [
      {
        role: "Frontend Developer",
        company: "Company Name",
        period: "Jan 2020 - Dec 2023",
        desc: "Built scalable UI systems and improved product performance.",
      },
    ],

    education: [
      {
        school: "University Name",
        degree: "BSc Computer Science",
        period: "Sep 2018 - Jul 2022",
      },
    ],

    projects: [
      {
        name: "Project Name",
        desc: "Built a modern web application with React and APIs.",
      },
    ],
  });

  const setHeader = (k, v) =>
    setData((p) => ({ ...p, header: { ...p.header, [k]: v } }));

  const setField = (k, v) =>
    setData((p) => ({ ...p, [k]: v }));

  const updateArray = (section, i, k, v) => {
    const copy = [...data[section]];
    copy[i][k] = v;
    setField(section, copy);
  };

  const addItem = (section) => {
    const map = {
      experience: {
        role: "",
        company: "",
        period: "Jan 2020 - Dec 2023",
        desc: "",
      },
      education: {
        school: "",
        degree: "",
        period: "Sep 2018 - Jul 2022",
      },
      projects: {
        name: "",
        desc: "",
      },
    };

    setData((p) => ({
      ...p,
      [section]: [...p[section], map[section]],
    }));
  };

  const exportPDF = () => {
    const win = window.open("", "_blank");

    win.document.write(`
      <html>
        <head>
          <title>CraftCV Resume</title>
          <style>
            body { margin:0; font-family: Arial; background:#f3f4f6; }
            .page {
              width:210mm;
              min-height:297mm;
              margin:20px auto;
              background:white;
              padding:28mm;
              box-sizing:border-box;
            }
            h1 { font-size:28px; margin:0; }
            h2 { font-size:11px; color:#666; letter-spacing:2px; margin-top:18px; }
            p { font-size:12px; margin:4px 0; }
            .skill {
              display:inline-block;
              padding:4px 8px;
              border:1px solid #ddd;
              font-size:11px;
              margin:3px;
              border-radius:6px;
            }
          </style>
        </head>
        <body>
          <div class="page">
            ${printRef.current.innerHTML}
          </div>
        </body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  /* ================= LANDING ================= */
  if (view === "landing") {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="text-center max-w-xl px-6">

          <h1 className="text-6xl font-bold tracking-tight">
            CraftCV
          </h1>

          <p className="text-gray-300 mt-3 text-sm">
            Your career, beautifully crafted.
          </p>

          <p className="text-gray-400 mt-4 text-sm">
            Build professional, ATS-friendly resumes with AI assistance,
            modern templates, and instant export.
          </p>

          <button
            onClick={() => setView("app")}
            className="mt-6 bg-white text-black px-6 py-3 rounded-lg text-sm hover:scale-105 transition"
          >
            Start Crafting
          </button>
        </div>
      </div>
    );
  }

  /* ================= APP ================= */
  return (
    <div className="h-screen flex flex-col bg-[#F5F7FB]">

      {/* TOP BAR */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-5">

        <div className="font-semibold text-sm">
          CraftCV <span className="text-gray-400">Build. Refine. Get Hired.</span>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => setView("landing")}
            className="text-xs px-3 py-1 border rounded"
          >
            Home
          </button>

          <button
            onClick={() => setAiOpen(true)}
            className="text-xs px-3 py-1 border rounded"
          >
            AI Assist
          </button>

          <button
            onClick={exportPDF}
            className="bg-black text-white text-xs px-3 py-1 rounded"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-[380px] bg-white border-r overflow-y-auto p-4 space-y-4">

          {/* TEMPLATES */}
          <Card title="Templates">
            <div className="grid grid-cols-2 gap-2">
              {["modern", "classic", "minimal", "bold"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`text-xs py-2 rounded border transition ${
                    template === t ? "bg-black text-white" : ""
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Card>

          {/* PERSONAL INFO */}
          <Card title="Personal Info">
            {["name", "title", "email", "phone"].map((k) => (
              <input
                key={k}
                value={data.header[k]}
                onChange={(e) => setHeader(k, e.target.value)}
                placeholder={k.toUpperCase()}
                className="input"
              />
            ))}
          </Card>

          {/* SUMMARY */}
          <Card title="Summary">
            <textarea
              value={data.summary}
              onChange={(e) => setField("summary", e.target.value)}
              placeholder="Write a professional summary..."
              className="input"
              rows={3}
            />
          </Card>

          {/* SKILLS */}
          <Card title="Skills">
            <input
              placeholder="React, JavaScript, Product Design"
              onChange={(e) =>
                setField("skills", e.target.value.split(","))
              }
              className="input"
            />
          </Card>

          {/* EXPERIENCE */}
          <SectionEditor
            title="Experience"
            section="experience"
            data={data.experience}
            addItem={addItem}
            update={updateArray}
          />

          {/* EDUCATION */}
          <SectionEditor
            title="Education"
            section="education"
            data={data.education}
            addItem={addItem}
            update={updateArray}
          />

          {/* PROJECTS */}
          <SectionEditor
            title="Projects"
            section="projects"
            data={data.projects}
            addItem={addItem}
            update={updateArray}
          />
        </div>

        {/* RIGHT PREVIEW */}
        <div className="flex-1 flex justify-center p-10 overflow-auto">

          <div className="w-[850px]">

            <div
              ref={printRef}
              className="bg-white shadow-xl rounded-xl p-14 leading-relaxed"
            >

              {/* HEADER */}
              <h1 className="text-4xl font-semibold">
                {data.header.name || "Your Name"}
              </h1>

              <p className="text-gray-600">
                {data.header.title || "Professional Title"}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                {data.header.email} • {data.header.phone}
              </p>

              <hr className="my-6" />

              {/* SUMMARY */}
              <Section title="SUMMARY">
                <p>{data.summary || "Write your professional summary..."}</p>
              </Section>

              {/* SKILLS */}
              <Section title="SKILLS">
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span key={i} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </Section>

              {/* EXPERIENCE */}
              <Section title="EXPERIENCE">
                {data.experience.map((e, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between">
                      <strong>{e.role}</strong>
                      <span className="text-xs text-gray-500">
                        {e.period}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{e.company}</p>
                    <p className="text-sm">{e.desc}</p>
                  </div>
                ))}
              </Section>

              {/* EDUCATION */}
              <Section title="EDUCATION">
                {data.education.map((e, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between">
                      <strong>{e.school}</strong>
                      <span className="text-xs text-gray-500">
                        {e.period}
                      </span>
                    </div>
                    <p className="text-sm">{e.degree}</p>
                  </div>
                ))}
              </Section>

              {/* PROJECTS */}
              <Section title="PROJECTS">
                {data.projects.map((p, i) => (
                  <div key={i} className="mb-3">
                    <strong>{p.name}</strong>
                    <p className="text-sm text-gray-600">{p.desc}</p>
                  </div>
                ))}
              </Section>

            </div>
          </div>
        </div>
      </div>

      {/* AI PANEL */}
      {aiOpen && (
        <div className="fixed right-0 top-0 h-full w-[360px] bg-white shadow-2xl border-l p-4 z-50">

          <div className="flex justify-between mb-3">
            <h2 className="font-semibold">AI Writing Assistant</h2>
            <button onClick={() => setAiOpen(false)}>✕</button>
          </div>

          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="e.g. Write a strong frontend summary..."
            className="w-full border p-2 rounded text-sm"
            rows={4}
          />

          <button
            onClick={() =>
              setAiOutput(
                "Generated: Experienced developer skilled in React, scalable UI systems, and modern web apps."
              )
            }
            className="w-full mt-2 bg-black text-white text-xs py-2 rounded"
          >
            Generate
          </button>

          {aiOutput && (
            <div className="mt-4 p-3 bg-gray-50 border rounded text-sm">
              {aiOutput}
            </div>
          )}
        </div>
      )}

      {/* STYLES */}
      <style>{`
        .input {
          width:100%;
          border:1px solid #e5e7eb;
          padding:8px;
          border-radius:8px;
          font-size:12px;
          margin-bottom:6px;
          outline:none;
        }

        .tag {
          font-size:11px;
          padding:4px 8px;
          border:1px solid #ddd;
          border-radius:6px;
        }
      `}</style>
    </div>
  );
}

/* COMPONENTS */
function Card({ title, children }) {
  return (
    <div className="border rounded-xl p-3 bg-white shadow-sm">
      <p className="text-xs font-semibold text-gray-500 mb-2">
        {title}
      </p>
      {children}
    </div>
  );
}

function SectionEditor({ title, section, data, addItem, update }) {
  return (
    <Card title={title}>
      <button
        onClick={() => addItem(section)}
        className="text-xs bg-black text-white px-2 py-1 rounded mb-2"
      >
        + Add
      </button>

      {data.map((item, i) => (
        <div key={i} className="border p-2 rounded mb-2">
          {Object.keys(item).map((k) => (
            <input
              key={k}
              value={item[k]}
              placeholder={k.toUpperCase()}
              onChange={(e) =>
                update(section, i, k, e.target.value)
              }
              className="input"
            />
          ))}
        </div>
      ))}
    </Card>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-[11px] tracking-widest text-gray-500 mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}