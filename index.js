/* eslint-env node */
/* global require: false, module: false, process: false */
'use strict'

const Funnel = require('broccoli-funnel')

module.exports = {
  name: 'ember-refined-faker',

  options: {
    nodeAssets: {
      faker() {
        return {
          srcDir: 'build/build',
          vendor: ['faker.js'],
          enabled: this.options.faker.enabled
        }
      }
    },

    faker: {
      enabled: process.env.EMBER_ENV !== 'production',
    },
  },

  isDevelopingAddon() {
    return process.env.EMBER_ENV !== 'production'
  },

  included(parent) {
    if (parent.options && parent.options.faker) {
      this.options.faker = Object.assign({}, this.options.faker, parent.options.faker)
    }

    this._super.included.apply(this, arguments)
    this.import('vendor/faker/faker.js', {using: [{transformation: 'amd', as: 'faker'}]})
  },

  treeForApp() {
    let tree = this._super.treeForApp.apply(this, arguments)
    return this.options.faker.enabled ? tree : this._excludes(tree)
  },

  treeForAddon() {
    let tree = this._super.treeForAddon.apply(this, arguments)
    return this.options.faker.enabled ? tree : this._excludes(tree)
  },

  _excludes(tree) {
    return new Funnel(tree, { exclude: [/helpers\/arr|fake/i] })
  },
}
