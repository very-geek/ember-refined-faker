import { arr } from 'dummy/helpers/arr'
import { module, test } from 'qunit'

module('Unit | Helper | arr')

test('default arguments as an empty array', function(assert) {
  assert.deepEqual(arr(), [])
})

test('passing arguments will output as an array', function(assert) {
  assert.deepEqual(arr([1, 2, 3]), [1, 2, 3])
  assert.deepEqual(arr([1, null, 3]), [1, null, 3])
  assert.deepEqual(arr([1, 2, undefined]), [1, 2, undefined])
})
