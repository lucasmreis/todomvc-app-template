angular.module('todomvc').factory('StateService', function() {
  function get(state) {
    return function() {
      return R.clone(state);
    };
  }

  function getStateProp(state, prop) {
    return R.clone(state[prop]);
  }

  var change = R.curry(function(state, listeners, prop, data) {
    var sameProp = R.filter(function(l) { return l.prop === prop; });

    state[prop] = data;

    R.forEach(function(listener) {
      listener.action(getStateProp(state, listener.prop));
    }, sameProp(listeners));

    return getStateProp(state, prop);
  });

  var listen = R.curry(function(state, listeners, prop, action) {
    var listener = {prop: prop, action: action};
    listeners.push(listener);

    var unsubscribe = function() {
      return listeners.splice(listeners.indexOf(listener), 1);
    };

    action(getStateProp(state, prop));

    return unsubscribe;
  });

  return {
    get: get,
    change: change,
    listen: listen
  };
});