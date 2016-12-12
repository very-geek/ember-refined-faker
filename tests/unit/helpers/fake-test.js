import { fake } from 'dummy/helpers/fake'
import { module, test } from 'qunit'

module('Unit | Helper | fake')

test('throw an error if no arguments', function(assert) {
  assert.throws(() => fake(), /string parameter is required/i)
});
