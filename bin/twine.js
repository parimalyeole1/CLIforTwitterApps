#! /usr/bin/env node

// const CredentialManager = require('./../lib/credential-manager.js')

// async function main () {
//   const creds = new CredentialManager('twin')

//   let [key, secret] = await creds.getKeyandSecrete()
//   console.log(key, secret)
// }
// main()

const program = require('commander')
const pkg = require('./../package.json')

program
  .version(pkg.version)
  .command('configure', 'configure twiter related credentials')
  .parse(process.argv)
