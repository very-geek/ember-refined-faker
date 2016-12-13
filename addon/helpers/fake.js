import Helper from 'ember-helper'
import { defaultLocale, changeLocale, localeHasBeenChanged } from '../utils/locale'
import generateImageURL from '../utils/image'
import faker from 'faker'

faker.locale = defaultLocale

export function fake([signature, ...args], {parse = false, locale, ...opts}) {
  // return early if request to Fastboot server
  if (self.Fastboot && undefined === self.document) return ''

  // require at least one argument to call faker properly
  if (!signature) throw new Error(faker.fake())

  // change locale only when necessary
  if (localeHasBeenChanged || locale) changeLocale(faker, locale)

  if (parse) {
    return faker.fake(signature.replace(/\[/g, '{{').replace(/\]/g, '}}'))
  } else {
    const [namespace, method] = signature.split('.')

    if ('image' === namespace && 'unsplash' === method) {
      return generateImageURL([namespace, method, ...args], opts)
    }

    return faker[namespace][method].apply(null, args)
  }
}

export default Helper.helper(fake)
