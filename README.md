# Pokedex

This project lists Pokemon and allows you to explore details about each creature. You can also create your own Pokemon and select your favorite ones.

## Process and decisions
First steps after reading the requirements and the scope of the task:
- Explore other Pokedex websites, analyze project structure, strengths, weaknesses and areas for improvement
- Prepared high-level concept for key pages and features
- Read the PokeApi documentation and explore the schema, endpoins and contracts
- Decide on the packages and tools, consider pros & cons around implementational details features
- General way of work was to aproach the project as an evolutionary MVP, get things done as fast and as possible and iteratively improve the qualitiy for each feature/page

### Tools
#### ReactQuery

#### Redux Toolkit
#### D3 for evolution tree generation

### Known issues and further development
The id generation does not check for id collision with other custom and api pokemon ids
ID generation is not sequential and with existing implementation it's hard to predict
previous/next values. In real world scenarios backend should orchestrate prev/next.

### TODOs and further improvements:
- add search, filtering and sorting to Pokemon lists
- remove inline styles and improve on sharing similar styles
- add error boundaries to critical components, improve error handling and error states
- add unit tests and improve on test coverage
- use aliases instead of relative paths in imports 
- add precommit and integrate linting and test suite as part of the CI/CD pipeline  

## Running & Debugging the application for the first time
1. Clone repo:
   - `git clone git@github.com:MomchilJambazov/pokedex.git`
2. Install project dependencies:
   - `cd pokedex`
   - `npm run install`
3. Start the application:
   - `npm run start`

## Available Scripts

| Command           | Description                                      | Evironment File  |
| :---------------- | :----------------------------------------------- | :--------------- |
| `npm run init`    | Installs project dependencies for the first time | N/A              |
| `npm run lint`    | Analyses **JavaSript**/**TypeScript** code       | N/A              |
| `npm run lint:f`  | Try to fix **JavaSript**/**TypeScript** errors   | N/A              |
| `npm run slint`   | Analyses **CSS**/**SCSS** styles                 | N/A              |
| `npm run slint:f` | Try to fix **CSS**/**SCSS** errors               | N/A              |
| `npm test`        | Executes Unit Tests outputting to `out/coverage` | .env.test        |
| `npm start`       | Runs the App in http://localhost:3000            | .env.local       |
| `npm run build:l` | Builds the App to `out/build/local`              | .env.local       |
| `npm run build:d` | Builds the App to `out/build/development`        | .env.development |
| `npm run build`   | Builds the App to `out/build/production`         | .env.production  |

## Supported Language Features

This project supports a superset of the latest `JavaScript`/`TypeScript` standard. In addition to [ES6](http://es6-features.org) syntax features, it also supports:

- [Exponentiation Operator](https://github.com/tc39/proposal-exponentiation-operator) (ES2016)
- [Async/await](https://github.com/tc39/proposal-async-await) (ES2017)
- [Object Rest/Spread Properties](https://github.com/tc39/proposal-object-rest-spread) (ES2018)
- [Dynamic import()](https://github.com/tc39/proposal-dynamic-import) (stage 4 proposal)
- [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (part of stage 3 proposal)
- [TSX](https://www.typescriptlang.org/docs/handbook/jsx.html) and [TypeScript](https://www.typescriptlang.org)

Constant enums and namespaces are not supported, you can learn about the constraints of using [Babel with TypeScript here](https://babeljs.io/docs/en/babel-plugin-transform-modules-amd).

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
