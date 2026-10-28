// Launch Library 2 is the single data source. The free tier allows ~15 requests/hour.
export const LL2 = 'https://ll.thespacedevs.com/2.2.0';

export const fetchJson = async (url, timeoutMs = 10000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
};
