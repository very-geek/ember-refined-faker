import Helper from 'ember-helper'
import { defaultLocale, changeLocale, localeHasBeenChanged } from '../utils'
import faker from 'faker'

faker.locale = defaultLocale

export function fake([signature, ...args], {parse = false, locale}) {
  // return early if request to Fastboot server
  if (self.Fastboot && undefined === self.document) return ''

  if (!signature) throw new Error(faker.fake())

  if (localeHasBeenChanged || locale) changeLocale(faker, locale)

  if (parse) {
    return faker.fake(signature.replace(/\[/g, '{{').replace(/\]/g, '}}'))
  } else {
    const [namespace, method] = signature.split('.')
    return faker[namespace][method].apply(null, args)
  }
}

export default Helper.helper(fake)
