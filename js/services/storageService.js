angular.module('todomvc').factory('StorageService', function() {
  var TODO_ID = 'todomvc';

  var saveTodos = function(todos) {
    window.localStorage.setItem(TODO_ID, JSON.stringify(todos));
    return todos;
  };

  var loadTodos = function() {
    var todos = JSON.parse(window.localStorage.getItem(TODO_ID));
    return todos ? todos : [];
  };

  return {
    saveTodos: saveTodos,
    loadTodos: loadTodos
  }
});