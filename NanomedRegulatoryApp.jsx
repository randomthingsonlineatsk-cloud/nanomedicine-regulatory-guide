import { useState } from "react";

const REGULATORS = [
  {
    id: 1, reg: "CDSCO", country: "India", region: "Asia",
    color: "#FF9933", timeline: "6–18+ months",
    docs: [
      "DBT/ICMR Guidelines for Nanopharmaceuticals (2019)",
      "New Drugs & Clinical Trials Rules 2019"
    ],
    notes: "Early engagement with CDSCO Subject Expert Committee strongly recommended. India-specific clinical data may be required. Include nanomaterial characterization, stability, PK/PD, and immunotoxicity.",
    website: "https://cdsco.gov.in"
  },
  {
    id: 2, reg: "FDA", country: "USA", region: "Americas",
    color: "#3C3B6E", timeline: "12–24 months",
    docs: [
      "FDA Guidance on Nanotechnology (2014)",
      "Critical Quality Attributes Framework",
      "ADME for Nanoformulations"
    ],
    notes: "Detailed characterization and comparability required. Focus on CQAs, immunogenicity, and ADME. Strong emphasis on manufacturing consistency and scale-up validation.",
    website: "https://fda.gov"
  },
  {
    id: 3, reg: "EMA", country: "European Union", region: "Europe",
    color: "#003399", timeline: "12–30 months",
    docs: [
      "EMA Reflection Papers on Nanomedicines",
      "CHMP Guidance",
      "Joint CHMP/CVMP Guideline"
    ],
    notes: "In-depth physicochemical characterization mandatory. Bridging data required for formulation changes. Stepwise approach for nanosimilars: analytical then nonclinical then clinical.",
    website: "https://ema.europa.eu"
  },
  {
    id: 4, reg: "PMDA", country: "Japan", region: "Asia",
    color: "#BC002D", timeline: "12–24 months",
    docs: [
      "PMDA Nanomedicine Guidelines",
      "ICH Q8/Q9/Q10 Implementation"
    ],
    notes: "Consultations with PMDA strongly encouraged early. Detailed physicochemical and biological characterization required. Japanese-specific clinical data often required.",
    website: "https://pmda.go.jp"
  },
  {
    id: 5, reg: "SAHPRA", country: "South Africa", region: "Africa",
    color: "#007A4D", timeline: "Variable — ICH/WHO aligned",
    docs: [
      "Clinical Guidance Documents",
      "ZaZiBoNa Harmonised Framework",
      "WHO PQ Standards"
    ],
    notes: "Follow local CT guidelines and prepare for additional safety queries on nanomaterials. ZaZiBoNa framework allows regional harmonization across southern Africa.",
    website: "https://sahpra.org.za"
  },
  {
    id: 6, reg: "ANVISA", country: "Brazil", region: "Americas",
    color: "#009C3B", timeline: "Variable — dossier dependent",
    docs: [
      "ANVISA Product-Specific Guidance",
      "ICH-Aligned Pathways",
      "RDC Resolutions"
    ],
    notes: "Early scientific advice meetings advised. CMC and toxicology packages scrutinized closely. Local manufacturing or importation requirements apply.",
    website: "https://anvisa.gov.br"
  },
];

const TIMELINE = [
  { label: "Nov 2000", event: "Initial NDAC approval for metastatic ovarian carcinoma", type: "approval" },
  { label: "Aug 2008", event: "Additional indication approved by NDAC", type: "approval" },
  { label: "2011–2012", event: "NDAC requested further Indian-specific clinical data", type: "request" },
  { label: "2013+", event: "Generic nanomedicine approvals and international reference pathway established", type: "generics" },
  { label: "2019", event: "DBT/ICMR Guidelines for Evaluation of Nanopharmaceuticals published", type: "guideline" },
  { label: "2021", event: "New Drugs and Clinical Trials Rules updated with nanomedicine provisions", type: "guideline" },
  { label: "2023", event: "Global regulatory harmonization initiatives for nanosimilars advanced", type: "generics" },
];

const CHECKLIST = {
  "Quality / CMC": [
    "Product description and composition per vial",
    "Manufacturing process flow and critical steps",
    "CQAs: size distribution, surface charge, encapsulation efficiency",
    "Release profile, sterility, pyrogenicity, residual solvents",
    "Analytical methods and full validation",
    "In-process controls and scale-up strategy",
    "Container closure system and shelf life data",
  ],
  "Nonclinical / Preclinical": [
    "Repeat-dose toxicity studies (28-day and 90-day)",
    "Genotoxicity battery (if required by guideline)",
    "Local tolerance and immunotoxicity assessment",
    "Complement activation and cytokine release panel",
    "Safety pharmacology core battery",
    "Biodistribution and organ accumulation studies",
  ],
  "Clinical Development": [
    "First-in-human protocol with sentinel dosing design",
    "PK/PD sampling and bioaccumulation assessment",
    "Immune marker monitoring plan",
    "Organ function follow-up schedule",
    "Risk minimization strategy for nano-specific risks",
  ],
  "Comparability & Lifecycle": [
    "Bridging studies for manufacturing or formulation changes",
    "Stepwise approach for nanosimilars",
    "Post-approval change management protocol",
    "Pharmacovigilance plan specific to nanoformulation",
  ],
  "Regulatory Engagement": [
    "Pre-submission meeting with CDSCO/DBT scheduled",
    "Briefing package: CMC, nonclinical plan, clinical outline",
    "Agreement on endpoints and safety monitoring",
    "Bridging study design agreed with authority",
    "Scientific advice from EMA/FDA obtained if needed",
  ],
};

const CMC_DATA = [
  { section: "Drug substance", content: "Source, synthesis/purification, characterization, impurities profile, reference standards", icon: "⚛" },
  { section: "Lipid components", content: "Supplier CoA, identity, purity, fatty acid composition, peroxide value", icon: "💧" },
  { section: "Formulation", content: "Composition per vial, excipients, PEGylation type and content, pH, osmolality", icon: "🧪" },
  { section: "Manufacturing", content: "Emulsification/shearing parameters, sterilization method, aseptic filtration", icon: "⚙" },
  { section: "Characterization", content: "Particle size (DLS/NTA), PDI, zeta potential, encapsulation efficiency, TEM morphology", icon: "🔬" },
  { section: "Stability", content: "Real-time and accelerated stability, freeze-thaw cycles, photostability", icon: "🌡" },
];

const PUBLICATIONS = [
  {
    type: "Preprint", color: "#1e3a5f",
    title: "Nanomedicine Regulation in India: A Comprehensive AI Framework for the 21st Century",
    doi: "Zenodo — Open Access",
    desc: "Comprehensive monograph covering CDSCO, DBT/ICMR frameworks, AI governance integration, and policy recommendations for nanopharmaceuticals in India."
  },
  {
    type: "Preprint", color: "#7F77DD",
    title: "The Role of AI in Regulatory Decision-Making: Current Applications and Future Potential",
    doi: "Zenodo — Open Access",
    desc: "Review of AI applications in expedited regulatory pathways, lifecycle governance, and pharmacovigilance across global regulatory authorities."
  },
  {
    type: "Preprint", color: "#17a2b8",
    title: "Diabetes Prediction Using XGBoost Ensemble Learning with SHAP Explainability",
    doi: "DOI: 10.5281/zenodo.20336854",
    desc: "Original research achieving ROC-AUC 94.7% on Pima Indians Diabetes Dataset using feature engineering, XGBoost, and SHAP explainability."
  },
  {
    type: "Preprint", color: "#e8533f",
    title: "Heart Rate Modeling and Arrhythmia Detection Using Deep Learning Neural Networks",
    doi: "DOI: 10.5281/zenodo.20388876",
    desc: "Dual-task TensorFlow pipeline — heart rate regression (R2: 0.87) and 5-class arrhythmia classification (AUC: 0.9999)."
  },
];

const TYPE_COLOR = {
  approval: "#28a745",
  request: "#e8533f",
  generics: "#378ADD",
  guideline: "#7F77DD"
};

const TYPE_LABEL = {
  approval: "Approval",
  request: "Data Request",
  generics: "Generic / Reference",
  guideline: "Guideline"
};

const KEY_STEPS = [
  {
    title: "Pre-submission engagement",
    desc: "Early meetings with CDSCO Subject Expert Committee (SEC) are strongly recommended before any IND or NDA submission for nanomedicines. India requires a formal briefing package."
  },
  {
    title: "Indian clinical data",
    desc: "NDAC has historically requested India-specific clinical data for novel nanoformulations. Plan for bridging or local trials in addition to global data."
  },
  {
    title: "DBT/ICMR guidelines",
    desc: "The 2019 guidelines published by DBT and ICMR are the primary Indian reference documents addressing characterization, safety testing, and clinical development for nanopharmaceuticals."
  },
  {
    title: "Nanomaterial characterization",
    desc: "All submissions must include comprehensive physicochemical characterization: particle size, PDI, zeta potential, encapsulation efficiency, surface chemistry, and morphology."
  },
];

const TABS = [
  { id: "overview",    label: "Overview" },
  { id: "regulators", label: "Regulators" },
  { id: "timeline",   label: "Timeline" },
  { id: "checklist",  label: "Checklist" },
  { id: "cmc",        label: "CMC Dossier" },
  { id: "about",      label: "About" },
];

const REGIONS = ["All", "Asia", "Americas", "Europe", "Africa"];

export default function NanomedRegulatoryApp() {
  const [tab, setTab] = useState("overview");
  const [regionFilter, setRegionFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState({});
  const [expandedReg, setExpandedReg] = useState(null);

  const totalItems = Object.values(CHECKLIST).flat().length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((checkedCount / totalItems) * 100);

  const filteredRegs = REGULATORS.filter(r =>
    (regionFilter === "All" || r.region === regionFilter) &&
    (r.reg.toLowerCase().includes(search.toLowerCase()) ||
     r.country.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleCheck = (key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const s = {
    page: { fontFamily: "system-ui, -apple-system, sans-serif", padding: "1.5rem", maxWidth: 800, margin: "0 auto" },
    header: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 },
    avatar: { width: 40, height: 40, borderRadius: 10, background: "#1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, flexShrink: 0 },
    title: { fontSize: 20, fontWeight: 600, color: "#1e3a5f", fontFamily: "Georgia, serif" },
    subtitle: { fontSize: 13, color: "#6c757d", marginTop: 2 },
    badgeRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 },
    badge: (color) => ({ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: color + "18", color: color, fontWeight: 500 }),
    tabs: { display: "flex", gap: 2, borderBottom: "1px solid #e9ecef", marginBottom: 24, flexWrap: "wrap" },
    tab: (active) => ({ padding: "8px 16px", fontSize: 13, border: "none", borderBottom: active ? "2px solid #1e3a5f" : "2px solid transparent", background: "transparent", color: active ? "#1e3a5f" : "#6c757d", cursor: "pointer", fontWeight: active ? 600 : 400, transition: "all 0.15s" }),
    card: { background: "#fff", border: "1px solid #e9ecef", borderRadius: 12, padding: "16px 18px", marginBottom: 12 },
    sectionBox: { background: "#f8f9fa", borderRadius: 12, padding: "16px 18px", marginBottom: 12, borderLeft: "3px solid #1e3a5f" },
    label: { fontSize: 12, color: "#6c757d", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: 8 },
    metricGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 16 },
    metricCard: { background: "#fff", border: "1px solid #e9ecef", borderRadius: 10, padding: "12px 14px" },
    regCard: (color) => ({ background: "#fff", border: "1px solid #e9ecef", borderRadius: 12, marginBottom: 10, borderLeft: `3px solid ${color}`, overflow: "hidden" }),
    regHeader: { padding: "14px 16px", cursor: "pointer" },
    regDetail: { borderTop: "1px solid #e9ecef", padding: "14px 16px", background: "#f8f9fa" },
    timelineDot: (color) => ({ position: "absolute", left: -19, top: 5, width: 12, height: 12, borderRadius: "50%", background: color, border: "2px solid #fff" }),
    checkRow: { display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 16px", cursor: "pointer" },
    checkbox: (done) => ({ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${done ? "#28a745" : "#ced4da"}`, background: done ? "#28a745" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.15s" }),
    pubCard: (color) => ({ background: "#fff", border: "1px solid #e9ecef", borderRadius: 12, padding: "14px 16px", borderTop: `3px solid ${color}` }),
    warning: { background: "#fff8e6", border: "1px solid #ffc107", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10 },
    input: { width: "100%", padding: "8px 12px", border: "1px solid #ced4da", borderRadius: 8, fontSize: 13, outline: "none" },
    filterBtn: (active) => ({ padding: "5px 12px", fontSize: 12, borderRadius: 20, border: `1px solid ${active ? "#1e3a5f" : "#ced4da"}`, background: active ? "#1e3a5f" : "#fff", color: active ? "#fff" : "#6c757d", cursor: "pointer" }),
    progressBar: { width: "100%", height: 6, borderRadius: 3, background: "#e9ecef", overflow: "hidden", flex: 1 },
    progressFill: (pct) => ({ height: "100%", width: `${pct}%`, background: pct === 100 ? "#28a745" : "#1e3a5f", borderRadius: 3, transition: "width 0.3s" }),
  };

  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header}>
        <div style={s.avatar}>⚗</div>
        <div>
          <div style={s.title}>Nanomedicine Regulatory Guide</div>
          <div style={s.subtitle}>India focus · Global comparison · Interactive reference</div>
        </div>
      </div>

      <div style={s.badgeRow}>
        {[
          ["6 Regulators", "#1e3a5f"],
          ["7 Timeline Events", "#7F77DD"],
          [`${totalItems} Checklist Items`, "#17a2b8"],
          ["6 CMC Sections", "#28a745"],
        ].map(([label, color]) => (
          <span key={label} style={s.badge(color)}>{label}</span>
        ))}
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {TABS.map(t => (
          <button key={t.id} style={s.tab(tab === t.id)} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <div>
          <div style={s.sectionBox}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1e3a5f", marginBottom: 8, fontFamily: "Georgia, serif" }}>Executive summary</div>
            <p style={{ fontSize: 14, color: "#495057", lineHeight: 1.8, margin: 0 }}>
              This interactive guide synthesises Indian regulatory expectations under CDSCO and DBT/ICMR with global frameworks for nanopharmaceutical development. It supports researchers, regulatory affairs specialists, and pharmaceutical developers navigating the complex approval landscape for nanoformulations — from liposomes and polymeric nanoparticles to lipid nanoparticles and nanoemulsions.
            </p>
          </div>

          <div style={s.metricGrid}>
            {[
              { label: "India regulatory body", value: "CDSCO + DBT/ICMR", color: "#FF9933" },
              { label: "Key Indian guideline", value: "DBT/ICMR 2019", color: "#1e3a5f" },
              { label: "Typical India timeline", value: "6–18+ months", color: "#17a2b8" },
              { label: "Evidence standard", value: "ICH + India-specific", color: "#28a745" },
            ].map(card => (
              <div key={card.label} style={s.metricCard}>
                <div style={{ fontSize: 12, color: "#6c757d", marginBottom: 6 }}>{card.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: card.color }}>{card.value}</div>
              </div>
            ))}
          </div>

          <div style={s.card}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1e3a5f", marginBottom: 14, fontFamily: "Georgia, serif" }}>
              India regulatory pathway — key considerations
            </div>
            {KEY_STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#1e3a5f", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#212529", marginBottom: 3 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: "#6c757d", lineHeight: 1.7 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={s.warning}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚠</span>
            <div style={{ fontSize: 13, color: "#856404", lineHeight: 1.7 }}>
              <strong>Important:</strong> This guide is for educational and reference purposes only. Always consult current official guidelines from CDSCO, DBT/ICMR, FDA, EMA, or other relevant regulatory authorities for actual submissions. Requirements change frequently.
            </div>
          </div>
        </div>
      )}

      {/* REGULATORS */}
      {tab === "regulators" && (
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <input style={s.input} value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search regulators or countries..." />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {REGIONS.map(r => (
                <button key={r} style={s.filterBtn(regionFilter === r)}
                  onClick={() => setRegionFilter(r)}>{r}</button>
              ))}
            </div>
          </div>

          {filteredRegs.length === 0 && (
            <div style={{ textAlign: "center", padding: "2rem", color: "#6c757d" }}>
              No regulators found for your search.
            </div>
          )}

          {filteredRegs.map(reg => (
            <div key={reg.id} style={s.regCard(reg.color)}>
              <div style={s.regHeader} onClick={() => setExpandedReg(expandedReg === reg.id ? null : reg.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: reg.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                      🏛
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: "#212529" }}>{reg.reg}</div>
                      <div style={{ fontSize: 12, color: "#6c757d" }}>{reg.country} · {reg.region}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 18, color: "#6c757d" }}>{expandedReg === reg.id ? "▲" : "▼"}</span>
                </div>
                <div style={{ marginTop: 8 }}>
                  <span style={{ ...s.badge(reg.color), fontSize: 12 }}>⏱ {reg.timeline}</span>
                </div>
              </div>

              {expandedReg === reg.id && (
                <div style={s.regDetail}>
                  <div style={{ marginBottom: 12 }}>
                    <div style={s.label}>Key documents</div>
                    {reg.docs.map((doc, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                        <span style={{ color: reg.color, flexShrink: 0 }}>📄</span>
                        <span style={{ fontSize: 13, color: "#212529" }}>{doc}</span>
                      </div>
                    ))}
                  </div>
                  <div style={s.label}>Clinical trials notes</div>
                  <p style={{ fontSize: 13, color: "#212529", lineHeight: 1.7, margin: 0 }}>{reg.notes}</p>
                  <a href={reg.website} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-block", marginTop: 10, fontSize: 12, color: reg.color }}>
                    Official website →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TIMELINE */}
      {tab === "timeline" && (
        <div>
          <p style={{ fontSize: 13, color: "#6c757d", marginBottom: 16, lineHeight: 1.7 }}>
            Key regulatory milestones in Indian nanomedicine approval history. Each event shaped the current regulatory landscape.
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {Object.entries(TYPE_LABEL).map(([type, label]) => (
              <span key={type} style={s.badge(TYPE_COLOR[type])}>
                ● {label}
              </span>
            ))}
          </div>

          <div style={{ position: "relative", paddingLeft: 28 }}>
            <div style={{ position: "absolute", left: 10, top: 0, bottom: 0, width: 1, background: "#e9ecef" }}></div>
            {TIMELINE.map((ev, i) => (
              <div key={i} style={{ position: "relative", marginBottom: 18, paddingLeft: 18 }}>
                <div style={s.timelineDot(TYPE_COLOR[ev.type])}></div>
                <div style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: 10, padding: "12px 14px", borderLeft: `3px solid ${TYPE_COLOR[ev.type]}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#212529", marginBottom: 4 }}>{ev.event}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#6c757d" }}>📅 {ev.label}</span>
                    <span style={s.badge(TYPE_COLOR[ev.type])}>{TYPE_LABEL[ev.type]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHECKLIST */}
      {tab === "checklist" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <div style={{ fontSize: 13, color: "#6c757d" }}>
              Track your regulatory submission readiness. Click items to check them off.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 200 }}>
              <div style={s.progressBar}>
                <div style={s.progressFill(pct)}></div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#212529", whiteSpace: "nowrap" }}>
                {pct}% ({checkedCount}/{totalItems})
              </span>
            </div>
          </div>

          {Object.entries(CHECKLIST).map(([section, items]) => {
            const sectionDone = items.filter(it => checked[`${section}-${it}`]).length;
            return (
              <div key={section} style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid #e9ecef", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8f9fa" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1e3a5f" }}>{section}</span>
                  <span style={{ fontSize: 12, color: "#6c757d" }}>{sectionDone}/{items.length}</span>
                </div>
                {items.map((item, i) => {
                  const key = `${section}-${item}`;
                  const done = !!checked[key];
                  return (
                    <div key={i} style={{ ...s.checkRow, background: done ? "#f0fff4" : "#fff" }}
                      onClick={() => toggleCheck(key)}>
                      <div style={s.checkbox(done)}>
                        {done && <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 13, color: done ? "#6c757d" : "#212529", textDecoration: done ? "line-through" : "none", lineHeight: 1.6 }}>
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}

          {pct === 100 && (
            <div style={{ background: "#d4edda", border: "1px solid #28a745", borderRadius: 10, padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 20 }}>✅</span>
              <span style={{ fontSize: 14, color: "#155724", fontWeight: 600 }}>
                All checklist items completed. Your submission package appears ready for review.
              </span>
            </div>
          )}
        </div>
      )}

      {/* CMC DOSSIER */}
      {tab === "cmc" && (
        <div>
          <p style={{ fontSize: 13, color: "#6c757d", marginBottom: 16, lineHeight: 1.7 }}>
            Chemistry, Manufacturing and Controls (CMC) dossier requirements for nanopharmaceutical submissions. Each section must be comprehensively addressed in any regulatory filing.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {CMC_DATA.map((row, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e9ecef", borderRadius: 10, padding: "14px 16px", display: "flex", gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "#e9f0f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {row.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#212529", marginBottom: 4 }}>{row.section}</div>
                  <div style={{ fontSize: 13, color: "#6c757d", lineHeight: 1.7 }}>{row.content}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#f8f9fa", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1e3a5f", marginBottom: 12, fontFamily: "Georgia, serif" }}>
              Nanosimilar comparability framework
            </div>
            {[
              { step: "Step 1", label: "Analytical comparability", desc: "Physicochemical and structural characterization against reference product" },
              { step: "Step 2", label: "Nonclinical comparability", desc: "In vitro and in vivo studies to bridge to reference product" },
              { step: "Step 3", label: "Clinical comparability", desc: "PK/PD and efficacy/safety bridging in appropriate patient population" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: "#1e3a5f", color: "#fff", fontWeight: 600, flexShrink: 0, height: "fit-content" }}>
                  {s.step}
                </span>
                <div style={{ fontSize: 13, color: "#495057", lineHeight: 1.6 }}>
                  <strong>{s.label}</strong> — {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABOUT */}
      {tab === "about" && (
        <div>
          <div style={s.card}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: "#1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                KG
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#212529", fontFamily: "Georgia, serif" }}>
                  Khan Gulrez Shagufa Fazal Ahmed
                </div>
                <div style={{ fontSize: 13, color: "#6c757d" }}>Independent Researcher · Regulatory Affairs Specialist</div>
                <div style={{ fontSize: 13, color: "#6c757d" }}>MSc Bioanalytical Sciences · Maharashtra, India</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#6c757d", lineHeight: 1.8, margin: "0 0 10px" }}>
              Regulatory affairs specialist with expertise spanning nanomedicine, AI applications in regulatory science, and global regulatory frameworks including FDA, EMA, CDSCO, and ICH guidelines. This guide accompanies published academic work on nanomedicine regulation and AI in regulatory decision-making.
            </p>
            <div style={{ fontSize: 12, color: "#6c757d" }}>
              ORCID: 0009-0009-6195-0329 ·{" "}
              <a href="https://github.com/randomthingsonlineatsk-cloud" target="_blank" rel="noopener noreferrer" style={{ color: "#1e3a5f" }}>
                GitHub
              </a>
            </div>
          </div>

          <div style={{ fontSize: 15, fontWeight: 600, color: "#1e3a5f", marginBottom: 12, fontFamily: "Georgia, serif" }}>
            Publications
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {PUBLICATIONS.map((pub, i) => (
              <div key={i} style={s.pubCard(pub.color)}>
                <span style={s.badge(pub.color)}>{pub.type}</span>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#212529", margin: "8px 0 5px", lineHeight: 1.5, fontFamily: "Georgia, serif" }}>
                  {pub.title}
                </div>
                <div style={{ fontSize: 12, color: pub.color, marginBottom: 6 }}>{pub.doi}</div>
                <div style={{ fontSize: 12, color: "#6c757d", lineHeight: 1.6 }}>{pub.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: "#f8f9fa", borderRadius: 10, padding: "14px 16px", fontSize: 13, color: "#6c757d", lineHeight: 1.7 }}>
            All publications are open access on Zenodo. GitHub repositories available at{" "}
            <a href="https://github.com/randomthingsonlineatsk-cloud" target="_blank" rel="noopener noreferrer" style={{ color: "#1e3a5f" }}>
              github.com/randomthingsonlineatsk-cloud
            </a>
          </div>
        </div>
      )}

    </div>
  );
}