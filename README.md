

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of Create React App [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

---
## Configuration

The application uses `.env` files to set up some environment variables.

Dev instances should be using the `.env.development.local` file while production instances use `.env.production`

### Configurable properties

#### `USE_MOCKS` (boolean, default: `true`)
a boolean used to determine whether the API calls will be against a real Entando Core or if they are just being mocked internally.

#### `DOMAIN` (string, default: `null`)
a string representing the domain name of the Entando Core instance. The protocol is optional.

All the following would be valid values:

- http://my.entando.com
- https://my.entando.com
- //my.entando.com

### Sample .env file

```
USE_MOCKS=false
DOMAIN=//my.entando.com
```
---

## Commands

### Clone and set up:

- Make sure to have `git`, `npm` + `node` installed and up to date.
- Clone the repo: `git clone https://github.com/entando/frontend-common-components.git`
- `cd frontend-common-components.git`
- `npm install`: installs npm dependencies


### Deploy:

- `npm run lint`: runs the linter. It fails if linting rules are not matched.
- `npm run coverage`: runs unit tests. It fails if an unit test fails, or if the minimum coverage threshold is not met.
- `npm run import-plugins`: compiles and imports Entando plugins.
- `npm run build`: compiles the project and creates the `build` directory.
- `npm run build-full`: runs `npm run lint`, `npm run coverage`, `npm run import-plugins` and `npm run build`


### Develop

- `npm start`: starts the application in dev mode (local web server)

---

## Styles

This app uses SASS to manage stylesheets.

[SASS docs](http://sass-lang.com/guide)

The style files are located in the `src/sass` directory, with the following structure:
```
sass
├── app
|   ├── _App.scss       // SASS file for the App component
|   └── _TopNavbar.scss // SASS file for the TopNavbar component
├── index.scss          // file containing all the SASS imports
└── index.css           // output CSS file
```
The `.scss` file names are prefixed with `_` in order to avoid the SASS compiler to generate their own output CSS file. All the output CSS should be included in `sass/index.scss`.

The `app` directory is a _domain_ directory. Domain directories are used to organize files into relevant categories (e.g. there could be also an `users` domain directory, containing all the style files of components related to users).

Each Component should have its own `.scss` file, and domain directories should reflect those used in the `src/ui` directory.

---

## Internationalization (I18n)

This app uses `react-intl` for internationalization.

[react-intl docs](https://github.com/yahoo/react-intl/wiki).

Translation files are `.js` files placed under `src/locales` directory, one for each supported language. The files are named after their language [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) code, e.g.

```
src
└── locales
    ├── en.js
    └── it.js
```

---

## Plugins

[Entando plugins docs](entando-plugins-config/README.md)
