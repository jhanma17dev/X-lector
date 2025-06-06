# 🦴 X-lector — Knee Osteoarthritis Diagnostic Interface

**X-lector** is a web-based application developed as part of the final thesis project:  
**"Knee Osteoarthritis Detection Using CNNs and LLMs for Diagnosis and Recommendations"**.

This frontend acts as an intelligent and user-friendly interface that allows healthcare professionals and researchers to upload knee X-ray images, view diagnostic predictions, and receive AI-generated textual support for diagnosis and recommendations.

> ⚠️ This repository contains only the **frontend**. The backend (containing the AI models) is hosted and developed separately.

---

## 🎯 Objective

The main goal of **X-lector** is to assist in the early detection and diagnostic support of knee osteoarthritis by offering:

- 📤 Upload functionality for radiographic images of the knee.
- 🧠 Automatic classification of osteoarthritis severity using deep learning (CNN).
- 💬 Generation of natural language descriptions and suggestions using a language model (LLM).
- 📋 A history of previous analyses for review and tracking.

---

## 🛠️ Technologies Used

- **Vue** — component-based frontend library
- **Vite** — lightning-fast build tool
- **Tailwind CSS** — utility-first modern styling framework
- **Axios** — for API requests
- **JavaScript**

---

## 🚀 Installation & Setup

To run the project locally, follow these steps:

1. **Clone the repository**:

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
