/* eslint-env node */
/* global require: false, module: false, process: false */
'use strict'

const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-refined-faker',

  // isDevelopingAddon() {
  //   return process.env.EMBER_ENV !== 'production'
  // },

  options: {
    babel: {
      plugins: ['minify-dead-code-elimination', 'transform-object-rest-spread'],
    },

    faker: {
      enabled: process.env.EMBER_ENV !== 'production',
    },
  },

  included(app) {
    if (app.options && app.options.faker) {
      this.options.faker = Object.assign({}, this.options.faker, app.options.faker);
    }

    this._super.included.apply(this, arguments);
  },

  treeForApp() {
    const tree = this._super.treeForApp.apply(this, arguments);
    return this.options.faker.enabled ? tree : this._excludes(tree);
  },

  treeForAddon() {
    const tree = this._super.treeForAddon.apply(this, arguments);
    return this.options.faker.enabled ? tree : this._excludes(tree);
  },

  _excludes(tree) {
    return new Funnel(tree, { exclude: [/helpers\/arr|fake/i] });
  },
}
