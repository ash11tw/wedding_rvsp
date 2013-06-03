// Admin.js
// -------
define(["jquery", "backbone", "collections/Collection","text!templates/admin.html"],

    function($, Backbone, Collection, templ){


        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "#content",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render()

            },

            // Renders the view's template to the UI
            render: function() {
		var col = new Collection(),me = this
		col.fetch({success:function(data){
			me.template = _.template(templ, {collection:data.toJSON()})
			me.$el.html(me.template)
		}})
                return this

            }

        })

        // Returns the View class
        return View

    }

)
