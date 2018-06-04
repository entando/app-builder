# Entando plugins

Entando plugins are imported into the main application with the command ```npm run import-plugins```

## Importing plugins

1. Set up the ```entando-plugins-config/plugins.json```.  E.g. importing a plugin called "entando-plugin-sample" would look like this:
    ```
        [
          {
            "name": "entando-plugin-sample",
            "path": "../entando-plugins/entando-plugin-sample"
          }
        ]
    ```
2. Run ```npm run import-plugins```. This will start the import process for each plugin defined in ```plugins.json```


## About the import process

The command ```npm run import-plugins``` does the following:

1. **Compiles** each plugin running ```npm run build-plugin``` in its path
2. **Validates** each plugin checkong the plugins compilation output
3. **Imports public assets** for each plugin, copying its ```pluginBuild/plugin-assets/PLUGIN_NAME``` directory into the main project ```public/plugin-assets/PLUGIN_NAME```
4. **Creates symbolic links** to the plugin directories into the main project ```node_modules``` directory, to guarantee the plugin modules name resolution
5. **Generates the imports file** ```src/entando-plugins.js```, which imports each plugin compiled CSS and JS, and exports an array of the compiled plugins, in the same order defined in ```entando-plugins-config/plugins.json```


## Creating plugins

The easiest way to create a new plugin is following the instructions at [https://github.com/entando/ui-component-sample](https://github.com/entando/ui-component-sample)
