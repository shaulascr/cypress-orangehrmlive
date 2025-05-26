const { defineConfig } = require("cypress");

const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('before:run', () => {
    const screenshotPath = 'cypress/screenshots/';
    if (fs.existsSync(screenshotPath)) {
      fs.readdirSync(screenshotPath).forEach(file => {
        const filePath = path.join(screenshotPath, file);
        fs.unlinkSync(filePath);
      });
    }
  });
};

module.exports = defineConfig({
  defaultCommandTimeout: 15000,  // 15 detik
  pageLoadTimeout: 30000, 
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile:"cypress/support/e2e.js",
    defaultCommandTimeout: 30000,
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
  },
});
