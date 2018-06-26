const inquirer = require('inquirer')
const CredentialManager = require('./../lib/credential-manager.js')
const util = require('./../lib/util.js')

const configure = {
  async consumer (name) {
    let creds = new CredentialManager(name)
    let answere = await inquirer.prompt([
      {
        type: 'input',
        name: 'key',
        message: 'Enter twitter api key',
        validate: util.nonEmpty
      },
      {
        type: 'password',
        name: 'secret',
        message: 'Enter twitter secrete key',
        validate: util.nonEmpty
      }
    ])
    await creds.storeKeyandSecrete(answere.key, answere.secret)
  }
}

module.exports = configure
