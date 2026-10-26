const BASE_URL = '/api';

export async function checkHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}

export async function getConfigStatus() {
  const res = await fetch(`${BASE_URL}/reports/config/status`);
  return res.json();
}

export async function updateApiKey(apiKey) {
  const res = await fetch(`${BASE_URL}/reports/config/api-key`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: apiKey }),
  });
  return res.json();
}

export async function analyzeSafety(formData) {
  const res = await fetch(`${BASE_URL}/safety/analyze`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Safety inspection failed');
  }
  return res.json();
}

export async function analyzeCrack(formData) {
  const res = await fetch(`${BASE_URL}/cracks/analyze`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Crack analysis failed');
  }
  return res.json();
}

export async function estimateValuation(formData) {
  const res = await fetch(`${BASE_URL}/valuation/estimate`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Valuation estimation failed');
  }
  return res.json();
}

export async function generateProjectPlan(data) {
  const res = await fetch(`${BASE_URL}/planning/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Project planning failed');
  }
  return res.json();
}

export async function evaluateDailyAdvisory(data) {
  const res = await fetch(`${BASE_URL}/advisory/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Advisory evaluation failed');
  }
  return res.json();
}

export async function askKnowledgeChat(query, category) {
  const res = await fetch(`${BASE_URL}/knowledge/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, category }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || 'Knowledge query failed');
  }
  return res.json();
}

export async function getReports(module = null) {
  const url = module ? `${BASE_URL}/reports/?module=${module}` : `${BASE_URL}/reports/`;
  const res = await fetch(url);
  return res.json();
}

export async function deleteReport(id) {
  const res = await fetch(`${BASE_URL}/reports/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
