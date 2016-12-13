'use strict'

/**
 * @module ember-refined-faker
 */

 /**
 * @class config
 */

module.exports = {
  name: 'ember-refined-faker',

  options: {
    nodeAssets: {
      faker() {
        return {
          srcDir: 'build/build/',
          import: [
            { path: 'faker.js', using: [{ transformation: 'amd', as: 'faker' }] }
          ],
          enabled: this.__defaults.enabled
        }
      }
    }
  },

  isDevelopingAddon() {
    return !this.app.isProduction
  },

  /**
   * Default configurations.
   * Users can overwrite this in Ember Application's config/environment.js.
   *
   * @property defaults
   * @type Object
   * @param defaults.defaultLocale { String } 缺省使用的语言，默认值：'en_US'
   * @param defaults.imageService { String } 占位图片使用的服务名称，默认值：'default'，使用 faker 内置的占位图片服务
   * @param defaults.enabled { Boolean } 是否开启 ember-refined-faker，默认会在 production 下禁止
   */
 config(env, config) {
    this.__defaults = {
      defaultLocale: 'en_US',
      imageService: 'default',
      enabled: 'production' !== env
    }

    return {
      faker: Object.assign(this.__defaults, config.faker || {})
    }
  }
}
