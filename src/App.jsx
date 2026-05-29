import { useRef, useState } from "react";

export default function App() {
  const printRef = useRef(null);

  const [view, setView] = useState("landing");
  const [template, setTemplate] = useState("modern");

  // MOBILE TABS
  const [mobileTab, setMobileTab] = useState("editor");

  // AI PANEL
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
    setData((p) => ({
      ...p,
      header: { ...p.header, [k]: v },
    }));

  const setField = (k, v) =>
    setData((p) => ({
      ...p,
      [k]: v,
    }));

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

  // PDF EXPORT
  const exportPDF = () => {
    const win = window.open("", "_blank");

    win.document.write(`
      <html>
        <head>
          <title>CraftCV Resume</title>

          <style>
            body {
              margin:0;
              font-family: Arial;
              background:#f3f4f6;
            }

            .page {
              width:210mm;
              min-height:297mm;
              margin:20px auto;
              background:white;
              padding:28mm;
              box-sizing:border-box;
            }

            h1 {
              font-size:28px;
              margin:0;
            }

            h2 {
              font-size:11px;
              color:#666;
              letter-spacing:2px;
              margin-top:18px;
            }

            p {
              font-size:12px;
              margin:4px 0;
            }

            .skill {
              display:inline-block;
              padding:4px 8px;
              border:1px solid #ddd;
              border-radius:6px;
              font-size:11px;
              margin:3px;
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
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-6">

        <div className="text-center max-w-xl">

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            CraftCV
          </h1>

          <p className="text-gray-300 mt-3 text-sm md:text-base">
            Your career, beautifully crafted.
          </p>

          <p className="text-gray-400 mt-4 text-sm">
            Build professional resumes with AI assistance,
            modern templates, and instant PDF export.
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
    <div className="h-screen flex flex-col bg-[#F5F7FB] overflow-hidden">

      {/* TOPBAR */}
      <div className="h-14 bg-white border-b flex items-center justify-between px-4 md:px-5">

        <div className="font-semibold text-sm">
          CraftCV{" "}
          <span className="text-gray-400 hidden md:inline">
            Build. Refine. Get Hired.
          </span>
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
            AI
          </button>

          <button
            onClick={exportPDF}
            className="bg-black text-white text-xs px-3 py-1 rounded"
          >
            Export
          </button>
        </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex border-b bg-white">

        <button
          onClick={() => setMobileTab("editor")}
          className={`flex-1 py-3 text-sm ${
            mobileTab === "editor"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          Editor
        </button>

        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-3 text-sm ${
            mobileTab === "preview"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
        >
          Preview
        </button>
      </div>

      {/* MAIN */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">

        {/* LEFT PANEL */}
        <div
          className={`
            ${
              mobileTab === "editor"
                ? "flex"
                : "hidden"
            }
            md:flex
            w-full md:w-[380px]
            bg-white border-r
            overflow-y-auto
            p-4
            flex-col
            space-y-4
          `}
        >

          {/* TEMPLATE */}
          <Card title="Templates">

            <div className="grid grid-cols-2 gap-2">

              {["modern", "classic", "minimal", "bold"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`
                    text-xs py-2 rounded border transition

                    ${
                      template === t
                        ? "bg-black text-white"
                        : "bg-white"
                    }
                  `}
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
                onChange={(e) =>
                  setHeader(k, e.target.value)
                }
                placeholder={k.toUpperCase()}
                className="input"
              />
            ))}
          </Card>

          {/* SUMMARY */}
          <Card title="Summary">

            <textarea
              value={data.summary}
              onChange={(e) =>
                setField("summary", e.target.value)
              }
              placeholder="Write a professional summary..."
              className="input"
              rows={4}
            />
          </Card>

          {/* SKILLS */}
          <Card title="Skills">

            <input
              placeholder="React, JavaScript, UI Design"
              onChange={(e) =>
                setField(
                  "skills",
                  e.target.value.split(",")
                )
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

        {/* RIGHT PANEL */}
        <div
          className={`
            ${
              mobileTab === "preview"
                ? "flex"
                : "hidden"
            }
            md:flex
            flex-1
            justify-center
            overflow-auto
            p-4 md:p-10
          `}
        >

          <div className="w-full max-w-[850px]">

            <div
              ref={printRef}
              className={`
                bg-white
                shadow-xl
                rounded-xl
                leading-relaxed
                w-full

                ${
                  template === "minimal"
                    ? "p-6 md:p-10"
                    : "p-6 md:p-14"
                }

                ${
                  template === "bold"
                    ? "border-t-[10px] border-black"
                    : ""
                }

                ${
                  template === "classic"
                    ? "font-serif"
                    : ""
                }
              `}
            >

              {/* HEADER */}
              <h1 className="text-3xl md:text-4xl font-semibold">
                {data.header.name || "Your Name"}
              </h1>

              <p className="text-gray-600 mt-1">
                {data.header.title ||
                  "Professional Title"}
              </p>

              <p className="text-xs text-gray-500 mt-2 break-words">
                {data.header.email} • {data.header.phone}
              </p>

              <hr className="my-6" />

              {/* SUMMARY */}
              <Section title="SUMMARY">
                <p className="text-sm">
                  {data.summary ||
                    "Write your professional summary..."}
                </p>
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
                  <div key={i} className="mb-5">

                    <div className="flex justify-between gap-4">

                      <strong>{e.role}</strong>

                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {e.period}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      {e.company}
                    </p>

                    <p className="text-sm mt-1">
                      {e.desc}
                    </p>
                  </div>
                ))}
              </Section>

              {/* EDUCATION */}
              <Section title="EDUCATION">

                {data.education.map((e, i) => (
                  <div key={i} className="mb-4">

                    <div className="flex justify-between gap-4">

                      <strong>{e.school}</strong>

                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {e.period}
                      </span>
                    </div>

                    <p className="text-sm">
                      {e.degree}
                    </p>
                  </div>
                ))}
              </Section>

              {/* PROJECTS */}
              <Section title="PROJECTS">

                {data.projects.map((p, i) => (
                  <div key={i} className="mb-4">

                    <strong>{p.name}</strong>

                    <p className="text-sm text-gray-600 mt-1">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </Section>
            </div>
          </div>
        </div>
      </div>

      {/* AI PANEL */}
      {aiOpen && (
        <div className="fixed right-0 top-0 h-full w-full md:w-[360px] bg-white shadow-2xl border-l p-4 z-50">

          <div className="flex justify-between mb-3">

            <h2 className="font-semibold">
              AI Writing Assistant
            </h2>

            <button
              onClick={() => setAiOpen(false)}
            >
              ✕
            </button>
          </div>

          <textarea
            value={aiPrompt}
            onChange={(e) =>
              setAiPrompt(e.target.value)
            }
            placeholder="e.g. Write a strong frontend developer summary..."
            className="w-full border p-3 rounded text-sm"
            rows={5}
          />

          <button
            onClick={() =>
              setAiOutput(
                "Generated: Experienced developer skilled in React, scalable UI systems, and modern web applications."
              )
            }
            className="w-full mt-3 bg-black text-white text-xs py-3 rounded"
          >
            Generate
          </button>

          {aiOutput && (
            <div className="mt-4 p-4 bg-gray-50 border rounded text-sm leading-relaxed">
              {aiOutput}
            </div>
          )}
        </div>
      )}

      {/* STYLES */}
      <style>{`
        html, body {
          width: 100%;
          overflow-x: hidden;
        }

        .input {
          width:100%;
          border:1px solid #e5e7eb;
          padding:10px;
          border-radius:10px;
          font-size:12px;
          margin-bottom:8px;
          outline:none;
          background:white;
        }

        .input:focus {
          border-color:black;
        }

        .tag {
          font-size:11px;
          padding:5px 10px;
          border:1px solid #ddd;
          border-radius:999px;
          background:#fafafa;
        }
      `}</style>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Card({ title, children }) {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm">

      <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
        {title}
      </p>

      {children}
    </div>
  );
}

function SectionEditor({
  title,
  section,
  data,
  addItem,
  update,
}) {
  return (
    <Card title={title}>

      <button
        onClick={() => addItem(section)}
        className="text-xs bg-black text-white px-3 py-2 rounded-lg mb-3"
      >
        + Add
      </button>

      {data.map((item, i) => (
        <div
          key={i}
          className="border p-3 rounded-xl mb-3 bg-gray-50"
        >

          {Object.keys(item).map((k) => (
            <input
              key={k}
              value={item[k]}
              placeholder={k.toUpperCase()}
              onChange={(e) =>
                update(
                  section,
                  i,
                  k,
                  e.target.value
                )
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
    <div className="mb-7">

      <h2 className="text-[11px] tracking-[3px] text-gray-500 mb-3">
        {title}
      </h2>

      {children}
    </div>
  );
}