# Zara E2E Playwright Tests

This repository contains end-to-end (E2E) tests for the Zara e-commerce platform using [Playwright](https://playwright.dev/) with TypeScript.  
The tests automate core user journeys like searching products, handling modals, adding items to the basket, and more.

---

## Features

- Playwright with TypeScript for robust E2E automation
- Page Object Model (POM) architecture
- Cookie modal handling and storage state support
- Test fixtures for consistent setup and reuse
- Examples of iterating through product sizes and basket logic

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v14+
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Steps

```bash
git clone https://github.com/ZoiaTsmykailo/zara.e2e.pw.ts.git
cd zara.e2e.pw.ts
npm install         # or yarn install
npx playwright install
```

Run all tests:

```bash
npx playwright test
```

Run a specific test:

```bash
npx playwright test tests/working-test.spec.ts
```

View the HTML test report:

```bash
npx playwright show-report
```
