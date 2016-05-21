import { Meteor } from 'meteor/meteor';


Todos = new Mongo.Collection('todos');

Meteor.startup(() => {
  // code to run on server at startup
});


// Add Publish when Auto Publish package removed
Meteor.publish('todos', function() {
	return Todos.find({userId:this.userId});
})


// Methods is used when insecure package removed.
Meteor.methods({
	addTodo:function(text) {
		if (!Meteor.userId()) {
			throw new Meteor.Error('not authorized');
		}
		Todos.insert({
			text: text,
			createdAt: new Date(),
			userId: Meteor.userId(),
			username:Meteor.user().username
		});
	},

	deleteTodo: function(todoId) {
		var todo = Todos.findOne(todoId);
		if (todo.userId!== Meteor.userId()) {
			throw new Meteor.Error('not authorized');
		}
		Todos.remove(todoId);
	},

	setChecked: function(todoId, setChecked) {
		var todo = Todos.findOne(todoId);
		if (todo.userId!== Meteor.userId()) {
			throw new Meteor.Error('not authorized');
		}
		Todos.update(todoId, {$set:{checked: setChecked}});
	}
});