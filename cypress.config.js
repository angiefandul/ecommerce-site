const { defineConfig } = require("cypress");

module.exports = defineConfig({

  defaultCommandTimeout: 6000,
  env: {
    url: "https://rahulshettyacademy.com",
    userId: "Bob",
    password: "123456",
  },
  retries: {
    runMode: 1,
    
    },
  projectId: "",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/examples/*.js'
    //screenshotsFolder: 'cypress/screenshots',
  },
});
