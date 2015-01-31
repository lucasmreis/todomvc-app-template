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

    var coll = [{
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

    expect(service.addTodo(newTodo, coll)).to.deep.equal(expected);
  });
});