	requirejs.config({
		app_name: "MyExampleApp", 
		paths : {
			'App': 'app/main',		
			'models': 'app/models',
			'views': 'app/views',
			'controllers': 'app/controllers',
	    	'templates': 'app/templates',
			/*libs*/
			'jquery': 'libs/jquery/1.10.2/jquery',
			'handlebars': 'libs/handlebars/1.1.2/handlebars',
			'ember': 'libs/ember/1.3.1/ember',
			'emberFacebook': 'libs/ember-facebook',
			/*requirejs-plugins*/
			'text': 'libs/requirejs-plugins/text',
			'hbs': 'libs/requirejs-plugins/hbs',
			'domReady': 'libs/requirejs-plugins/domReady',
			'order': 'libs/requirejs-plugins/order'
		},
		shim : {
			'ember' : {
				deps: ['handlebars', 'jquery']
			},
			'emberFacebook':{
				deps:['ember']
			},
			'App':{
				deps:['ember','emberFacebook']
			}
		},
		
		/*hbs plugin options*/
		hbs: {
			disableI18n: true,
			templateExtension: "html"
		}

});
require(['ember','emberFacebook'],function(){
	require(["App"], function(App){
		var app_name = "App";
		this[app_name] = App = Ember.Application.createWithMixins(App, Ember.Facebook);
		App.set('appId', '');
	});
})


