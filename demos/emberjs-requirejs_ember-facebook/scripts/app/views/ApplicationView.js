define([
	"text!templates/applicationTemplate.html"
], function(applicationTemplate) {

	var ApplicationView = Ember.View.extend({
		defaultTemplate: Ember.Handlebars.compile(applicationTemplate)
	});
	return ApplicationView;
});