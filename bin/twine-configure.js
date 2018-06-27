const program = require('commander')
// const pkg = require('./../package.json')
const pkg = {
  name: 'twine-cli',
  version: '1.0.0'
}
const configure = require('./../commands/configure')

program
  .version(pkg.version)

program
  .command('consumer')
  .description('Add twitter api and secrete')
  .action(async () => {
    await configure.consumer(pkg.name)
  })

program
  .parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
