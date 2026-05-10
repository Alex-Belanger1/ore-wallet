const appJson = require('./app.json');

const expo = { ...appJson.expo };

if (process.env.GITHUB_PAGES === '1') {
  expo.experiments = {
    ...expo.experiments,
    baseUrl: '/ore-wallet',
  };
}

module.exports = { expo };
