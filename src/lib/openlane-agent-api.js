const API_BASE = import.meta.env.VITE_OPENLANE_AGENT_API || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    const message = data?.detail || data?.message || `Request failed with ${res.status}`;
    throw new Error(message);
  }

  return data;
}

function encodeWaveformPath(path) {
  return path
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

export const openlaneAgentApi = {
  health: () => request("/api/health"),
  designs: () => request("/api/designs"),
  createJob: (designId) =>
    request("/api/jobs", {
      method: "POST",
      body: JSON.stringify({ design_id: designId }),
    }),
  getJob: (jobId) => request(`/api/jobs/${jobId}`),
  runStep: (jobId, step) =>
    request(`/api/jobs/${jobId}/run/${step}`, {
      method: "POST",
    }),
  getLog: (jobId, step) => request(`/api/jobs/${jobId}/logs/${step}`),
  getSummary: (jobId) => request(`/api/jobs/${jobId}/summary`),
  getWaveforms: (jobId) => request(`/api/jobs/${jobId}/waveforms`),
  getWaveform: (jobId, path) =>
    request(`/api/jobs/${jobId}/waveforms/${encodeWaveformPath(path)}`),
};
