import { useEffect, useMemo, useState } from "react";
import { openlaneAgentApi } from "../lib/openlane-agent-api";

function StatusBadge({ status }) {
  const label = status || "not_started";
  return <span className={`ol-badge ol-badge-${label}`}>{label.replace("_", " ")}</span>;
}

function MetricGrid({ metrics }) {
  if (!metrics || Object.keys(metrics).length === 0) {
    return <p className="ol-muted">No OpenLane metrics extracted yet.</p>;
  }

  const preferred = [
    "design__instance__count",
    "design__instance__area",
    "timing__setup__wns",
    "timing__setup__tns",
    "route__drc_errors",
    "artifact_count",
  ];

  const entries = preferred
    .filter((key) => metrics[key] !== undefined && metrics[key] !== "")
    .map((key) => [key, metrics[key]]);

  const fallback = Object.entries(metrics).slice(0, 6);
  const shown = entries.length ? entries : fallback;

  return (
    <div className="ol-metrics">
      {shown.map(([key, value]) => (
        <div className="ol-metric" key={key}>
          <span>{key}</span>
          <strong>{String(value)}</strong>
        </div>
      ))}
    </div>
  );
}

export default function OpenLaneAgentLab() {
  const [health, setHealth] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState("counter4");
  const [job, setJob] = useState(null);
  const [log, setLog] = useState("");
  const [logStep, setLogStep] = useState("cocotb");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const selected = useMemo(
    () => designs.find((item) => item.id === selectedDesign),
    [designs, selectedDesign]
  );

  useEffect(() => {
    let active = true;
    Promise.all([openlaneAgentApi.health(), openlaneAgentApi.designs()])
      .then(([healthData, designData]) => {
        if (!active) return;
        setHealth(healthData);
        setDesigns(designData);
        if (designData?.[0]?.id) setSelectedDesign(designData[0].id);
      })
      .catch((err) => setError(err.message));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!job?.job_id) return undefined;

    const poll = window.setInterval(async () => {
      try {
        const next = await openlaneAgentApi.getJob(job.job_id);
        setJob(next);
      } catch (err) {
        setError(err.message);
      }
    }, 2500);

    return () => window.clearInterval(poll);
  }, [job?.job_id]);

  async function createJob() {
    setBusy(true);
    setError("");
    setLog("");
    try {
      const created = await openlaneAgentApi.createJob(selectedDesign);
      const fullJob = await openlaneAgentApi.getJob(created.job_id);
      setJob(fullJob);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function runStep(step) {
    if (!job?.job_id) return;
    setBusy(true);
    setError("");
    try {
      await openlaneAgentApi.runStep(job.job_id, step);
      const next = await openlaneAgentApi.getJob(job.job_id);
      setJob(next);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function loadLog(step = logStep) {
    if (!job?.job_id) return;
    setBusy(true);
    setError("");
    try {
      setLogStep(step);
      const data = await openlaneAgentApi.getLog(job.job_id, step);
      setLog(data.text || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function refreshSummary() {
    if (!job?.job_id) return;
    setBusy(true);
    setError("");
    try {
      const data = await openlaneAgentApi.getSummary(job.job_id);
      setJob((prev) => ({ ...prev, summary: data.summary, metrics: data.metrics }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const canRunCocotb = job && job.cocotb?.status !== "running";
  const canRunOpenLane = job && job.cocotb?.status === "passed" && job.openlane?.status !== "running";

  return (
    <section className="ol-shell" id="openlane-agent-lab">
      <div className="ol-header">
        <p className="ol-kicker">AI-Assisted RTL-to-GDS Lab</p>
        <h2>OpenLane + cocotb Portfolio Demo</h2>
        <p>
          A safe public demo that runs fixed RTL examples through Python verification and a Dockerized
          OpenLane flow, then summarizes logs and metrics.
        </p>
      </div>

      <div className="ol-grid">
        <div className="ol-card">
          <div className="ol-card-title-row">
            <h3>1. Pick a fixed demo design</h3>
            {health?.ok && <span className="ol-live">API online</span>}
          </div>

          <label className="ol-label" htmlFor="design-select">Design</label>
          <select
            id="design-select"
            className="ol-select"
            value={selectedDesign}
            onChange={(event) => setSelectedDesign(event.target.value)}
            disabled={busy}
          >
            {designs.map((design) => (
              <option key={design.id} value={design.id}>{design.name}</option>
            ))}
          </select>

          <p className="ol-muted">{selected?.description || "Loading designs..."}</p>

          <button className="ol-button ol-button-primary" onClick={createJob} disabled={busy}>
            Create Demo Job
          </button>
        </div>

        <div className="ol-card">
          <h3>2. Run verification and implementation</h3>
          {!job ? (
            <p className="ol-muted">Create a job first.</p>
          ) : (
            <>
              <p className="ol-job-id">{job.job_id}</p>
              <div className="ol-status-row">
                <span>cocotb</span>
                <StatusBadge status={job.cocotb?.status} />
              </div>
              <div className="ol-status-row">
                <span>OpenLane</span>
                <StatusBadge status={job.openlane?.status} />
              </div>

              <div className="ol-actions">
                <button className="ol-button" onClick={() => runStep("cocotb")} disabled={!canRunCocotb || busy}>
                  Run cocotb
                </button>
                <button className="ol-button" onClick={() => runStep("openlane")} disabled={!canRunOpenLane || busy}>
                  Run OpenLane
                </button>
                <button className="ol-button" onClick={refreshSummary} disabled={busy}>
                  Explain Result
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {error && <div className="ol-error">{error}</div>}

      {job && (
        <div className="ol-grid ol-grid-wide">
          <div className="ol-card">
            <h3>Agent summary</h3>
            <p className="ol-summary">{job.summary || "Run cocotb or OpenLane, then click Explain Result."}</p>
            <MetricGrid metrics={job.metrics} />
          </div>

          <div className="ol-card">
            <div className="ol-card-title-row">
              <h3>Logs</h3>
              <div className="ol-actions-inline">
                <button className="ol-button ol-button-small" onClick={() => loadLog("cocotb")} disabled={busy}>
                  cocotb log
                </button>
                <button className="ol-button ol-button-small" onClick={() => loadLog("openlane")} disabled={busy}>
                  OpenLane log
                </button>
              </div>
            </div>
            <pre className="ol-log">{log || `No ${logStep} log loaded yet.`}</pre>
          </div>
        </div>
      )}
    </section>
  );
}
