const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });


async function main() {

  const TokenContract = await ethers.getContractFactory("FungibleToken");
 
  const NFTContract = await ethers.getContractFactory("NFT");

  // deploy the token & NFT contract
  const deployedTokenContract = await TokenContract.deploy()
  
  console.log("Token contract address is:", deployedTokenContract.address);

  const deployedNFTContract = await NFTContract.deploy(deployedTokenContract.address);
  
  console.log("NFT contract address is:", deployedNFTContract.address);

//   await sleep(10000);
  // Verify the contract after deploying
  // await hre.run("verify:verify", {
  //   address: deployedTokenContract().address,
  //   constructorArguments: [],
  // });

 
  //  await hre.run("verify:verify", {
  //   address: deployedNFTContract(deployedTokenContract.address).address,
  //   constructorArguments: [],
  // });
}

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  
//   Token contract address is: 0x4bb2434046C06b5C7A59F85167f6225c1BA083Fc
//   NFT contract address is: 0xC2984F58901a1cECAde22d8be4aA07e2Ee67f28d