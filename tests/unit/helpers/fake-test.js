import { fake } from 'dummy/helpers/fake'
import { module, test } from 'qunit'

module('Unit | Helper | fake')

test('throw an error if no arguments', function(assert) {
  assert.throws(() => fake([], {}), /string parameter is required/i)
})

test('delegate faker method without arguments', function(assert) {
  const expected = fake(['address.streetPrefix'], {})
  assert.ok(/^[a-z]$/i.test(expected))
})

test('delegate faker method with arguments', function(assert) {
  const expected = fake(['finance.amount', 0, 100, 2, '$'], {})
  assert.ok(/^\$\d{1,2}\.00$/i.test(expected))
})

test('delegate faker method with hash arguments', function(assert) {
  const expected = fake(['random.objectElement', {foo: 1, bar: 2, baz: 3}], {})
  assert.ok(/^1|2|3$/i.test(expected))
})

test('delegate faker method with array arguments', function(assert) {
  const expected = fake(['random.arrayElement', [1, 2, 3]], {})
  assert.ok(/^1|2|3$/i.test(expected))
})

test('delegate parsing signature as mustache template', function(assert) {
  const expected = fake(['Hi, I\'m [random.number] years old.'], {parse: true})
  assert.ok(/\d+/i.test(expected))
})

test('change locale and reset back implicitly', function(assert) {
  const chinese = fake(['name.firstName'], {locale: 'zh_CN'})
  assert.ok(/[\u4e00-\u9fa5]/.test(chinese))
  const english = fake(['name.firstName'], {})
  assert.ok(/[a-z]+/i.test(english))
})
