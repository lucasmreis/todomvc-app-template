angular.module('todomvc').factory('TodoService', function() {  
  // var state = {
  //   nowShowing :: enum
  //   todos: [{
  //     id :: string (KEY)
  //     title :: string
  //     completed :: boolean
  //   }]
  // }

  var newId = R.compose( // [todo] => unique id
    R.add(1),
    R.max,
    R.pluck('id'));

  var addTodo = function(todo, todos) {
    return R.compose(
      R.appendTo(todos),
      R.compose(
        R.assoc('id', newId(todos)),
        R.assoc('completed', false)))(todo);
  };


  return {
    addTodo: addTodo
  };
});
