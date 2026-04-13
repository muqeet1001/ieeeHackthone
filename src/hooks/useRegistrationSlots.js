import { useState, useEffect, useCallback } from 'react';
import { REGISTER_API_URL, MAX_TEAM_SLOTS } from '../config';

/** Dev only: set `VITE_PREVIEW_REGISTRATION_FULL=true` in `.env.local` to preview the “full” UI. */
const PREVIEW_REGISTRATION_FULL =
  import.meta.env.DEV && import.meta.env.VITE_PREVIEW_REGISTRATION_FULL === 'true';

/**
 * Loads current team count from GET /api/register and derives seats left.
 * Polls periodically so the hero and CTAs stay roughly in sync.
 */
export function useRegistrationSlots(pollMs = 45000) {
  const [count, setCount] = useState(() =>
    PREVIEW_REGISTRATION_FULL ? MAX_TEAM_SLOTS : null
  );
  const [loading, setLoading] = useState(() => !PREVIEW_REGISTRATION_FULL);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (PREVIEW_REGISTRATION_FULL) {
      setCount(MAX_TEAM_SLOTS);
      setError(null);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(REGISTER_API_URL);
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Could not load registration status');
      }
      const n = typeof json.count === 'number' ? json.count : 0;
      setCount(n);
      setError(null);
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (PREVIEW_REGISTRATION_FULL) return undefined;
    refresh();
    if (pollMs <= 0) return undefined;
    const id = setInterval(refresh, pollMs);
    return () => clearInterval(id);
  }, [refresh, pollMs]);

  const seatsLeft = count == null ? null : Math.max(0, MAX_TEAM_SLOTS - count);
  const isFull = count != null && count >= MAX_TEAM_SLOTS;

  return {
    count,
    seatsLeft,
    isFull,
    loading,
    error,
    maxSlots: MAX_TEAM_SLOTS,
    refresh,
  };
}
