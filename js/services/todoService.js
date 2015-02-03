angular.module('todomvc').factory('TodoService', function() {
  curry = R.curry;

  var addTodo = function(title, todos) {
    return R.append({ title: title, completed: false})(todos);
  };

  var removeTodo = function(i, todos) {
    return R.remove(i, 1)(todos);
  };

  var updateTodo = function(i, todo) {
    return R.mapIndexed(function(elt, idx, list) {
      return idx === i ? todo : elt;
    });
  };

  var toggleCompleted = curry(function(i, todos) {
    var newTodo = {title: todos[i].title, completed: !todos[i].completed};
    return updateTodo(i, newTodo)(todos);
  });

  var renameTodo = function(i, newTitle, todos) {
    var newTodo = {title: newTitle, completed: todos[i].completed};
    return updateTodo(i, newTodo)(todos);
  };

  var isNotCompleted = R.compose( // todo => boolean
    function(x) { return !x; },
    R.get('completed'));

  var clearCompleted = function(todos) {
    return R.filter(isNotCompleted)(todos);
  };

  var itemsLeft = R.compose( // [todo] => int
    R.get('length'),
    R.filter(isNotCompleted));

  var hasCompletedTodos = R.compose( // [todo] => boolean
    R.lt(0),
    R.get('length'),
    R.filter(R.get('completed')));

  var areAllCompleted = R.compose(
    R.eq(0),
    R.get('length'),
    R.filter(isNotCompleted));

  return {
    addTodo: addTodo,
    removeTodo: removeTodo,
    toggleCompleted: toggleCompleted,
    renameTodo: renameTodo,
    clearCompleted: clearCompleted,
    itemsLeft: itemsLeft,
    hasCompletedTodos: hasCompletedTodos,
    areAllCompleted: areAllCompleted
  };
});
