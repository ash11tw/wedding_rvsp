// View.js
// -------
define(["jquery", "backbone", "jquery.validate","models/Model",
	"json!data/info.json", 
	"text!templates/mobile_main.html","text!templates/mobile_content.html","text!templates/success.html","text!templates/our_story.html"],

    function($, Backbone, validate, Model, info, mainTmpl,formTmpl,successTmpl,storyTmpl){

	var SubView = Backbone.View.extend({
            render: function() {

                this.template = _.template(formTmpl, {})

                this.$el.html(this.template)
		this.$el.find('form').validate({
			rules:{
				name:{
					required:true,
					minlength:2
				},
				email:{
					email:true
				}
			},
			highlight: function(element) {
    				$(element).closest('.control-group').addClass('error')
  			},
  			success: function(element) {
    				$(element).closest('.control-group').removeClass('error')
  			}
		})		

                return this

            }
	})
	var SuView = Backbone.View.extend({
            	render: function() {

                	this.template = _.template(successTmpl, {})

                	this.$el.html(this.template)
		}
	})

	var StoryView = Backbone.View.extend({
            	render: function() {

                	this.template = _.template(storyTmpl, {})

                	this.$el.html(this.template)
		}
	})
        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "#content",

            // View constructor
            initialize: function() {

                // Calls the view's render method
                this.render()
            },

            // View Event Handlers
            events: {
		"submit":"submit"

            },

            // Renders the view's template to the UI
            render: function() {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(mainTmpl,info)

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template)
		var carousel = this.$el.find('.carousel')
		carousel.carousel()
		carousel.swiperight(function() {  
      			carousel.carousel('prev')
    		})  
   		carousel.swipeleft(function() {  
      			carousel.carousel('next')
   		})  
		var sub = new SubView()
		sub.setElement(this.$el.find('#confirm-form')).render()
		this.$el.find('#tabs a:first').tab('show')
		var story = new StoryView()
		story.setElement(this.$el.find('#story')).render()
                // Maintains chainability
                return this

            }
	    , submit:function(e){
		var me = this,arr, data, model
		e.preventDefault()
		arr = $('form').serializeArray()
		data = _(arr).reduce(function(acc, field) {
      			acc[field.name] = field.value
      			return acc
    		}, {})
		model = new Model(data)
		model.save(null,{success:function(){
			var successView = new SuView()
			successView.setElement(me.$el.find('#confirm-form')).render()
		}})
	    }

        })

        // Returns the View class
        return View

    }

)
