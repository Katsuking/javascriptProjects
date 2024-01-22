// public page と protected pageはここで管理する

/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication
 * @type {stirng[]}
 */
export const PublicRoutes = ['/']

/**
 * An array of routes that are used for authentication.
 * These routes routes will redirect logged in users to a specific page.
 * @type {stirng[]}
 */
export const authRoutes = ['/auth/login', '/auth/register']

/**
 * The prefix for API authentication routes
 * Routes start with this prefix are used for API authentication purposes
 * @type {stirng}
 */
export const apiAuthPrefix = '/api/auth'

/**
 * The default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings'
