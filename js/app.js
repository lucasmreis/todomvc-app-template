angular.module('todomvc', [])
  .run(function(TodoStateService, StorageService) {
    TodoStateService.change('todos', StorageService.loadTodos());
    TodoStateService.listen('todos', StorageService.saveTodos);
  });
