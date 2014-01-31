(function(root){
	require(["config"], function(config){
		requirejs.config(config);
		require(["App"], function(App){
			var app_name = config.app_name || "App";
			root[app_name] = App = Ember.Application.createWithMixins(App, Em.Facebook);
			[app_name].set('appId', '591709020896302');
			Em.FacebookView = Ember.View.extend({
			  defaultTemplate: 'application'
			});
		});
	});
})(this);

