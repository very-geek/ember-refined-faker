'use strict'

module.exports = {
  name: 'ember-refined-faker',

  options: {
    nodeAssets: {
      faker() {
        return {
          import: [{
            path: 'build/build/faker.js',
            using: [{ transformation: 'amd', as: 'faker' }]
          }],
          enabled: this.isDevelopingAddon()
        }
      }
    }
  },

  isDevelopingAddon() {
    return !this.app.isProduction
  }
}
