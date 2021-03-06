const { FileSystemWallet, Gateway } = require("fabric-network");
const path = require("path");

DistributeToDistrict = async (user, payload) => {
    const ccp = require(`../ccp/connection-state_gov.json`);
    const walletPath = path.join(process.cwd(), `wallet_stategov`);
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'admin',
        discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mainchannel");

    // Get the contract from the network.
    const contract = network.getContract("stategovcc");

    // Evaluate the specified transaction.
    await contract.submitTransaction("transferToDistrict", payload.Quantity,payload.Type,payload.Holder,payload.ID);

};

module.exports = DistributeToDistrict;