#! /usr/bin/env node

const CredentialManager = require('./../lib/credential-manager.js')

async function main () {
  const creds = new CredentialManager('twin')

  let [key, secret] = await creds.getKeyandSecrete()
  console.log(key, secret)
}
main()
