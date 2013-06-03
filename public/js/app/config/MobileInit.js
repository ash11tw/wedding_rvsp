// MobileInit.js
// -------------
require.config({

  // Sets the js folder as the base directory for all future relative paths
  baseUrl: "./js",

  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths: {

      // Core Libraries
      // --------------
      "jquery": "libs/jquery",

      "jquerymobile": "libs/jquery.mobile",

      "underscore": "libs/lodash",

      "backbone": "libs/backbone",

      // Plugins
      // -------
      "bootstrap": "libs/plugins/bootstrap",
     
      "jquery.validate":"libs/plugins/jquery.validate",

      "text": "libs/plugins/text",
      "json": "libs/plugins/json",

      // Application Folders
      // -------------------
      "collections": "app/collections",

      "models": "app/models",

      "routers": "app/routers",

      "templates": "app/templates",

      "views": "app/views",
      
      "data": "app/data"

  },

  // Sets the dependency and shim configurations
  // - Helpful for including non-AMD compatible scripts and managing dependencies
  shim: {
      
      // Twitter Bootstrap jQuery plugins
      "bootstrap": ["jquery"],

      // jQuery Mobile
      "jquerymobile": ["jquery"],
      "jquery.validate":["jquery"],
      // Backbone
      "backbone": {

        // Depends on underscore/lodash and jQuery
        "deps": ["underscore", "jquery"],

        // Exports the global window.Backbone object
        "exports": "Backbone"

      }

  }

});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["jquery", "backbone", "routers/MobileRouter", "jquerymobile", "bootstrap"],

  function($, Backbone, MobileRouter) {

    // Prevents all anchor click handling
    $.mobile.linkBindingEnabled = false;

    // Disabling this will prevent jQuery Mobile from handling hash changes
    $.mobile.hashListeningEnabled = false;
    // Instantiates a new Mobile Router instance
    new MobileRouter();

  }

);
