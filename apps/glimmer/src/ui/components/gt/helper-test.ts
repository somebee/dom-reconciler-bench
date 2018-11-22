import gt from './helper';

const { module, test } = QUnit;

module('Helper: gt', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(gt([]), undefined);
  });
});
