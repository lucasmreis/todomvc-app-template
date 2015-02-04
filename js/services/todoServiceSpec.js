describe('TodoService', function() {
  var service;

  beforeEach(module('todomvc'));
  beforeEach(inject(function(TodoService) {
    service = TodoService;
  }));

  var logObj = function(x) { console.log(JSON.stringify(x, null, '  ')); };
  var makeTodo = function(c) {
      return {title: 'something', completed: c};
    };

  it('should add new todo to a collection', function() {
    var newTodo = 'new';

    var todos = [{title: 'old', completed: true}];

    var expected = [
      {title: 'old', completed: true},
      {title: 'new', completed: false}];

    expect(service.addTodo(newTodo, todos)).to.deep.equal(expected);
    expect(service.addTodo('', todos)).to.deep.equal(todos);
    expect(service.addTodo('     ', todos)).to.deep.equal(todos);

  });

  it('should remove todo from a collection', function() {
    var todos = [
      {title: 'something0', completed: true},
      {title: 'something1', completed: false},
      {title: 'something2', completed: false},
      {title: 'something3', completed: true}];

    var expected = [
      {title: 'something0', completed: true},
      {title: 'something1', completed: false},
      {title: 'something3', completed: true}];

    expect(service.removeTodo(2, todos)).to.deep.equal(expected);
  });

  it('should mark todo as completed', function() {
    var todos = [
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'something', completed: false}];

    var expected = [
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'something', completed: true},
      {title: 'something', completed: false}];

    expect(service.toggleCompleted(2, todos)).to.deep.equal(expected);
  });

  it('should rename todo', function() {
    var newTitle = 'new something';

    var todos = [
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'something', completed: false}];

    var expected = [
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'new something', completed: false},
      {title: 'something', completed: false}];

    expect(service.renameTodo(2, newTitle, todos)).to.deep.equal(expected);
  });

  it('should clear completed', function() {
    var todos = [
      {title: 'something0', completed: false},
      {title: 'something1', completed: true},
      {title: 'something2', completed: false},
      {title: 'something3', completed: true}];

    var expected = [
      {title: 'something0', completed: false},
      {title: 'something2', completed: false}];

    expect(service.clearCompleted(todos)).to.deep.equal(expected);
  });

  it('should count items not completed', function() {
    var todos0a = [];
    var todos0b = [true, true];
    var todos1 = [true, true, false];
    var todos2 = [false, false];
    var todos3 = [false, false, true, true, false];

    expect(service.itemsLeft(R.map(makeTodo)(todos0a))).to.equal(0);
    expect(service.itemsLeft(R.map(makeTodo)(todos0b))).to.equal(0);
    expect(service.itemsLeft(R.map(makeTodo)(todos1))).to.equal(1);
    expect(service.itemsLeft(R.map(makeTodo)(todos2))).to.equal(2);
    expect(service.itemsLeft(R.map(makeTodo)(todos3))).to.equal(3);
  });

  it('should be true if all todos are completed', function() {
    var todos0 = [];
    var todos1 = [false, false];
    var todos2 = [true, true, true];
    var todos3 = [true, true, true, true, true];

    console.log(service.areAllCompleted([]));

    expect(service.areAllCompleted(R.map(makeTodo)(todos0))).to.be.true;
    expect(service.areAllCompleted(R.map(makeTodo)(todos1))).to.be.false;
    expect(service.areAllCompleted(R.map(makeTodo)(todos2))).to.be.true;
    expect(service.areAllCompleted(R.map(makeTodo)(todos3))).to.be.true;
  });

  it('should toggle all completed', function() {
    var todosAllTrue = [
      {title: 'something', completed: true},
      {title: 'something', completed: true},
      {title: 'something', completed: true},
      {title: 'something', completed: true}];

    var todosAllFalse = [
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'something', completed: false}];

    var todosMixed = [
      {title: 'something', completed: false},
      {title: 'something', completed: false},
      {title: 'something', completed: true},
      {title: 'something', completed: true}];

    expect(service.toggleAllCompleted(todosAllFalse)).to.deep.equal(todosAllTrue);
    expect(service.toggleAllCompleted(todosMixed)).to.deep.equal(todosAllTrue);
    expect(service.toggleAllCompleted(todosAllTrue)).to.deep.equal(todosAllFalse);
  });
});