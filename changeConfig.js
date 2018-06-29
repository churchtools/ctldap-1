var fs = require('fs')
  , ini = require('ini')

if ((process.argv.length < 3) || ((process.argv[2] === 'add') && (process.argv.length < 8))) {
  console.log('Usage:');
  console.log('  node changeConfig.js add <sitename> <uri> <password> <api-user> <api-password>');
  console.log('  node changeConfig.js remove <sitename>');
  console.log('  node changeConfig.js show <sitename>');
  return;
}

var command = process.argv[2];
var sitename = process.argv[3];
var uri = process.argv[4];
var password = process.argv[5];
var apiUser = process.argv[6];
var apiPassword = process.argv[7];


var config = ini.parse(fs.readFileSync('./ctldap.config', 'utf-8'))

if (command === 'show') {
  console.dir(config.sites[sitename]);
  return;
}

if (command === 'remove') {
  delete config.sites[sitename];
}

if (command === 'add') {
  config.sites[sitename] = {
    ldap_password: password,
    ct_uri: uri,
    api_user: apiUser,
    api_password: apiPassword
  }
}


fs.writeFileSync('./ctldap.config', ini.stringify(config));

console.log('ctldap.config updated.');