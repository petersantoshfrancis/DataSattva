import { useState } from "react";

// ─── DataSattva Brand Tokens ──────────────────────────────────────────────────
// Sattva = purity, clarity, integrity in Sanskrit
// Palette: warm off-white ground · near-black text · turmeric primary · gold accent
const B = {
  page:     "#FAF7F2",   // warm off-white — grounded, not clinical
  ink:      "#1C1917",   // near-black — serious authority
  turmeric: "#C7601A",   // primary action — distinctly Indian, warm
  gold:     "#E8B84B",   // accent — Sattva's philosophical gold
  stone:    "#78716C",   // secondary text
  fog:      "#E8E2D9",   // borders, dividers
  mist:     "#F3EFE9",   // card backgrounds
  white:    "#FFFFFF",
  // Risk colours — semantic, not decorative
  critical: "#B91C1C",
  criticalBg: "#FEF2F2",
  high:     "#B45309",
  highBg:   "#FFFBEB",
  moderate: "#1D4ED8",
  moderateBg: "#EFF6FF",
  low:      "#15803D",
  lowBg:    "#F0FDF4",
};

// ─── Assessment Data ──────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "identity", title: "Your Organisation", icon: "🏢",
    questions: [
      { id: "sector", text: "Which sector best describes your business?", type: "select",
        options: ["Healthcare / Pharma", "BFSI — Banking, Insurance, Fintech", "E-Commerce / Retail", "EdTech / Education", "HR / Staffing / Payroll", "IT / SaaS / Tech Services", "Manufacturing / Supply Chain", "Real Estate", "Media / Advertising", "Other"] },
      { id: "size", text: "How many individuals' personal data do you approximately handle?", type: "select",
        options: ["Fewer than 500 records", "500 – 10,000 records", "10,001 – 1,00,000 records", "1,00,001 – 10 lakh records", "More than 10 lakh records"] },
      { id: "role", text: "What best describes your primary data role?", type: "select",
        options: ["Data Fiduciary — I decide why and how data is processed", "Data Processor — I process on behalf of another entity", "Both Fiduciary and Processor", "Not sure"] },
    ]
  },
  {
    id: "collection", title: "Data Collection", icon: "📥",
    note: "DPDP §4 — Personal data may be processed only for a lawful purpose with consent or a legitimate use.",
    questions: [
      { id: "types", text: "What categories of personal data do you collect?", type: "multi",
        options: ["Name and contact details", "Financial or payment data", "Health or medical records", "Biometric data", "Children's data (under 18)", "Location or GPS data", "Aadhaar, PAN, or government IDs", "Behavioural or browsing data", "Employee or HR data", "None of the above"] },
      { id: "purpose_documented", text: "Is the purpose for collecting each data element formally documented?", type: "select",
        risk: { "No": 3, "Partially": 2, "Yes": 0 },
        options: ["Yes", "Partially", "No"] },
      { id: "minimisation", text: "Do you collect only the minimum data needed for the stated purpose?", type: "select",
        risk: { "No": 3, "Sometimes": 2, "Yes": 0 },
        options: ["Yes", "Sometimes", "No"] },
    ]
  },
  {
    id: "consent", title: "Consent Management", icon: "✅",
    note: "DPDP §6 — Consent must be free, specific, informed, unconditional, and unambiguous.",
    questions: [
      { id: "consent_mechanism", text: "How do you obtain consent from individuals?", type: "select",
        risk: { "No formal consent obtained": 4, "Bundled or pre-ticked checkboxes": 3, "Verbal or implied consent": 3, "Separate written consent forms": 1, "Digital consent with timestamp and record": 0 },
        options: ["No formal consent obtained", "Bundled or pre-ticked checkboxes", "Verbal or implied consent", "Separate written consent forms", "Digital consent with timestamp and record"] },
      { id: "consent_withdraw", text: "Can individuals withdraw consent as easily as they gave it?", type: "select",
        risk: { "No withdrawal mechanism exists": 4, "Very difficult — multiple steps required": 3, "Possible but not clearly communicated": 2, "Yes, simple self-service option available": 0 },
        options: ["No withdrawal mechanism exists", "Very difficult — multiple steps required", "Possible but not clearly communicated", "Yes, simple self-service option available"] },
      { id: "consent_children", text: "If you process children's data, do you have verifiable parental consent?", type: "select",
        risk: { "We process children's data with no parental consent": 5, "Basic age declaration only": 3, "Yes, verifiable parental consent in place": 0, "We do not process children's data": 0 },
        options: ["We do not process children's data", "Yes, verifiable parental consent in place", "Basic age declaration only", "We process children's data with no parental consent"] },
      { id: "privacy_notice", text: "Do you have a clear, plain-language privacy notice?", type: "select",
        risk: { "No privacy notice exists": 4, "Copied template, not reviewed": 3, "Exists but complex legal language": 2, "Clear, updated, accessible notice": 0 },
        options: ["Clear, updated, accessible notice", "Exists but complex legal language", "Copied template, not reviewed", "No privacy notice exists"] },
    ]
  },
  {
    id: "sharing", title: "Data Sharing", icon: "🔗",
    note: "DPDP §8 — You remain responsible for ensuring processors comply. Cross-border transfers require government approval.",
    questions: [
      { id: "third_parties", text: "Do you share personal data with third parties?", type: "select",
        options: ["No — data stays internal", "Yes — vendors or service providers", "Yes — marketing partners or affiliates", "Yes — regulators or government only", "Yes — multiple of the above"] },
      { id: "dpa_exists", text: "Do you have Data Processing Agreements with all third-party processors?", type: "select",
        risk: { "No agreements in place": 4, "Some vendors covered, not all": 3, "Agreements exist but not reviewed recently": 2, "Yes, all processors have current agreements": 0, "Not applicable — no third-party sharing": 0 },
        options: ["Not applicable — no third-party sharing", "Yes, all processors have current agreements", "Agreements exist but not reviewed recently", "Some vendors covered, not all", "No agreements in place"] },
      { id: "cross_border", text: "Do you transfer personal data outside India?", type: "select",
        risk: { "Yes, routinely — to any country": 4, "Yes, to approved countries only": 1, "No cross-border transfers": 0, "Not sure": 3 },
        options: ["No cross-border transfers", "Yes, to approved countries only", "Yes, routinely — to any country", "Not sure"] },
      { id: "vendor_audit", text: "Do you audit third-party vendors for data security compliance?", type: "select",
        risk: { "Never audited": 4, "Only when issues arise": 3, "Annual self-assessment by vendor": 2, "Regular audits with documented evidence": 0 },
        options: ["Regular audits with documented evidence", "Annual self-assessment by vendor", "Only when issues arise", "Never audited"] },
    ]
  },
  {
    id: "storage", title: "Storage & Security", icon: "🔒",
    note: "DPDP §8(5) — Reasonable security safeguards appropriate to the risk of processing must be in place.",
    questions: [
      { id: "storage_location", text: "Where is personal data primarily stored?", type: "select",
        options: ["On-premise servers", "Indian cloud provider", "Foreign cloud provider", "Mixed or unsure", "Paper and physical records only"] },
      { id: "encryption", text: "Is personal data encrypted at rest and in transit?", type: "select",
        risk: { "Not encrypted": 4, "In transit only": 3, "At rest only": 2, "Both at rest and in transit": 0, "Not sure": 3 },
        options: ["Both at rest and in transit", "In transit only", "At rest only", "Not encrypted", "Not sure"] },
      { id: "access_control", text: "Are there role-based access controls on who can access personal data?", type: "select",
        risk: { "No access controls": 4, "Basic password protection only": 3, "Department-level access": 2, "Granular role-based access with audit logs": 0 },
        options: ["Granular role-based access with audit logs", "Department-level access", "Basic password protection only", "No access controls"] },
      { id: "breach_plan", text: "Do you have a data breach response plan?", type: "select",
        risk: { "No plan exists": 4, "Informal understanding, not documented": 3, "Documented but never tested": 2, "Documented, tested, with 72-hour notification protocol": 0 },
        options: ["Documented, tested, with 72-hour notification protocol", "Documented but never tested", "Informal understanding, not documented", "No plan exists"] },
    ]
  },
  {
    id: "retention", title: "Retention & Erasure", icon: "🗑️",
    note: "DPDP §8(7) — Data must be erased once the purpose is fulfilled or consent is withdrawn.",
    questions: [
      { id: "retention_policy", text: "Do you have a documented data retention policy?", type: "select",
        risk: { "No — data kept indefinitely": 4, "No formal policy, informal practice": 3, "Policy exists but inconsistently applied": 2, "Formal policy, enforced and audited": 0 },
        options: ["Formal policy, enforced and audited", "Policy exists but inconsistently applied", "No formal policy, informal practice", "No — data kept indefinitely"] },
      { id: "auto_deletion", text: "Is data automatically deleted or anonymised after the retention period?", type: "select",
        risk: { "No process in place": 4, "Manual, often missed": 3, "Partially automated": 2, "Fully automated with verification": 0 },
        options: ["Fully automated with verification", "Partially automated", "Manual, often missed", "No process in place"] },
      { id: "backup_retention", text: "Are backups and archives covered by your retention policy?", type: "select",
        risk: { "No — backups retained indefinitely": 4, "Partially addressed": 2, "Yes — backups follow the same retention rules": 0 },
        options: ["Yes — backups follow the same retention rules", "Partially addressed", "No — backups retained indefinitely"] },
    ]
  },
  {
    id: "rights", title: "Individual Rights", icon: "⚖️",
    note: "DPDP §§12–13 — Individuals have rights to access, correct, erase their data and raise grievances.",
    questions: [
      { id: "access_right", text: "Can individuals request and receive a summary of their personal data you hold?", type: "select",
        risk: { "No mechanism exists": 4, "Possible but slow and manual": 3, "Process exists, response within 30 days": 1, "Self-service portal, quick response": 0 },
        options: ["Self-service portal, quick response", "Process exists, response within 30 days", "Possible but slow and manual", "No mechanism exists"] },
      { id: "correction_right", text: "Can individuals correct or update inaccurate data?", type: "select",
        risk: { "No — corrections not possible": 4, "Only through customer support": 2, "Online form or portal available": 0 },
        options: ["Online form or portal available", "Only through customer support", "No — corrections not possible"] },
      { id: "erasure_right", text: "Can individuals request deletion of their data?", type: "select",
        risk: { "No process exists": 4, "Manual, case-by-case": 3, "Defined process executed within 30 days": 0 },
        options: ["Defined process executed within 30 days", "Manual, case-by-case", "No process exists"] },
      { id: "grievance", text: "Do you have a designated Data Protection Officer or Grievance Officer?", type: "select",
        risk: { "No one assigned": 4, "Someone handles it informally": 3, "Named person, not formally appointed": 2, "Formally appointed, contact published": 0 },
        options: ["Formally appointed, contact published", "Named person, not formally appointed", "Someone handles it informally", "No one assigned"] },
    ]
  },
  {
    id: "governance", title: "Governance", icon: "📋",
    questions: [
      { id: "dpia", text: "Do you conduct Data Protection Impact Assessments for new projects?", type: "select",
        risk: { "Not familiar with DPIAs": 4, "No formal DPIA conducted": 4, "Ad hoc only": 3, "For high-risk projects only": 1, "Mandatory for all new initiatives": 0 },
        options: ["Mandatory for all new initiatives", "For high-risk projects only", "Ad hoc only", "No formal DPIA conducted", "Not familiar with DPIAs"] },
      { id: "training", text: "Do employees handling personal data receive data privacy training?", type: "select",
        risk: { "No training at all": 4, "One-time, not recurring": 3, "Annual awareness sessions": 1, "Regular role-based training": 0 },
        options: ["Regular role-based training", "Annual awareness sessions", "One-time, not recurring", "No training at all"] },
      { id: "inventory", text: "Do you maintain a Record of Processing Activities?", type: "select",
        risk: { "Not familiar with this requirement": 4, "No formal record": 4, "Partial or outdated inventory": 3, "Complete, current record": 0 },
        options: ["Complete, current record", "Partial or outdated inventory", "No formal record", "Not familiar with this requirement"] },
    ]
  },
];

const SERVICES = [
  { gap: "consent",    label: "Consent Framework Design",      desc: "Consent notices, withdrawal mechanisms, digital consent logs, children's data protocols." },
  { gap: "sharing",   label: "Vendor Risk & DPA Programme",    desc: "Data Processing Agreement templates, vendor questionnaires, audit schedules." },
  { gap: "storage",   label: "Security Controls Assessment",   desc: "Gap analysis against DPDP §8(5), encryption review, access control audit." },
  { gap: "retention", label: "Retention & Erasure Architecture", desc: "Policy drafting, automation playbook, backup and archive coverage." },
  { gap: "rights",    label: "Data Principal Rights Framework", desc: "Request management workflows, DPO appointment, grievance redressal design." },
  { gap: "governance",label: "DPDP Governance Programme",      desc: "ROPA build, DPIA methodology, training curriculum, policy suite." },
  { gap: "collection",label: "Data Inventory & Mapping",       desc: "Full data flow mapping, purpose limitation analysis, data minimisation review." },
];

function getRisk(score, max) {
  const pct = max > 0 ? (score / max) * 100 : 0;
  if (pct >= 70) return { label: "Critical risk",  short: "Critical",  color: B.critical, bg: B.criticalBg, pct };
  if (pct >= 45) return { label: "High risk",      short: "High",      color: B.high,     bg: B.highBg,     pct };
  if (pct >= 20) return { label: "Moderate risk",  short: "Moderate",  color: B.moderate, bg: B.moderateBg, pct };
  return            { label: "Low risk",       short: "Low",       color: B.low,      bg: B.lowBg,      pct };
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo({ size = 20 }) {
  return (
    <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: size, letterSpacing: "-0.02em", userSelect: "none" }}>
      <span style={{ color: B.ink }}>Data</span><span style={{ color: B.turmeric }}>Sattva</span>
    </span>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ right }) {
  return (
    <div style={{ background: B.white, borderBottom: `1px solid ${B.fog}`, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
      <Logo size={20} />
      {right && <span style={{ fontSize: 13, color: B.stone }}>{right}</span>}
    </div>
  );
}

// ─── Progress ─────────────────────────────────────────────────────────────────
function Progress({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: B.stone, marginBottom: 8 }}>
        <span>Section {current} of {total}</span>
        <span style={{ color: B.turmeric, fontWeight: 600 }}>{pct}%</span>
      </div>
      <div style={{ height: 3, background: B.fog, borderRadius: 99 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: B.turmeric, borderRadius: 99, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

// ─── Score Arc (Lotus-inspired) ───────────────────────────────────────────────
function ScoreArc({ compliance, risk }) {
  const r = 72, cx = 90, cy = 90;
  const circ = 2 * Math.PI * r;
  const arc = (compliance / 100) * circ * 0.75; // 270-degree arc
  const offset = circ * 0.25;

  return (
    <div style={{ textAlign: "center", margin: "8px 0 24px" }}>
      <svg width="180" height="160" viewBox="0 0 180 160" style={{ overflow: "visible" }}>
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke={B.fog} strokeWidth="10"
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`} />
        {/* Fill */}
        <circle cx={cx} cy={cy} r={r} fill="none"
          stroke={risk.color} strokeWidth="10"
          strokeDasharray={`${arc} ${circ - arc}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
          style={{ transition: "stroke-dasharray 1.4s ease" }} />
        {/* Score */}
        <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="'DM Serif Display', Georgia, serif"
          fontSize="36" fontWeight="400" fill={risk.color}>{compliance}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontFamily="Inter, sans-serif"
          fontSize="11" fill={B.stone} letterSpacing="0.04em">out of 100</text>
        {/* Min / Max labels */}
        <text x="18" y="150" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill={B.fog}>0</text>
        <text x="162" y="150" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="10" fill={B.fog}>100</text>
      </svg>
      <div style={{ display: "inline-block", background: risk.bg, color: risk.color, border: `1.5px solid ${risk.color}`, borderRadius: 6, padding: "5px 18px", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
        {risk.label}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function DataSattva() {
  const [screen, setScreen]           = useState("landing");
  const [sectionIdx, setSectionIdx]   = useState(0);
  const [answers, setAnswers]         = useState({});
  const [lead, setLead]               = useState({ name: "", org: "", email: "", phone: "" });
  const [submitted, setSubmitted]     = useState(false);
  const [showServices, setShowServices] = useState(false);

  const section = SECTIONS[sectionIdx];

  function answer(qid, val)  { setAnswers(p => ({ ...p, [qid]: val })); }
  function toggleMulti(qid, val) {
    setAnswers(p => {
      const cur = p[qid] || [];
      return { ...p, [qid]: cur.includes(val) ? cur.filter(x => x !== val) : [...cur, val] };
    });
  }

  function sectionDone() {
    return section.questions.every(q =>
      q.type === "multi" ? (answers[q.id] || []).length > 0 : answers[q.id] !== undefined
    );
  }

  function calcScore() {
    let score = 0, max = 0;
    const gaps = new Set();
    SECTIONS.forEach(sec => {
      sec.questions.forEach(q => {
        if (!q.risk) return;
        const possible = Math.max(...Object.values(q.risk));
        max += possible;
        const val = q.risk[answers[q.id]] ?? 0;
        score += val;
        if (val >= 3) gaps.add(sec.id);
      });
    });
    return { score, max, gaps };
  }

  const { score, max, gaps } = calcScore();
  const compliance = max > 0 ? Math.round(100 - (score / max) * 100) : 100;
  const risk = getRisk(score, max);

  // ── LANDING ────────────────────────────────────────────────────────────────
  if (screen === "landing") return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: B.page, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <Topbar right="datasattva.com" />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(32px, 6vw, 48px)", color: B.ink, lineHeight: 1.15, marginBottom: 20 }}>
            Does your business handle<br />personal data with integrity?
          </div>
          <p style={{ fontSize: 17, color: B.stone, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 32px" }}>
            India's DPDP Act 2023 is law. Find your compliance gaps in 5 minutes — before they become penalties of up to ₹250 crore.
          </p>
          <button
            onClick={() => setScreen("quiz")}
            style={{ background: B.turmeric, color: B.white, border: "none", borderRadius: 8, padding: "16px 40px", fontSize: 16, fontWeight: 600, cursor: "pointer", letterSpacing: "0.01em" }}>
            Begin free assessment
          </button>
          <div style={{ marginTop: 12, fontSize: 13, color: B.stone }}>8 sections · 5 minutes · instant result · no login needed</div>
        </div>

        {/* Penalty stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 48 }}>
          {[
            { n: "₹250 Cr", l: "maximum penalty" },
            { n: "₹200 Cr", l: "significant data fiduciaries" },
            { n: "72 hrs",  l: "to report a breach" },
          ].map(s => (
            <div key={s.l} style={{ background: B.white, border: `1px solid ${B.fog}`, borderRadius: 10, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: B.turmeric, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: B.stone, marginTop: 6, lineHeight: 1.4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* What we assess */}
        <div style={{ background: B.white, border: `1px solid ${B.fog}`, borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: B.ink, marginBottom: 16 }}>What this assessment covers</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {SECTIONS.map(s => (
              <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: B.stone }}>
                <span>{s.icon}</span>{s.title}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 40, fontSize: 12, color: B.fog }}>
          © 2025 DataSattva · datasattva.com · Data privacy with integrity
        </div>
      </div>
    </div>
  );

  // ── QUIZ ───────────────────────────────────────────────────────────────────
  if (screen === "quiz") return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: B.page, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <Topbar right="DPDP Self-Assessment" />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 80px" }}>
        <Progress current={sectionIdx + 1} total={SECTIONS.length} />

        {/* Section header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, color: B.turmeric, fontWeight: 600, marginBottom: 4, letterSpacing: "0.04em" }}>
            Section {sectionIdx + 1} of {SECTIONS.length}
          </div>
          <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: B.ink, marginBottom: section.note ? 10 : 0 }}>
            {section.icon} {section.title}
          </div>
          {section.note && (
            <div style={{ fontSize: 13, color: B.stone, lineHeight: 1.6, borderLeft: `3px solid ${B.gold}`, paddingLeft: 12, marginTop: 8 }}>
              {section.note}
            </div>
          )}
        </div>

        {/* Questions */}
        {section.questions.map((q, qi) => (
          <div key={q.id} style={{ background: B.white, border: `1px solid ${B.fog}`, borderRadius: 12, padding: 20, marginBottom: 14 }}>
            <div style={{ fontWeight: 500, color: B.ink, fontSize: 15, marginBottom: 14, lineHeight: 1.5 }}>
              {qi + 1}. {q.text}
            </div>
            {q.type === "multi" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map(opt => {
                  const sel = (answers[q.id] || []).includes(opt);
                  return (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${sel ? B.turmeric : B.fog}`, background: sel ? `${B.turmeric}0F` : B.mist, cursor: "pointer", fontSize: 14, color: B.ink, fontWeight: sel ? 500 : 400 }}>
                      <input type="checkbox" checked={sel} onChange={() => toggleMulti(q.id, opt)} style={{ accentColor: B.turmeric, width: 15, height: 15, flexShrink: 0 }} />
                      {opt}
                    </label>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map(opt => {
                  const sel = answers[q.id] === opt;
                  return (
                    <button key={opt} onClick={() => answer(q.id, opt)}
                      style={{ textAlign: "left", padding: "11px 16px", borderRadius: 8, border: `1.5px solid ${sel ? B.turmeric : B.fog}`, background: sel ? `${B.turmeric}0F` : B.mist, cursor: "pointer", fontSize: 14, color: B.ink, fontWeight: sel ? 500 : 400, transition: "border-color 0.15s" }}>
                      {sel && <span style={{ color: B.turmeric, marginRight: 6 }}>✓</span>}{opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
          <button
            onClick={() => sectionIdx > 0 ? setSectionIdx(s => s - 1) : setScreen("landing")}
            style={{ background: "transparent", border: `1px solid ${B.fog}`, borderRadius: 8, padding: "12px 24px", color: B.stone, cursor: "pointer", fontSize: 14 }}>
            Back
          </button>
          <button
            disabled={!sectionDone()}
            onClick={() => sectionIdx < SECTIONS.length - 1 ? setSectionIdx(s => s + 1) : setScreen("results")}
            style={{ background: sectionDone() ? B.turmeric : B.fog, color: sectionDone() ? B.white : B.stone, border: "none", borderRadius: 8, padding: "12px 28px", fontWeight: 600, cursor: sectionDone() ? "pointer" : "default", fontSize: 15, transition: "background 0.2s" }}>
            {sectionIdx < SECTIONS.length - 1 ? "Next section" : "See my results"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── RESULTS ────────────────────────────────────────────────────────────────
  if (screen === "results") {
    const sectionScores = SECTIONS.map(sec => {
      let s = 0, m = 0;
      sec.questions.forEach(q => {
        if (!q.risk) return;
        const possible = Math.max(...Object.values(q.risk));
        m += possible;
        s += q.risk[answers[q.id]] ?? 0;
      });
      return { ...sec, s, m };
    }).filter(x => x.m > 0);

    const topGaps = [...sectionScores].sort((a, b) => (b.s / b.m) - (a.s / a.m)).slice(0, 3);
    const relevantServices = SERVICES.filter(sv => gaps.has(sv.gap));

    return (
      <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: B.page, minHeight: "100vh" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <Topbar right="Your results" />
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px 80px" }}>

          {/* Score card */}
          <div style={{ background: B.white, border: `1px solid ${B.fog}`, borderRadius: 16, padding: "32px 24px", textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: B.ink, marginBottom: 4 }}>Your DPDP readiness</div>
            <div style={{ fontSize: 13, color: B.stone, marginBottom: 24 }}>Based on your responses across 8 sections of the DPDP Act 2023</div>
            <ScoreArc compliance={compliance} risk={risk} />
            <div style={{ fontSize: 14, color: B.stone, lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
              {risk.short === "Critical" && "Significant regulatory exposure. Immediate remediation required across multiple areas."}
              {risk.short === "High" && "Substantial gaps identified. Priority action needed before enforcement commences."}
              {risk.short === "Moderate" && "A reasonable foundation exists. Targeted improvements will bring you to compliance."}
              {risk.short === "Low" && "Strong compliance posture. Periodic review will keep you current as rules evolve."}
            </div>
          </div>

          {/* Section breakdown */}
          <div style={{ background: B.white, border: `1px solid ${B.fog}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18, color: B.ink, marginBottom: 20 }}>Gap analysis by area</div>
            {sectionScores.map(sec => {
              const r = getRisk(sec.s, sec.m);
              return (
                <div key={sec.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, color: B.ink }}>{sec.icon} {sec.title}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: r.color, background: r.bg, padding: "2px 8px", borderRadius: 4 }}>{r.short}</span>
                  </div>
                  <div style={{ height: 4, background: B.fog, borderRadius: 99 }}>
                    <div style={{ height: "100%", width: `${r.pct}%`, background: r.color, borderRadius: 99, transition: "width 1s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Top gaps */}
          {topGaps.length > 0 && topGaps[0].s > 0 && (
            <div style={{ background: B.highBg, border: `1px solid ${B.high}33`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18, color: B.high, marginBottom: 16 }}>Priority gaps to address</div>
              {topGaps.filter(s => s.s > 0).map(sec => (
                <div key={sec.id} style={{ display: "flex", gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${B.high}22` }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{sec.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: B.ink, fontSize: 14, marginBottom: 2 }}>{sec.title}</div>
                    <div style={{ fontSize: 13, color: B.stone, lineHeight: 1.5 }}>
                      {SERVICES.find(sv => sv.gap === sec.id)?.desc || "Remediation recommended."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lead capture */}
          {!submitted ? (
            <div style={{ background: B.ink, borderRadius: 16, padding: 28 }}>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: B.white, marginBottom: 8, textAlign: "center" }}>
                Get your remediation roadmap
              </div>
              <div style={{ fontSize: 14, color: "#A8A29E", textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>
                A DataSattva expert will review your results and provide a personalised action plan — at no charge.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                {[
                  { key: "name",  placeholder: "Your name",         type: "text"  },
                  { key: "org",   placeholder: "Organisation",       type: "text"  },
                  { key: "email", placeholder: "Business email",     type: "email" },
                  { key: "phone", placeholder: "Phone / WhatsApp",   type: "tel"   },
                ].map(f => (
                  <input key={f.key} type={f.type} placeholder={f.placeholder}
                    value={lead[f.key]} onChange={e => setLead(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ padding: "12px 14px", borderRadius: 8, border: "1px solid #3A3530", background: "#2A2520", color: B.white, fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif" }} />
                ))}
              </div>
              <button
                disabled={!lead.name || !lead.org || !lead.email}
                onClick={() => setSubmitted(true)}
                style={{ width: "100%", background: lead.name && lead.org && lead.email ? B.turmeric : "#3A3530", color: B.white, border: "none", borderRadius: 8, padding: 14, fontWeight: 600, fontSize: 15, cursor: lead.name && lead.org && lead.email ? "pointer" : "default", fontFamily: "Inter, sans-serif" }}>
                Send me my roadmap
              </button>
              <div style={{ fontSize: 12, color: "#6B6560", textAlign: "center", marginTop: 10 }}>
                No spam. Expert callback within one business day. · datasattva.com
              </div>
            </div>
          ) : (
            <div style={{ background: B.white, border: `1px solid ${B.fog}`, borderRadius: 16, padding: 28, textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🙏</div>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: B.ink, marginBottom: 8 }}>
                Thank you, {lead.name}
              </div>
              <div style={{ fontSize: 14, color: B.stone, lineHeight: 1.7, marginBottom: 24 }}>
                Your assessment results have been noted. A DataSattva expert will reach out to <strong>{lead.email}</strong> within one business day with your personalised compliance roadmap.
              </div>
              <button onClick={() => setShowServices(s => !s)}
                style={{ background: B.turmeric, color: B.white, border: "none", borderRadius: 8, padding: "11px 24px", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>
                {showServices ? "Hide" : "See our services"}
              </button>
            </div>
          )}

          {/* Services */}
          {submitted && showServices && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 18, color: B.ink, marginBottom: 14 }}>
                Recommended services for your gaps
              </div>
              {relevantServices.length > 0 ? relevantServices.map(sv => (
                <div key={sv.gap} style={{ background: B.white, border: `1px solid ${B.fog}`, borderLeft: `4px solid ${B.gold}`, borderRadius: 10, padding: 18, marginBottom: 10 }}>
                  <div style={{ fontWeight: 600, color: B.ink, fontSize: 14, marginBottom: 4 }}>{sv.label}</div>
                  <div style={{ fontSize: 13, color: B.stone, lineHeight: 1.5 }}>{sv.desc}</div>
                </div>
              )) : (
                <div style={{ background: B.lowBg, borderRadius: 10, padding: 18, color: B.low, fontWeight: 500, fontSize: 14 }}>
                  Your assessment shows a strong compliance posture. We recommend an annual DPDP health check to stay current as rules evolve.
                </div>
              )}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={() => { setScreen("landing"); setSectionIdx(0); setAnswers({}); setSubmitted(false); setShowServices(false); }}
              style={{ background: "transparent", border: `1px solid ${B.fog}`, borderRadius: 8, padding: "10px 24px", color: B.stone, cursor: "pointer", fontSize: 13 }}>
              Start a new assessment
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: B.fog }}>
            © 2025 DataSattva · datasattva.com · Data privacy with integrity
          </div>
        </div>
      </div>
    );
  }

  return null;
}
