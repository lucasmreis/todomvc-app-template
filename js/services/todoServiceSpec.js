describe('TodoService', function() {
  var service;

  beforeEach(module('todomvc'));

  beforeEach(inject(function(_TodoService_) {
    service = _TodoService_;
  }));

  it('should add new todo to a collection', function() {
    var newTodo = {
      title: 'new'
    };

    var todos = [{
      id: 1,
      title: 'old',
      completed: true
    }];

    var expected = [{
      id: 1,
      title: 'old',
      completed: true
    },
    {
      id: 2,
      title: 'new',
      completed: false
    }];

    expect(service.addTodo(newTodo, todos)).to.deep.equal(expected);
  });

  it('should remove todo from a collection', function() {
    var todo = {
      id: 2,
      title: 'something',
      completed: false
    }

    var todos = [{
      id: 1,
      title: 'something',
      completed: true
    },
    {
      id: 8,
      title: 'something',
      completed: false
    },
    {
      id: 2,
      title: 'something',
      completed: false
    },
    {
      id: 3,
      title: 'something',
      completed: true
    }];

    var expected = [{
      id: 1,
      title: 'something',
      completed: true
    },
    {
      id: 8,
      title: 'something',
      completed: false
    },
    {
      id: 3,
      title: 'something',
      completed: true
    }];

    expect(service.removeTodo(todo, todos)).to.deep.equal(expected);
  });
});