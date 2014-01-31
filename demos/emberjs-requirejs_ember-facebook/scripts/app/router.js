define(["App"], function(){
	var Router = Ember.Router.extend({
	  root: Ember.Route.extend({
	    index: Ember.Route.extend({
	      route: '/'
	    })
	  })
	});

	return Router;
});
