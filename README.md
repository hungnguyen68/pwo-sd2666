# PWOverview

End-to-end UI test automation for [DemoQA](https://demoqa.com) built with [Playwright](https://playwright.dev) and TypeScript, following the Page Object Model.

## Tech Stack

- [Playwright Test](https://playwright.dev/docs/intro) (`@playwright/test`)
- TypeScript
- `csv-parse` for CSV-driven test data

## Project Structure

```
constant/           Shared constants (base URL, delimiters)
core/
  browser/          Browser lifecycle management and utilities
  element/          Base element wrapper
  fixture/          Base Playwright test/expect fixture
  utils/            API client, CSV parsing, date helpers
data-object/         Typed data models used by tests and page objects
fixture/             Page-object fixture (extends base fixture with page objects)
page-object/         Page objects for each page/component under test
  components/        Reusable UI components (date picker, nav bar)
test-data/           CSV test data files
tests/ui/            Test specs
playwright-report/   HTML report output
test-results/        Raw test run artifacts
```

## Prerequisites

- Node.js (LTS recommended)
- npm

## Setup

Install dependencies and Playwright browsers:

```bash
npm install
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/ui/test-search-book.spec.ts
```

Run tests matching a tag/title (e.g. `@seachBook`):

```bash
npx playwright test -g "@seachBook"
```

Run tests in headed/debug mode:

```bash
npx playwright test --debug
```

View the HTML report after a run:

```bash
npx playwright show-report
```

## Test Data

Data-driven tests read fixtures from CSV files in [test-data/ui](test-data/ui), parsed via [CSVHelper](core/utils/csv.ts) into typed objects defined in [data-object/ui](data-object/ui).

## Configuration

Playwright configuration (browsers, reporter, trace settings, etc.) lives in [playwright.config.ts](playwright.config.ts). The base URL for the application under test is defined in [constant/url.ts](constant/url.ts).

