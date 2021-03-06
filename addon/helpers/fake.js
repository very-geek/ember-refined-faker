import { helper } from '@ember/component/helper'
import faker from 'faker'

import {
  defaultLocale,
  changeLocale,
  localeHasBeenChanged
} from '../utils/locale'
import generateImageURL from '../utils/image'

faker.locale = defaultLocale

export function fake([signature, ...args], { parse = false, locale, ...opts }) {
  // running in node environment w/ fastboot server
  if ('undefined' !== typeof FastBoot // eslint-disable-line
    // and not to trying to generate an image URL
    && (signature && !/^image/i.test(signature))) return ''

  if (!signature) throw new Error(faker.fake())

  if (localeHasBeenChanged || locale) changeLocale(faker, locale)

  if (parse) {
    return faker.fake(signature.replace(/\[/g, '{{').replace(/\]/g, '}}'))
  } else {
    const [namespace, method] = signature.split('.')

    if ('image' === namespace && 'unsplash' === method) {
      return generateImageURL([namespace, method, ...args], opts)
    }

    try {
      return faker[namespace][method].apply(null, args)
    } catch (error) {
      if ("Cannot read property 'apply' of undefined" === error.message) {
        throw new ReferenceError(`${namespace}.${method} 不是有效的 faker 方法名称`)
      }
      throw new Error(error)
    }
  }
}

export default helper(fake)
