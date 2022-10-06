# Pokedex
This project lists Pokemon and allows you to explore details about each creature. You can also create your own Pokemon.

## Supported Language Features
This project supports a superset of the latest `JavaScript`/`TypeScript` standard. In addition to [ES6](http://es6-features.org) syntax features, it also supports:
- [Exponentiation Operator](https://github.com/tc39/proposal-exponentiation-operator) (ES2016)
- [Async/await](https://github.com/tc39/proposal-async-await) (ES2017)
- [Object Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread) (ES2018)
- [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 4 proposal)
- [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal)
- [TSX](https://www.typescriptlang.org/docs/handbook/jsx.html) and [TypeScript](https://www.typescriptlang.org)

Constant enums and namespaces are not supported, you can learn about the constraints of using [Babel with TypeScript here](https://babeljs.io/docs/en/babel-plugin-transform-modules-amd).

## Core Libraries
- [React 18.2.0](https://reactjs.org) with `React Scripts 5.0.1`
- [SASS 1.53.0](https://sass-lang.com) with [CSS Modules](https://github.com/css-modules/css-modules)
- [MUI 5.8.6](https://mui.com) with `Emotion` styling engine, `Roboto Fonts` and `Material Icons`
- [TypeScript 4.7.4](https://www.typescriptlang.org) with [ES6](http://es6-features.org)
- [React Router 6.3.0](https://reactrouter.com/) for the routing system

## Code Quality & Performance
- [ESLint 8.18.0](https://eslint.org) with `Airbnb`, `TypeScript`, `React`, `React Hooks` and `Jest` configuration
- [Stylelint 14.9.1](https://stylelint.io) to analyse `CSS`/`SCSS` files
- [Jest 27.5.2](https://jestjs.io/docs/getting-started) to test `JavaScript`/`TypeScript` files
- [React Testing Library 13.3.0](https://testing-library.com/docs/react-testing-library/intro) to test components
- [Web Vitals 2.1.4](https://web.dev/vitals) to meassure performance

## Built-in Settings
- [.editorconfig](https://editorconfig.org) settings to standardize charset, ending of lines and indentation
- [.vscode](https://code.visualstudio.com/docs/getstarted/settings) settings with integrated Chrome Debugger, faster search results and auto-format on save
- [Environment files](https://create-react-app.dev/docs/adding-custom-environment-variables) for `Local`, `Test`, `Development`, `QA`, `Staging` and `Production`

## Environment Quick Setup
1. Install [NodeJs](https://nodejs.org/es/download)
2. Install [Git](https://git-scm.com/downloads)
3. Install [VS Code](https://code.visualstudio.com/download)
4. Install VS Code recomented extensions:
   * [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
   * [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
   * [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
   * [Icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)
   * [MDX](https://marketplace.visualstudio.com/items?itemName=silvenon.mdx)
   * [NpmIntellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
   * [SCSS Formatter](https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter)
   * [SortLines](https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines)
   * [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
5. Install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for Google Chrome

## Running & Debugging the application for the first time
1. Clone repo:
   - `git clone git@github.com:MomchilJambazov/pokedex.git`
2. Install project dependencies:
   - `cd pokedex`
   - `yarn install`
3. Start the application:
   - `yarn start`

## Available Scripts
| Command               | Description                                      | Evironment File  |
| :---                  | :---                                             | :---             |
| `npm run init`        | Installs project dependencies for the first time | N/A              |
| `npm run lint`        | Analyses **JavaSript**/**TypeScript** code       | N/A              |
| `npm run lint:f`      | Try to fix **JavaSript**/**TypeScript** errors   | N/A              |
| `npm run slint`       | Analyses **CSS**/**SCSS** styles                 | N/A              |
| `npm run slint:f`     | Try to fix **CSS**/**SCSS** errors               | N/A              |
| `npm test`            | Executes Unit Tests outputting to `out/coverage` | .env.test        |
| `npm start`           | Runs the App in http://localhost:3000            | .env.local       |
| `npm run build:l`     | Builds the App to `out/build/local`              | .env.local       |
| `npm run build:d`     | Builds the App to `out/build/development`        | .env.development |
| `npm run build`       | Builds the App to `out/build/production`         | .env.production  |

## Adding a Stylesheet
This project supports [Sass](https://sass-lang.com/guide) alongside [CSS Modules](https://github.com/css-modules/css-modules):
- `Sass` is CSS with superpowers
- `CSS Modules` scopes CSS by automatically creating a unique **className**

`Sass` supports two syntaxes:
- `.scss`: Is an extension of CSS where every valid CSS is a valid **.scss** as well
- `.sass`: Is an older indented syntax not recommended for use in new **Sass** files

In this project we use the `.scss` syntax.

To express that a component depends on a **.scss module**, you should use the `[name].module.scss` convention:
```tsx
import styles from './index.module.scss';

function MyComponent() {
  return <div className={styles.myClass}>My Component</div>;
}
```

In development, expressing dependencies this way allows your styles to be reloaded on the fly as you edit them. In production, all `.scss` files will be concatenated into a single minified `.css` file in the build output.

To share variables between **Sass** files, you can use Sass's [@use](https://sass-lang.com/documentation/at-rules/use) rule. There is a `SASS_PATH` variable in the `.env` file that is used to locate `.scss` files. Supposing that `SASS_PATH='./src/styles'` and that you have `_colors.scss` in that directory, then you can use it like this:
```scss
@use 'colors';

.info {
  color: colors.$primary;
}
```

For information about how to structure a SASS codebase using the **7-1 Pattern** you can read this [article](https://remote.com/blog/how-to-structure-your-sass-project) or take a look to the following [boilerplate](https://github.com/KittyGiraudel/sass-boilerplate).

## Adding Images and Files
With webpack, using static assets like images and files works similarly to `SCSS`.

To reduce the number of requests to the server, importing images that are less than 10,000 bytes returns a data URI instead of a path. This applies to the following file extensions: bmp, gif, jpg, jpeg, and png. You can control the 10,000 byte threshold by setting the `IMAGE_INLINE_SIZE_LIMIT` environment variable as documented in the [advanced configuration](https://create-react-app.dev/docs/advanced-configuration).

```tsx
import logo from './logo.png';

function Header() {
  return <img src={logo} alt="Logo" />;
}
```

## Working Guidelines
- Create reusable components inside the `src/components` folder. Define each component in its own folder with the following structure:
  ```
  ├── 📂 src/components/MyComponent   Component name in PascalCase
      ├── 📜 index.module.cs          Component styles (optional)
      ├── 📜 index.test.tsx           Jest testing file
      └── 📜 index.tsx                Component definition
  ```
- Prefer [Function Components](https://www.robinwieruch.de/react-function-component) over **Class Components**, they offer almost the same: state and lifecycle methods, with the plus they are more lightway, have a sophisticated API and require less code. With the introduction of [React Hooks](https://reactjs.org/docs/hooks-intro.html) it's possible to write your entire application with just functions as React Components:
- In general use [Trailing Commas](https://blog.logrocket.com/best-practices-using-trailing-commas-javascript) (except on `JSON` files), many coding styles now recommend using them all the time because they make it easier to add new parameters to your functions or copy/paste properties in arrays and objects and also helps with producing cleaner diff output
- Add your own environment variables to the `.env-override/.env.local` file, this file should not be commited
- Before running or building this application always run linters and unit tests
