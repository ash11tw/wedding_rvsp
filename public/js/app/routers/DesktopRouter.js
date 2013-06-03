// DesktopRouter.js
// ----------------
define(["jquery", "backbone", "jquery.caroul","views/View", "views/Admin"],
        
    function($, Backbone, Caroul, View, Admin) {

        var DesktopRouter = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start()

            },

            // All of your Backbone Routes (add more)
            routes: {
                
                // When there is no hash on the url, the home method is called
                "": "index",
		"admin":"admin"

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                new View()

            }, 
	    admin:function(){
		new Admin()
	    }
    
        })

        // Returns the DesktopRouter class
        return DesktopRouter

    }

)
