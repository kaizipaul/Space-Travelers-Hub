import { useEffect, useState } from 'react';

export const useNow = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
};

export const breakdown = (target, now) => {
  const diff = new Date(target).getTime() - now;
  const past = diff < 0;
  const total = Math.floor(Math.abs(diff) / 1000);
  return {
    past,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
};
