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

function parseVcd(vcdText) {
  if (!vcdText) return { signals: [], maxTime: 0, timescale: "" };

  const idToSignal = new Map();
  const scopeStack = [];
  let currentTime = 0;
  let maxTime = 0;
  let timescale = "";
  let inDefinitions = true;

  const lines = vcdText.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("$timescale")) {
      const inline = line.match(/\$timescale\s+(.+?)\s+\$end/);
      if (inline?.[1]) {
        timescale = inline[1].trim();
      }
      continue;
    }

    if (line.startsWith("$scope")) {
      const match = line.match(/\$scope\s+\S+\s+(.+?)\s+\$end/);
      if (match?.[1]) scopeStack.push(match[1]);
      continue;
    }

    if (line.startsWith("$upscope")) {
      scopeStack.pop();
      continue;
    }

    if (line.startsWith("$var")) {
      const match = line.match(/^\$var\s+\S+\s+(\d+)\s+(\S+)\s+(.+?)\s+\$end$/);
      if (!match) continue;

      const [, widthRaw, id, nameRaw] = match;
      const cleanName = nameRaw.replace(/\s+/g, " ").trim();
      const fullName = [...scopeStack, cleanName].filter(Boolean).join(".");

      idToSignal.set(id, {
        id,
        name: fullName || cleanName || id,
        width: Number(widthRaw),
        changes: [],
      });
      continue;
    }

    if (line.startsWith("$enddefinitions")) {
      inDefinitions = false;
      continue;
    }

    if (inDefinitions) continue;

    if (line[0] === "#") {
      const nextTime = Number(line.slice(1));
      if (Number.isFinite(nextTime)) {
        currentTime = nextTime;
        maxTime = Math.max(maxTime, nextTime);
      }
      continue;
    }

    if (line[0] === "b" || line[0] === "B") {
      const match = line.match(/^[bB]([01xzXZ]+)\s+(\S+)/);
      if (!match) continue;
      const [, value, id] = match;
      const signal = idToSignal.get(id);
      if (signal) signal.changes.push({ time: currentTime, value: value.toLowerCase() });
      continue;
    }

    const scalar = line.match(/^([01xzXZ])(\S+)$/);
    if (scalar) {
      const [, value, id] = scalar;
      const signal = idToSignal.get(id);
      if (signal) signal.changes.push({ time: currentTime, value: value.toLowerCase() });
    }
  }

  const signals = Array.from(idToSignal.values())
    .filter((signal) => signal.changes.length > 0)
    .slice(0, 14);

  return { signals, maxTime, timescale };
}

function valueAt(signal, time) {
  let value = "x";
  for (const change of signal.changes) {
    if (change.time > time) break;
    value = change.value;
  }
  return value;
}

function ScalarWave({ signal, maxTime, width }) {
  const left = 14;
  const high = 12;
  const low = 34;
  const usableWidth = width - left * 2;
  const changes = signal.changes.length
    ? signal.changes
    : [{ time: 0, value: "x" }];

  const points = [];
  let previousX = left;
  let previousY = valueAt(signal, 0) === "1" ? high : low;

  points.push(`${previousX},${previousY}`);

  for (const change of changes) {
    const x = left + (maxTime ? (change.time / maxTime) * usableWidth : 0);
    const y = change.value === "1" ? high : change.value === "0" ? low : 23;
    points.push(`${x},${previousY}`);
    points.push(`${x},${y}`);
    previousX = x;
    previousY = y;
  }

  points.push(`${left + usableWidth},${previousY}`);

  return (
    <svg className="ol-wave-svg" viewBox={`0 0 ${width} 48`} role="img" aria-label={`${signal.name} waveform`}>
      <line x1={left} y1={high} x2={left + usableWidth} y2={high} />
      <line x1={left} y1={low} x2={left + usableWidth} y2={low} />
      <polyline points={points.join(" ")} />
    </svg>
  );
}

function VectorWave({ signal, maxTime, width }) {
  const left = 14;
  const center = 24;
  const usableWidth = width - left * 2;
  const shownChanges = signal.changes.slice(0, 12);

  return (
    <svg className="ol-wave-svg" viewBox={`0 0 ${width} 48`} role="img" aria-label={`${signal.name} vector waveform`}>
      <line x1={left} y1={center} x2={left + usableWidth} y2={center} />
      {shownChanges.map((change, index) => {
        const x = left + (maxTime ? (change.time / maxTime) * usableWidth : 0);
        return (
          <g key={`${change.time}-${index}`}>
            <line x1={x} y1="9" x2={x} y2="39" />
            <text x={Math.min(x + 4, left + usableWidth - 42)} y="18">
              {change.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function WaveformViewer({ text, truncated }) {
  const parsed = useMemo(() => parseVcd(text), [text]);

  if (!text) {
    return <p className="ol-muted">Load a VCD waveform after running cocotb.</p>;
  }

  if (!parsed.signals.length) {
    return <p className="ol-muted">No previewable signal changes found in this VCD.</p>;
  }

  return (
    <div className="ol-waveform-viewer">
      <div className="ol-waveform-meta">
        <span>Timescale: {parsed.timescale || "unknown"}</span>
        <span>Max time: {parsed.maxTime}</span>
        {truncated && <span>Preview truncated</span>}
      </div>

      <div className="ol-wave-table">
        {parsed.signals.map((signal) => (
          <div className="ol-wave-row" key={signal.id}>
            <div className="ol-wave-label">
              <strong>{signal.name}</strong>
              <span>{signal.width}-bit</span>
            </div>
            {signal.width === 1 ? (
              <ScalarWave signal={signal} maxTime={parsed.maxTime} width={900} />
            ) : (
              <VectorWave signal={signal} maxTime={parsed.maxTime} width={900} />
            )}
          </div>
        ))}
      </div>
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
  const [activeTab, setActiveTab] = useState("summary");
  const [waveforms, setWaveforms] = useState([]);
  const [selectedWaveform, setSelectedWaveform] = useState("");
  const [waveformText, setWaveformText] = useState("");
  const [waveformTruncated, setWaveformTruncated] = useState(false);

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

  useEffect(() => {
    if (activeTab === "waveform" && job?.job_id) {
      loadWaveforms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, job?.job_id, job?.cocotb?.status]);

  async function createJob() {
    setBusy(true);
    setError("");
    setLog("");
    setWaveforms([]);
    setSelectedWaveform("");
    setWaveformText("");
    setActiveTab("summary");
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
      setActiveTab("logs");
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
      setActiveTab("summary");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function loadWaveforms() {
    if (!job?.job_id) return;
    setBusy(true);
    setError("");
    try {
      const data = await openlaneAgentApi.getWaveforms(job.job_id);
      const list = data.waveforms || [];
      setWaveforms(list);
      const firstPreviewable = list.find((item) => item.previewable);
      if (!selectedWaveform && firstPreviewable) {
        setSelectedWaveform(firstPreviewable.path);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function loadSelectedWaveform(path = selectedWaveform) {
    if (!job?.job_id || !path) return;
    setBusy(true);
    setError("");
    try {
      const data = await openlaneAgentApi.getWaveform(job.job_id, path);
      setWaveformText(data.text || "");
      setWaveformTruncated(Boolean(data.truncated));
      setActiveTab("waveform");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const canRunCocotb = job && job.cocotb?.status !== "running";
  const canRunOpenLane = job && job.cocotb?.status === "passed" && job.openlane?.status !== "running";
  const previewableWaveforms = waveforms.filter((item) => item.previewable);

  return (
    <section className="ol-shell" id="openlane-agent-lab">
      <div className="ol-header">
        <p className="ol-kicker">AI-Assisted RTL-to-GDS Lab</p>
        <h2>OpenLane + cocotb Portfolio Demo</h2>
        <p>
          A safe public demo that runs fixed RTL examples through Python verification and a Dockerized
          OpenLane flow, then summarizes logs, metrics, and VCD waveforms.
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
        <div className="ol-card ol-results-card">
          <div className="ol-tabs" role="tablist" aria-label="OpenLane result tabs">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "summary"}
              className={activeTab === "summary" ? "active" : ""}
              onClick={() => setActiveTab("summary")}
            >
              Summary
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "logs"}
              className={activeTab === "logs" ? "active" : ""}
              onClick={() => setActiveTab("logs")}
            >
              Logs
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "waveform"}
              className={activeTab === "waveform" ? "active" : ""}
              onClick={() => setActiveTab("waveform")}
            >
              Waveform
            </button>
          </div>

          {activeTab === "summary" && (
            <div className="ol-tab-panel">
              <h3>Agent summary</h3>
              <p className="ol-summary">{job.summary || "Run cocotb or OpenLane, then click Explain Result."}</p>
              <MetricGrid metrics={job.metrics} />
            </div>
          )}

          {activeTab === "logs" && (
            <div className="ol-tab-panel">
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
          )}

          {activeTab === "waveform" && (
            <div className="ol-tab-panel">
              <div className="ol-card-title-row">
                <div>
                  <h3>Waveform interface</h3>
                  <p className="ol-muted">
                    Run cocotb first. The MVP previews small VCD files generated by the simulator.
                  </p>
                </div>
                <button className="ol-button ol-button-small" onClick={loadWaveforms} disabled={busy}>
                  Refresh waveforms
                </button>
              </div>

              {previewableWaveforms.length > 0 ? (
                <div className="ol-wave-controls">
                  <label className="ol-label" htmlFor="waveform-select">VCD file</label>
                  <select
                    id="waveform-select"
                    className="ol-select"
                    value={selectedWaveform}
                    onChange={(event) => setSelectedWaveform(event.target.value)}
                    disabled={busy}
                  >
                    {previewableWaveforms.map((waveform) => (
                      <option key={waveform.path} value={waveform.path}>
                        {waveform.path} ({Math.round(waveform.size_bytes / 1024)} KB)
                      </option>
                    ))}
                  </select>
                  <button className="ol-button" onClick={() => loadSelectedWaveform()} disabled={busy || !selectedWaveform}>
                    Load waveform
                  </button>
                </div>
              ) : (
                <p className="ol-muted">
                  No VCD waveform found yet. Run cocotb, wait for it to finish, then click Refresh waveforms.
                </p>
              )}

              <WaveformViewer text={waveformText} truncated={waveformTruncated} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
