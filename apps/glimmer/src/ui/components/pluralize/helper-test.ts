import pluralize from './helper';

const { module, test } = QUnit;

module('Helper: pluralize', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(pluralize([]), undefined);
  });
});
