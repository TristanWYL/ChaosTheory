# Design and Implementation

## Layout

Two main parts: `Header` and `Body`

-   Header: An app header bar for hosting links to different pages,
-   Body: A component for hosing all pages. If new pages need to be added, tweak `./src/components/Routes.tsx`.

## State Management

Considering this project is quite small, instead of using a state management library, an Observer Patten is implemented to make the application reactive to state updates.

-   The fetched exchange rateSet are stored in the `state` of `./src/misc/state.ts`,
-   The only way to update the state is to call relevant `update` function, which will do two things:
    -   update the state
    -   notify the listeners
-   To listen to the state change, simply call the custom hook `useObserver` wherever in your component with a `listener` function passed in as an argument. When the state updates, the `listener` will be called.

## Settings

Some settings could be adjusted at `./src/settings.ts`

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

In the project directory, you can run:

`yarn install` for installing the dependies

`yarn start` for starting the project locally

## How to test

`yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## How to prettify

`npx prettier --write **.ts **tsx`

[Reference](https://andrebnassis.medium.com/setting-prettier-on-a-react-typescript-project-2021-f9f0d5a1d6b0)

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
