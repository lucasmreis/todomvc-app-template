describe('TodoService', function() {
  var service;

  beforeEach(module('todomvc'));

  beforeEach(inject(function(_TodoService_) {
    service = _TodoService_;
  }));

  it('should load properly', function() {
    expect(service.id).to.equal(1);
  });
});