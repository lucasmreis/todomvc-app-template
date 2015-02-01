describe('TodoService', function() {
  var service;

  beforeEach(module('todomvc'));

  beforeEach(inject(function(_TodoService_) {
    service = _TodoService_;
  }));

  var logObj = function(x) { console.log(JSON.stringify(x, null, '  ')); };

  it('should add new todo to a collection', function() {
    var newTodo = {title: 'new'};

    var todos = { '1': {id: 1, title: 'old', completed: true}};

    var expected = {
      '1': {id: 1, title: 'old', completed: true},
      '2': {id: 2, title: 'new', completed: false}};

    expect(service.addTodo(newTodo, todos)).to.deep.equal(expected);
  });

  it('should remove todo from a collection', function() {
    var todo = {id: 2, title: 'something', completed: false};

    var todos = {
      '1': {id: 1, title: 'something', completed: true},
      '8': {id: 8, title: 'something', completed: false},
      '2': {id: 2, title: 'something', completed: false},
      '3': {id: 3, title: 'something', completed: true}};

    var expected = {
      '1': {id: 1, title: 'something', completed: true},
      '8': {id: 8, title: 'something', completed: false},
      '3': {id: 3, title: 'something', completed: true}};

    expect(service.removeTodo(todo, todos)).to.deep.equal(expected);
  });

  it('should mark todo as completed', function() {
    var todo = {id: 2, title: 'something', completed: false};

    var todos = {
      '1': {id: 1, title: 'something', completed: false},
      '8': {id: 8, title: 'something', completed: false},
      '2': {id: 2, title: 'something', completed: false},
      '3': {id: 3, title: 'something', completed: false}};

    var expected = {
      '1': {id: 1, title: 'something', completed: false},
      '8': {id: 8, title: 'something', completed: false},
      '2': {id: 2, title: 'something', completed: true},
      '3': {id: 3, title: 'something', completed: false}};

    expect(service.toggleCompleted(todo, todos)).to.deep.equal(expected);
  });

  it('should rename todo', function() {
    var todo = {id: 2, title: 'new something', completed: false};

    var todos = {
      '1': {id: 1, title: 'something', completed: false},
      '8': {id: 8, title: 'something', completed: false},
      '2': {id: 2, title: 'something', completed: false},
      '3': {id: 3, title: 'something', completed: false}};

    var expected = {
      '1': {id: 1, title: 'something', completed: false},
      '8': {id: 8, title: 'something', completed: false},
      '2': {id: 2, title: 'new something', completed: false},
      '3': {id: 3, title: 'something', completed: false}};

    expect(service.renameTodo(todo, todos)).to.deep.equal(expected);
  });

  it('should clear completed', function() {
    var todos = {
      '1': {id: 1, title: 'something', completed: false},
      '8': {id: 8, title: 'something', completed: true},
      '2': {id: 2, title: 'something', completed: false},
      '3': {id: 3, title: 'something', completed: true}};

    var expected = {
      '1': {id: 1, title: 'something', completed: false},
      '2': {id: 2, title: 'something', completed: false}};

    expect(service.clearCompleted(todos)).to.deep.equal(expected);
  });
});