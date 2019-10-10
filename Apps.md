Apps for the app builder are developed as standalone applications which should be able to run with `npm start` in standalone mode.

Each App will be deployed in npm using the `@entando` namespace and will export in their dist folder several items used by the app builder when integrating it

# Babel and App configuration
The `package` json must contain the correct Babel and App configuration:

```js
  "files": [
    "dist",
    "!src",
    "!public",
    "!node_modules"
  ],
  "main": "dist/babel.js",
  "publishConfig": {
    "access": "public"
  },
```

```js
  "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ],
    "ignore": [
      "/**/__tests__"
    ],
    "plugins": [
      [
        "module-resolver",
        {
          "root": [
            "./src/"
          ]
        }
      ]
    ]
  },
```

# Exports
Each App will have a `babel.js` export file which will look like this:

```js
import menu from 'ui/common/LinkMenu';
import { cms as state } from 'state/rootReducer';
import { routes, routesDir } from 'ui/App';
import en from 'locales/en';
import it from 'locales/it';

const cms = {
  id: 'cms',
  menu,
  state,
  routes,
  routesDir,
  locales: {
    en,
    it,
  },
};

export default cms;
```

## id
its the App id.

## menu-
is a React component containing all the menu elements.

## state
is the combined reducer of the App

```js
export const cms = combineReducers({
  contentModel,
  contentType,
  editContent,
  categories,
  contentSettings,
});
```

## routesDir
is an object containing each route data

```js
export const routesDir = [
  {
    path: ROUTE_CMS,
    component: defaultRedirect,
  },
  {
    path: ROUTE_CMS_CONTENTMODEL_LIST,
    component: ContentModelListPage,
  },
  {
    path: ROUTE_CMS_CONTENTMODEL_ADD,
    component: AddContentModelPage,
  },
  {
    path: ROUTE_CMS_ADD_CONTENT,
    component: AddContentPage,
  },
];
```

## routes
are the actual React `<Route>` components of all the app routes.

## locales
its an object containing all the i18n locales of the app.

# dependencies
Only actual dependencies that are not already included in `app-builder` can be added as pure dependencies.
Every other dependency must be either a `devDependency` or `peerDependency`.

# Installation process

After running `npm install` in the app builder the user can run the `npm run app-install <appId>` command to install the app.

This command will trigger a download of the app from npm and the installation of its component within app builder.
After the installation process is complete it will be possible to either `npm start` or `npm build` app builder.
