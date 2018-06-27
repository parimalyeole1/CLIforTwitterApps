#! /usr/bin/env node

const program = require('commander')
// const pkg = require('./../package.json')
const pkg = {
  name: 'twine-cli',
  version: '1.0.0'
}

program
  .version(pkg.version)
  .command('configure', 'configure twiter related credentials')
  .parse(process.argv)
