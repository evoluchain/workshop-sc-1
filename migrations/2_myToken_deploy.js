const MyToken = artifacts.require('MyToken');

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(MyToken)
    .then(async function (TokenInstance) {
      const contractName = await TokenInstance.name();
      console.log('Deployed', contractName, TokenInstance.address);
    });
};
