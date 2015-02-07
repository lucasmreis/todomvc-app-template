angular.module('todomvc').controller('TodoCtrl', function(TodoStateService, TodoService) {
  var get = R.get;
  var compose = R.compose;
  var ifElse = R.ifElse;
  var always = R.always;
  var eq = R.eq;
  log = function(msg) { return function(x) { console.log(msg, x); return x; }; };

  var state = {};
  
  var form = {
    allCompleted: false,
    newTodo: ''
  };

  var changeState = TodoStateService.change('todos');

  TodoStateService.listen('todos', function(t) { 
    state.todos = t; 
    form.todos = R.clone(t);
    form.allCompleted = TodoService.areAllCompleted(t); });

  var hasTodos = compose(
    R.lt(0),
    get('length'),
    get('todos'));

  var toggleCompleted = function(i, state) {
    return compose(
      changeState,
      TodoService.toggleCompleted(i),
      get('todos'))(state);
  };

  var removeTodo = function(i, state) {
    return compose(
      changeState,
      TodoService.removeTodo(i),
      get('todos'))(state);
  };

  var clearNewTodo = function() { form.newTodo = ''; };

  var addTodo = function(evt, form, state) {
    return evt.which !== 13 ? null :
      compose(
        clearNewTodo,
        changeState,
        TodoService.addTodo(form.newTodo),
        get('todos'))(state);
  };

  var itemsLeft = compose(
    TodoService.itemsLeft,
    get('todos'));

  var clearCompleted = compose(
    changeState,
    TodoService.clearCompleted,
    get('todos'));

  var toggleAllCompleted = compose(
    changeState,
    TodoService.toggleAllCompleted,
    get('todos'));

  var makePhrase = compose(
    ifElse(
      eq(1),
        always(' item left'),
        always(' items left')),
    itemsLeft);

  // SCOPE
  var self = this;

  self.state = state;
  self.form = form;
  self.hasTodos = hasTodos;
  self.toggleCompleted = toggleCompleted;
  self.removeTodo = removeTodo;
  self.addTodo = addTodo;
  self.itemsLeft = itemsLeft;
  self.clearCompleted = clearCompleted;
  self.toggleAllCompleted = toggleAllCompleted;
  self.makePhrase = makePhrase;
});