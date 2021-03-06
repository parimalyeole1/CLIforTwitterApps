const inquirer = require('inquirer')
const CredentialManager = require('./../lib/credential-manager.js')
const util = require('./../lib/util.js')
const Twitter = require('./../lib/twitter')
const querystring = require('querystring')

const configure = {
  async consumer (name) {
    try {
      let creds = new CredentialManager(name)
      let answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'key',
          message: 'Enter twitter api key',
          validate: util.notEmpty
        },
        {
          type: 'password',
          name: 'secret',
          message: 'Enter twitter secrete key',
          validate: util.notEmpty
        }
      ])
      await creds.storeKeyAndSecret('apiKey', answers.key, answers.secret)
    } catch (error) {
      console.log('Catch:configure.consumer', error)
    }
  },
  async account (name) {
    try {
      let creds = new CredentialManager(name)
      var [apiKey, apiSecret] = await creds.getKeyAndSecret('apiKey')
      let twitter = new Twitter(apiKey, apiSecret)
      let response = querystring.parse(await twitter.post('oauth/request_token'))
      twitter.setToken(response['oauth_token'], response['oauth_token_secret'])
      await inquirer.prompt({
        type: 'input',
        message: 'Press enter to open Twitter in your default browser to authorize access',
        name: 'continue'
      })

      util.openBrowser(`${twitter.baseUrl}oauth/authorize?oauth_token=${response['oauth_token']}`)
      let answers = await inquirer.prompt({
        type: 'input',
        message: 'Enter the PIN provided by Twitter',
        name: 'pin',
        validate: util.notEmpty
      })

      let tokenResponse = querystring.parse(
        await twitter.post('oauth/access_token', `oauth_verifier=${answers['pin']}`)
      )
      twitter.setToken(tokenResponse['oauth_token'], tokenResponse['oauth_token_secret'])

      let verifyResponse = await twitter.get('1.1/account/verify_credentials.json')
      await creds.storeKeyAndSecret(
        'account',
        tokenResponse['oauth_token'],
        tokenResponse['oauth_token_secret']
      )
      console.log(`Account "${verifyResponse['screen_name']}" successfully added`)
    } catch (error) {
      console.log('Catch:configure.account', error)
    }
  }
}

module.exports = configure
