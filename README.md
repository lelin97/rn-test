# GitHub Explorer (React Native)

Take-home app built with **Expo** and **TypeScript** to search the public GitHub REST API, open repository details, and save favorites locally.

---

## Setup

- **Requirements:** Node.js (LTS), npm or yarn; **Expo Go** on a physical device or an iOS/Android emulator.
- **Install dependencies:** `npm install`
- **Run:** `npx expo start`  
  - If the phone cannot reach the bundler on your LAN: `npx expo start --tunnel`
- **GitHub API auth:** not required for public read access. Without a token, GitHub applies a strict rate limit; for longer demos you may use a personal access token (optional; not wired in this repo).

---

## Architecture

- **`src/api`** — HTTP client and `searchRepositories` / `getSingleRepository` with typed results (`success` / `message`).
- **`src/screens`** — Feature screens (search, detail, saved); screen-specific components live next to the screen when they are not shared app-wide.
- **`src/navigation`** — Bottom tabs (Search / Saved), search stack, and the detail screen registration (see trade-offs below).
- **`src/store` + `src/storage`** — **Zustand** for in-memory favorites; **AsyncStorage** for persistence. Initial hydration in `App.tsx`.
- **`src/types`** — Models and unions aligned with the API and UI needs.

---

## Trade-offs

- **Zustand instead of Context only:** little boilerplate for a global favorites list and simple selectors (`useIsFavorite`), appropriate for this scope.
- **Paginated search:** `useRef` for the list after `await` (avoids a stale closure); current **page** in `useState` for the “load more” flow.
- **Reading favorites:** defensive validation when parsing JSON avoids crashes on corrupted or legacy stored data.
- **Detail screen:** the favorite toggle is shown only after favorites finish loading from disk so the “saved” state matches storage and does not flash incorrectly.

---

## AI-assisted development

This project was built with help from **Cursor** (AI-assisted editor / agent). Cursor was used for scaffolding, refactors, TypeScript typing, and React Navigation structure. **The author reviewed and understands the codebase end-to-end** and can explain any part in a follow-up interview, as required by the assessment.

---

## Possible improvements (with more time)

- Unit tests (favorites storage, helpers) and/or API tests with mocks.
- Skeleton loaders on the search list instead of a spinner-only state.
- Infinite scroll with request race protection.
- Local cache of the last search or last detail for partial offline reading.
- Optional GitHub token via environment variable for higher rate limits (the client already surfaces rate-limit errors clearly; see `src/api/client.ts`).

---

## Navigation: root stack + `RepositoryDetail` vs Search-tab-only stack

The brief suggests a **stack inside the Search tab only** for the detail screen. In this app, **`RepositoryDetail` lives on the root stack** next to `MainTabs`: both **Search** and **Saved** navigate to the same `RepositoryDetail` route with `{ owner, repo }`. That avoids duplicating the same screen in two stacks, keeps a single place for header, favorites, and `goBack`, and shares behavior across tabs—at the cost of not matching the navigation tree from the PDF literally; an intentional choice for simplicity and reuse.

---

## Useful scripts

| Command          | Description           |
| ---------------- | --------------------- |
| `npm start`      | Runs `expo start`     |
| `npx expo start` | Starts the dev server |

---

## License

Assessment project — for reviewer use only.
