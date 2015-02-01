angular.module('todomvc').factory('TodoService', function() {
  var newId = R.compose( // [todo] => unique id
    R.add(1),
    R.max,
    R.keys);

  var getId = R.compose(
    String,
    R.get('id'));

  var assocTo = R.curry(function(prop, obj, v) {
    return R.assoc(prop, v, obj);
  });

  var addTodo = function(todo, todos) {
    return R.compose(
      assocTo(newId(todos), todos),
      R.assoc('id', newId(todos)),
      R.assoc('completed', false))(todo);
  };

  var removeTodo = function(todo, todos) {
    var id = [getId(todo)];
    return R.omit(id)(todos);
  };

  var toggleCompleted = function(todo, todos) {
    return R.compose(
      assocTo(getId(todo), todos),
      R.assoc('completed', !todo.completed))(todo);
  };

  var renameTodo = function(todo, todos) {
    return R.compose(
      assocTo(getId(todo), todos),
      R.assoc('title', todo.title))(todo);
  };

  var getCompletedIds = R.compose(
    R.map(getId),
    R.filter(R.get('completed')),
    R.values);

  var clearCompleted = function(todos) {
    return R.omit(getCompletedIds(todos))(todos);
  };

  return {
    addTodo: addTodo,
    removeTodo: removeTodo,
    toggleCompleted: toggleCompleted,
    renameTodo: renameTodo,
    clearCompleted: clearCompleted
  };
});
