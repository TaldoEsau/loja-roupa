# Tasks: Freestyle Store Landing Page

**Input**: Design documents from `/specs/001-freestyle-landing/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize React project with Vite in root
- [X] T002 Install Remotion dependency
- [X] T003 [P] Configure basic project structure (remove boilerplate) in src/App.tsx and src/main.tsx
- [X] T004 [P] Setup Vanilla CSS design system variables in src/styles/design-system.css
- [X] T005 [P] Setup global styles in src/styles/index.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T006 Setup assets directory and copy placeholder frames (if needed) in src/assets/frames/
- [X] T007 Create custom scroll hook/utility for tracking scroll percentage in src/hooks/useScroll.ts

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Scrollytelling Hero Section (Priority: P1) 🎯 MVP

**Goal**: As a visitor, I want to see a 360° rotating sequence of the logo and skateboard clothing controlled by my scroll position.

**Independent Test**: Scroll up and down the Hero section and observe the visual sequence update proportionally without glitches.

### Implementation for User Story 1

- [X] T008 [US1] Create Hero component structure in src/components/Hero.tsx
- [X] T009 [US1] Implement Remotion sequence mapping based on scroll percentage in src/components/Hero.tsx
- [X] T010 [US1] Implement asset preloading logic in src/components/Hero.tsx
- [X] T011 [US1] Integrate Hero component into src/App.tsx

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Minimalist Navigation (Priority: P2)

**Goal**: As a visitor, I want a clear, sticky navigation bar.

**Independent Test**: Scroll down and verify the sticky behavior and background transition.

### Implementation for User Story 2

- [X] T012 [P] [US2] Create Header component in src/components/Header.tsx
- [X] T013 [US2] Implement sticky positioning and glassmorphism scroll logic in src/components/Header.tsx
- [X] T014 [US2] Integrate Header component into src/App.tsx

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Product Catalog and Manifesto (Priority: P2)

**Goal**: As a visitor, I want to read the brand manifesto and view the latest clothing drops in a clean, responsive grid.

**Independent Test**: Resize the browser window and verify the responsive layout of the product cards and text.

### Implementation for User Story 3

- [X] T015 [P] [US3] Create Manifesto component in src/components/Manifesto.tsx
- [X] T016 [P] [US3] Create ProductGrid component in src/components/ProductGrid.tsx
- [X] T017 [P] [US3] Create Footer component in src/components/Footer.tsx
- [X] T018 [US3] Integrate Manifesto, ProductGrid, and Footer into src/App.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T019 Code cleanup and refactoring
- [X] T020 Run quickstart.md validation
- [X] T021 Add Carousel component with Emil Kowalski spring momentum & drag interactions in src/components/Carousel.tsx
- [X] T022 Apply Leonxlnx taste-skill high-end minimalist UI styling and Emil Kowalski design engineering principles across all components
