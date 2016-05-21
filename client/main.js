Todos = new Mongo.Collection('todos');

// Subscribe data at client 
Meteor.subscribe('todos');

// Template Helpers
Template.main.helpers({
	todos: function () {
		return Todos.find({}, {sort:{createdAt: -1}});
	},

	notlogin: function() {
    	return !Meteor.userId();
  	}
});

// Template Events
Template.main.events({
	'submit .new-todo': function(event) {
		var text = event.target.text.value;
		// Insert Todos with insecure package

		// Todos.insert({
		// 	text: text,
		// 	createdAt: new Date(),
		// 	userId: Meteor.userId(),
		// 	username:Meteor.user().username
		// });

		// addTodo Method call when insecure package is remove
		Meteor.call('addTodo', text);

		// clear Form
		event.target.text.value= "";

		// Prevent Submit
		return false;
	},

	'click .toggle-checked':function() {
		//Todos.update(this._id, {$set:{checked: ! this.checked}})

		Meteor.call('setChecked', this._id, !this.checked);
	},

	'click .delete-todo': function () {
		//Todos.remove(this._id);

		Meteor.call('deleteTodo', this._id);
	}
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
});


