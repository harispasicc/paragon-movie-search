const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'e2e/**/*.spec.js',
    supportFile: 'e2e/support/e2e.js'
  },
})

