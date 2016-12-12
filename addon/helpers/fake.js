import Ember from 'ember'
import faker from 'faker'

export function fake(params/*, hash*/) {
  if (params && params.length > 0) {
    return faker.fake()
  } else {
    throw new Error(faker.fake())
  }
}

export default Ember.Helper.helper(fake)
