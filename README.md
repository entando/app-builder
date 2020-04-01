

This project was bootstrapped with [Create React App](https://create-react-app.dev/).

---
## Configuration

The application uses `.env` files to set up some environment variables.

Dev instances should be using the `.env.development.local` file while production instances use `.env.production`

### Configurable properties

#### `USE_MOCKS` (boolean, default: `true`)
a boolean used to determine whether the API calls will be against a real Entando Core or if they are just being mocked internally.

#### `DOMAIN` (string, default: `null`)
a string representing the domain name of the Entando Core instance. The protocol is optional and it is possible to specify a subdirectory of the domain.
Trailing slashes are valid (but will automatically be removed) and it only validates up to 3rd level domains.

All the following would be valid values:

- http://my.entando.com
- https://my.entando.com
- //my.entando.com
- //my.entando.com/entando-sample

#### `CLIENT_ID` (string, default `client_id`)
string used for the client id during the OAUTH2 authentication process.

#### `CLIENT_SECRET` (string, default `client_secret`)
string used for the client secret during the OAUTH2 authentication process.

#### `DIGITAL_EXCHANGE_UI_ENABLED` (boolean, default: `false`)
a boolean used to determine whether the Component Repository (former Digital Exchange) should be enabled or not.

#### `KEYCLOAK_ENABLED` (boolean, default: `false`)
a boolean that enables authentication through [Keycloak](https://www.keycloak.org/). Won't be used if `USE_MOCKS` is set to true.

#### `KEYCLOAK_JSON` (string, default: `/keycloak.json`)
a string containing the path for Keycloak JSON configuration reading endpoint.
This is a sample response:
```
{
   "realm":"entando",
   "auth-server-url":"http://my.entando.com/auth",
   "ssl-required":"external",
   "resource":"entando-web",
   "public-client":true
}
```
`KEYCLOAK_JSON` won't be used if `KEYCLOAK_ENABLED` is set to `false`.

`KEYCLOAK_JSON` will be appended to `DOMAIN` as default if `DOMAIN` is set.

That means, for instance, if `DOMAIN`=https://my.entando.com, `KEYCLOAK_ENABLED`=true and no `KEYCLOAK_JSON` set, then `KEYCLOAK_JSON` will fallback to `https://my.entando.com/keycloak.json`).

For further information about Keycloak installation and configuration, see the [official Keycloak website](https://www.keycloak.org/archive/documentation-7.0.html).

Current Keycloak supported version is **7.0.1**.

### Sample .env file

```
USE_MOCKS=false
DOMAIN=//my.entando.com
```
---

## Commands

### Clone and set up:

- Make sure to have `git`, `npm` + `node` installed and up to date.
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

## API Requests
Api requests are being done using `@entando/apimanager`.
For more information checkout the documentation on NPM.

---

## Apps

For information on the `app-builder` apps [check its readme](./Apps.md)

## Legacy Plugins

The easiest way to create an `app-builder` plugin is using our [sample plugin repo](https://github.com/entando/ui-component-sample).
There are all the information on how to get started, and about plugin requirements.

Here are some more information on [plugins and how they work](entando-plugins-config/README.md)
