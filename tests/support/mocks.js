"Use Strict";

module.exports = {
  err: new Error('Test error'),
  mesh: {
    uri: function() { return 'test-uri'},
    discover: function() {},
    accept: function() {},
    link: function() {},
    stream: function() {}
  }
};
