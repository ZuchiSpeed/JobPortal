/**
 * CENTRALIZED API CONFIGURATION
 * Purpose: Stores the base URL for user-related backend endpoints.
 * Why: If the backend port or deployment URL changes, you only need to update it
 * in this one file, and all components importing it will automatically use the new URL.
 */
export const USER_API_END_POINT = "http://localhost:3000/api/v1/user";
