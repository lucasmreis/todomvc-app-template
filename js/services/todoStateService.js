angular.module('todomvc').factory('TodoStateService', function(StateService) {

  var state = {
    todos: [
      {title: 'oi!', completed: false},
      {title: 'oi! 2', completed: true},
      {title: 'oi! 3', completed: true},
      {title: 'oi! 4', completed: false}]
  };

  var listeners = [];

  var get    = StateService.get(state);
  var change = StateService.change(state, listeners);
  var listen = StateService.listen(state, listeners);

  return {
    get: get,
    change: change,
    listen: listen
  };
});