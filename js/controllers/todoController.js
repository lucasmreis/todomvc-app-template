angular.module('todomvc').controller('TodoCtrl', function(TodoStateService, TodoService) {
  get = R.get;
  log = function(msg) { return function(x) { console.log(msg, x); return x; }; };

  var state = {};
  
  var form = {
    newTodo: ''
  };

  var changeState = TodoStateService.change('todos');
  TodoStateService.listen('todos', function(t) { state.todos = t; form.todos = R.clone(t); });

  var toggleCompleted = function(i, state) {
    return R.compose(
      changeState,
      TodoService.toggleCompleted(i),
      get('todos'))(state);
  };

  // SCOPE
  var self = this;

  self.state = state;
  self.form = form;
  self.toggleCompleted = toggleCompleted;
});