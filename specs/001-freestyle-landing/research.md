# Research: Freestyle Landing Page

## Tech Stack
- **Decision**: Vite + React
- **Rationale**: React is required by Remotion. Vite provides a fast, lightweight dev environment ideal for a landing page.
- **Alternatives considered**: Next.js (Overkill for a single landing page without complex routing/SSR needs). Vanilla JS (Rejected because Remotion is React-based).

## Styling
- **Decision**: Vanilla CSS with CSS Variables
- **Rationale**: The system guidelines strictly recommend Vanilla CSS for maximum control and avoiding Tailwind unless requested.
- **Alternatives considered**: TailwindCSS (Rejected per system rules).

## Scrollytelling Implementation
- **Decision**: Custom React Scroll Listener with Canvas or Remotion Player
- **Rationale**: The user explicitly requested Remotion skills. We will map the window scroll position to control the frame index of the image sequence.
