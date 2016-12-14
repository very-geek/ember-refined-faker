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
          enabled: this._defaults.enabled
        }
      }
    }
  },

  isDevelopingAddon() {
    return !this.app.isProduction
  },

  included(parent) {
    /**
     * Default configurations.
     * Users can overwrite this in Ember Application's config/environment.js.
     *
     * @property defaults
     * @type Object
     * @param defaults.defaultLocale { String } 缺省使用的语言，默认值：'en_US'
     */
    this._defaults = Object.assign({
      defaultLocale: 'en_US',
      enabled: 'production' !== parent.env
    }, parent.options.faker || {})

    this._super.included.apply(this, arguments)
  },

  config(env, config) {
    return this._defaults ? { faker: this._defaults } : {}
  }
}
