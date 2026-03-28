import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/*
 * StrictMode is intentionally removed.
 *
 * React 18/19 StrictMode double-mounts every component in development
 * (mount → simulated unmount → remount). Framer Motion treats the remount
 * as a re-render and skips the `initial` state, jumping straight to the
 * final `animate` state — so NO animations are ever visible.
 *
 * StrictMode has no effect in production builds, but in dev it breaks
 * all entry animations. Removing it restores correct Framer Motion behaviour.
 */
createRoot(document.getElementById('root')).render(
  <App />
)
