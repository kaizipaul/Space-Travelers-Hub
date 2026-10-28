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
