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
  assert.ok(/^\$\d{1,2}\.\d{2}$/i.test(expected))
})

test('delegate faker method with hash arguments', function(assert) {
  const expected = fake(['random.objectElement', { foo: 1, bar: 2, baz: 3 }], {})
  assert.ok(/^1|2|3$/i.test(expected))
})

test('delegate faker method with array arguments', function(assert) {
  const expected = fake(['random.arrayElement', [1, 2, 3]], {})
  assert.ok(/^1|2|3$/i.test(expected))
})

test('delegate parsing signature as mustache template', function(assert) {
  const expected = fake(['Hi, I\'m [random.number] years old.'], { parse: true })
  assert.ok(/\d+/i.test(expected))
})

test('change locale and reset back implicitly', function(assert) {
  const chinese = fake(['name.firstName'], { locale: 'zh_CN' })
  assert.ok(/[\u4e00-\u9fa5]/.test(chinese))
  const english = fake(['name.firstName'], {})
  assert.ok(/[a-z]+/i.test(english))
})

test('use unsplash.it for image placeholder service', function(assert) {
  assert.equal(fake(['image.unsplash'], {}), 'https://unsplash.it/400/300')
  assert.equal(fake(['image.unsplash', 300, 400], {}), 'https://unsplash.it/300/400')
  assert.equal(
    fake(['image.unsplash'], { blur: true }),
    'https://unsplash.it/400/300?blur'
  )
  assert.equal(
    fake(['image.unsplash'], { random: true }),
    'https://unsplash.it/400/300?random'
  )
  assert.equal(
    fake(['image.unsplash'], { gravity: 'center' }),
    'https://unsplash.it/400/300?gravity=center'
  )
  assert.equal(
    fake(['image.unsplash'], { grayscale: true }),
    'https://unsplash.it/g/400/300'
  )
  assert.equal(
    fake(['image.unsplash'], { blur: true, random: true, gravity: 'center', grayscale: true }),
    'https://unsplash.it/g/400/300?blur&random&gravity=center'
  )
})
