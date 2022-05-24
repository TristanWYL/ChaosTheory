# Production Url

https://chaos-theory.netlify.app

# Design and Implementation

## Driver

The application is driven by function `fetchExchangeRate` defined in `./src/index.tsx`, which has the following properties:

-   it fetches the exchange rates regularly and update the state reactively,
-   it is called every `INTERVAL_FOR_FETCHING_RATES_SEC` (imported from `./src/settings.ts`, which defaults to 60s) seconds,

## Layout

Two main parts: `Header` and `Body`

-   Header: An app header bar for hosting links to different pages,
-   Body: A component for hosing all pages. If new pages need to be added, tweak `./src/components/Routes.tsx`.

## State Management

Considering this project is quite small, instead of using a state management library, Observer Patten is implemented to make the application reactive to state updates.

-   The fetched exchange `rateSet` are stored in the `state` of `./src/misc/state.ts`,
-   The only way to update the state is to call relevant `update` function defined in .`/src/misc/state.ts`, which will do two things:
    -   update the state
    -   notify the listeners
-   To listen to the state change, simply call the custom hook `useObserver` wherever in your component with a `listener` function passed in as an argument. When the state updates, the `listener` will be called,
-   When updating the state, try to replace the old state with a new state, so that the `setState` function derived from `useState` can always work.

## Settings

Some settings could be adjusted at `./src/settings.ts`

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

In the project directory, you can run:

`yarn install` for installing the dependies

`yarn start` for starting the project locally

## How to test

`yarn test --watchAll`

## How to build

`yarn build`

## How to prettify

`npx prettier --write **.ts **.tsx`

[Reference](https://andrebnassis.medium.com/setting-prettier-on-a-react-typescript-project-2021-f9f0d5a1d6b0)
