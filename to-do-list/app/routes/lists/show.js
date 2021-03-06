import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('list', params.list_id);
  },

  renderTemplate: function() {
    this.render('lists/show', {controller: 'lists/show'} );

    this.render('todos', {
      into: 'lists/show',
      outlet: 'todos',
    });
  },

  actions: {
    deleteList: function() {
      var list = this.modelFor(this.routeName);
      list.destroyRecord();

      this.transitionTo('lists');
    },

    updateTitle: function() {
      var model = this.modelFor(this.routeName);

      if (Ember.isBlank(model.get('title'))) {
        model.rollback();
      }
      else {
        model.save();
      }
    },

    createTodo: function() {
      var newTodoTitle = this.controllerFor(this.routeName).get('newTodoTitle');

      if (Ember.isBlank(newTodoTitle)) { return false; }

      var list = this.modelFor(this.routeName);

      var todo = this.store.createRecord('todo', {
        title: newTodoTitle,
        list: list
      });

      this.controllerFor(this.routeName).set('newTodoTitle', '');

      todo.save().then(function(todo) {
        list.get('todos').addObject(todo);
        list.save();
      });
    },
    deleteTodo: function(id) {
      var list = this.modelFor(this.routeName);

      this.store.find('todo', id).then(function(todo) {
        list.get('todos').removeObject(todo);
        list.save();

        todo.destroyRecord();
      });
    }
  }
});
