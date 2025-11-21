/**
 * User ID and unlock state management
 */

const USER_ID_KEY = "user_id";
const UNLOCK_STATE_KEY = "unlock_state";

/**
 * Initialize user_id if it doesn't exist
 */
export const initializeUserId = (): string => {
  if (typeof window === "undefined") return "";
  
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
};

/**
 * Get current user_id
 */
export const getUserId = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(USER_ID_KEY);
};

/**
 * Check if user is unlocked
 */
export const isUnlocked = (): boolean => {
  if (typeof window === "undefined") return false;
  const state = localStorage.getItem(UNLOCK_STATE_KEY);
  return state === "true";
};

/**
 * Set unlock state
 */
export const setUnlocked = (unlocked: boolean): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(UNLOCK_STATE_KEY, unlocked ? "true" : "false");
};

/**
 * Get API URL from environment
 */
export const getApiUrl = (): string => {
  return import.meta.env.VITE_API_URL || "https://blursell-backend.onrender.com";
};

