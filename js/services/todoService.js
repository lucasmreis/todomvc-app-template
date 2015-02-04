angular.module('todomvc').factory('TodoService', function() {
  var curry = R.curry;
  var get = R.get;
  var filter = R.filter;
  var compose = R.compose;
  var appendTo = R.appendTo;
  var trim = R.trim;
  var ifElse = R.ifElse;
  var assoc = R.assoc;
  var map = R.map;

  var addTodo = curry(function(title, todos) {
    var isFalsy = function(x) { return R.isNil(x) || x === '' };

    var maybe = curry(function(fn, x) {
      return isFalsy(x) ? x : fn(x);
    });

    var orElse = curry(function(value, x) {
      return isFalsy(x) ? value : x;
    });

    var createTodo = function(t) { return { title: t, completed: false}; };

    return compose(
      orElse(todos),
      maybe(appendTo(todos)),
      maybe(createTodo),
      trim)(title);
  });

  var removeTodo = curry(function(i, todos) {
    return R.remove(i, 1)(todos);
  });

  var updateTodo = function(i, todo) {
    return R.mapIndexed(function(elt, idx, list) {
      return idx === i ? todo : elt;
    });
  };

  var toggleCompleted = curry(function(i, todos) {
    var newTodo = {title: todos[i].title, completed: !todos[i].completed};
    return updateTodo(i, newTodo)(todos);
  });

  var renameTodo = curry(function(i, newTitle, todos) {
    var newTodo = {title: newTitle, completed: todos[i].completed};
    return updateTodo(i, newTodo)(todos);
  });

  var isNotCompleted = compose( // todo => boolean
    function(x) { return !x; },
    get('completed'));

  var clearCompleted = function(todos) {
    return filter(isNotCompleted)(todos);
  };

  var itemsLeft = compose( // [todo] => int
    get('length'),
    filter(isNotCompleted));

  var hasCompletedTodos = compose( // [todo] => boolean
    R.lt(0),
    get('length'),
    filter(get('completed')));

  var areAllCompleted = compose(
    R.eq(0),
    get('length'),
    filter(isNotCompleted));

  var makeNotCompleted = assoc('completed', false);
  var makeCompleted    = assoc('completed', true);

  var toggleAllCompleted = ifElse(
    areAllCompleted,
      map(makeNotCompleted),
      map(makeCompleted));

  return {
    addTodo: addTodo,
    removeTodo: removeTodo,
    toggleCompleted: toggleCompleted,
    renameTodo: renameTodo,
    clearCompleted: clearCompleted,
    itemsLeft: itemsLeft,
    hasCompletedTodos: hasCompletedTodos,
    areAllCompleted: areAllCompleted,
    toggleAllCompleted: toggleAllCompleted
  };
});
