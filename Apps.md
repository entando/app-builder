Apps for the app builder are developed as standalone applications which should be able to run with `npm start` in standalone mode.

Each App will be deployed in npm using the `@entando` namespace and will export in their dist folder several items used by the app builder when integrating it

# Exports
several different items need to be exported by the App so that they can be consumed by the app builder.

Each paragraph reports in angle brackets the name of the object that the App itself need exporting

## ID <id>
the unique identifier for the app:

i.e. `cms`

## Routing

because of the current `@entando/router` it is not possible to simply export a route object and therefore we require two exports

### Routes <routes>
`routes` is an array with each item being an object with name and path.

```js
[
      { name: 'apps/cms/routename', path: '/apps/cms/my-route' },
]
```

`name` is a string containing the `apps/<id>/` prefix

`path` is an absolute URI with the `/apps/<id>/` prefix. The route itself in the `path` must be kebab case.

### Routes Switch <routesSwitch>
`routesSwitch` is a switch used to resolve the route with a given component.

It resembles in structure the switch in the app builder `app` component.

```js
switch (route) {
    case ROUTE_DASHBOARD: return <DashboardPage />;
    case ROUTE_PAGE_TREE: return <PageTreePageContainer />;
    case ROUTE_WIDGET_LIST: return <ListWidgetPageContainer />;
}
```

the case of the switch is matched against the route name.

## i18n <locales>

the locales object contains one object per locale with the translations:

```js
{
  it: {
    locale: 'en',
    messages: {
      'app.serverError': 'could not establish connection with {domain}',
    },
  },
}
```

## reducers <reducers>

the reducers object is a combined reducer that will be mounted on top of the root reducer of app-builder.
The reducers will be mounted inside the `apps.<id>` namespace and therefore when the App is running in standalone mode its route reducer should be created in the same fashion to ensure that the selectors work as intended.

## menu items <menu>

`menu` contains a `LinkMenuItem` used by the app builder to render the menu for the app integration

# Peer dependencies

when running in standalone mode the App makes use of both `@entando/messages` and `@entando/apimanager`, these two should be peer dependencies of the project. The project itself makes use of it as well in its dist files but it is a responsibility of the app builder to ensure their presence in the project.

# Installation process

After running `npm install` in the app builder the user can run the `npm app-install <appId>` command to install the app.

This command will trigger a download of the app from npm and the installation of its component within app builder.
After the installation process is complete it will be possible to either `npm start` or `npm build` app builder.
