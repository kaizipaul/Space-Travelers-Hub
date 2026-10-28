const PREFIX = 'space-travelers-hub/';

export const loadIds = (key) => {
  try {
    const saved = JSON.parse(localStorage.getItem(`${PREFIX}${key}`));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
};

export const saveIds = (key, ids) => {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(ids));
  } catch (error) {
    // Storage can be unavailable (private mode, quota); reservations just won't persist.
  }
};

export const loadCache = (key, maxAgeMs) => {
  try {
    const cached = JSON.parse(localStorage.getItem(`${PREFIX}${key}`));
    if (cached && Date.now() - cached.at < maxAgeMs) return cached.data;
    return null;
  } catch (error) {
    return null;
  }
};

export const saveCache = (key, data) => {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify({ at: Date.now(), data }));
  } catch (error) {
    // Caching is best-effort.
  }
};
