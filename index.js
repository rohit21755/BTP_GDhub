const Web3 = require('web3');
const shivomContract = require('./build/contracts/shivomContract.json');



const init = async () => {
const web3 = new Web3("http://localhost:9545");
const id = await web3.eth.net.getId();
let Accounts = await web3.eth.getAccounts();
let fromaddress = Accounts[0];
const deployedNetwork = shivomContract.networks[id];
const shivomContractInstance = new web3.eth.Contract(
    shivomContract.abi,
    deployedNetwork.address
);


    // const result = await shivomContractInstance.methods.getDataCount().call();
    // console.log(result);
    // console.log(deployedNetwork.address);

    web3.eth.sendTransaction({
        from: fromaddress,
        to: '0x4e2A20cC03747cA405f1b06DdA86C8042ee9E642',
        value: web3.utils.toWei('1', 'ether')
      }).then((receipt) => {
        console.log("Transaction receipt:", receipt);
      }).catch((error) => {
        console.error("Error sending ether:", error);
      });
      
    // addData calling :

    // shivomContractInstance.methods.addData("0x123456789abcdef", true).send({from: '0x1E60136bF715Ec41ab79b94e74019eE1238A8345'}).then((receipt) => {
    //     console.log(receipt);
    // }).catch((err) => {
    //     console.log(err);
    // });
    // const result2 = await shivomContractInstance.methods.getDataCount().call();
    // console.log(result2);

    // Check Account balance
    web3.eth.getBalance(fromaddress).then((balance) => {
        console.log("Account balance:", web3.utils.fromWei(balance, 'ether'));
      });


    //   Get data by id
      shivomContractInstance.deployed().then(function(instance) {
        return instance.getDataById(dataId);
    }).then(function(result) {
        // Process the returned data
        const id = result[0];
        const dataHash = result[1];
        const owner = result[2];
        const isPublic = result[3];
        console.log(`Genomic data with ID ${id} has hash ${dataHash}, is owned by ${owner}, and is ${isPublic ? 'public' : 'private'}.`);
    }).catch(function(err) {
        console.error(err);
    });
      
//     const shivom = artifacts.require("shivom");

// module.exports = function(deployer) {
//   deployer.deploy(shivom).then(async () => {
//     const shivomInstance = await shivom.deployed();
//     const fromAddress = '';

//     try {
//       const receipt = await shivomContractInstance.addData("0x123456789abcdef", true, { from: fromAddress });
//       console.log("Transaction receipt:", receipt);
//     } catch (error) {
//       console.error("Error adding data:", error);
//     }
//   });
// };

    
}
init();