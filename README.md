

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
a string representing the domain name of the Entando Core instance. The protocol is optional and it is possible to specify a subdirectory of the domain.
Trailing slashes are not valid and it only vaildates up to 3rd level domains.

All the following would be valid values:

- http://my.entando.com
- https://my.entando.com
- //my.entando.com
- //my.entando.com/entando-sample

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

## API Requests
Api requests are being done using any of the `apiManager` available methods:

- `makeRequest` automatically checks the current configuration and either makes a real or mock request depending on the value of the `USE_MOCKS` environmental variable. This should be the method always being used.
- `makeRealRequest` makes the request always againsts the API
- `makeMockRequest` makes the request always against the mock. This method should only be used when the corresponding API has not been developed yet.

Each method accepts the same arguments: a `request` object and a `page` object.

the `apiManager` also exports a `METHODS` constant containing all the available verbs.

### Request Object

The request object has the following properties:

```js
{
  uri: '/api/myApi',
  method: METHODS.POST,
  mockResponse: BODY_OK,
  contentType: 'application/x-www-form-urlencoded',
  body: {
    username: 'admin',
    password: 'admin',
  },
  errors: () => getErrors(username, password),
  useAuthentication: true,
}
```

#### uri
is the relative uri of the API.
The `apiManager` will append this to the `DOMAIN` set in the environmental variables.
query strings shoud be part of the uri.

#### method
only values contained in the `apiManager.METHODS` constant are valid.

#### mockResponse
the string used when a mock request is being made.
This body should only return the content of the expected payload.
If an array is being returned the `responseFactory` will automatically generate a paginated response based on the `page` object.

#### contentType [optional]
the default value is `application/json` but it can be overwritten.

#### body [optiona]
this object is only being submitted as part of the request if it is either a POST or a PUT.

#### errors [optional]
this callback is returning an array of error messages.
When a mock request is being made this callback is being called and an error will be returned if this function returns anything but an empty array.

#### useAuthentication [optional]
if the value of this property is set as true the `apiManager` will append the token to the request headers.

If no token can be found on the system an automatic redirect will be fired and a promise containing only an `ok` and `status` property will be returned.

### Page Object
the page object is only used when pagination is needed and only has two parameters:

```js
{
  page: 1,
  pageSize: 10,
}
```

#### page
the current page requested.

#### pageSize
the maximum number of items that each page should contain.

## Testing

when testing methods in the `api/<className>` files the test should only check that the `makeRequest` or `makeMockRequest` methods are being called with the correct objects.

when testing methods in the `state/<state>/actions` files the test should only check that the optional dispatches/redirects are being called based on the mocked response of `api/<className>`

There is no reason to unmock the api call when testing the action or to unmock the apiManager: the `apiManager` itself and the `responseFactory` are fully tested on their own.

---

## Plugins

[Entando plugins docs](entando-plugins-config/README.md)
