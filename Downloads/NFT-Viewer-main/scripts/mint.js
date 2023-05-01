require("dotenv").config();
const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/NFT.sol/NFT.json");
// const tokenContract = require("../artifacts/contracts/FungibleToken.sol/FungibleToken.json");

// const tokencontractInterface = tokenContract.abi;
const contractInterface = contract.abi;


let provider = ethers.provider;

const privateKey = `0x${process.env.PRIVATE_KEY}`;
const wallet = new ethers.Wallet(privateKey);

wallet.provider = provider;
const signer = wallet.connect(provider);


const nft = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractInterface,
  signer
);

const main = async() => {
  console.log("Waiting 1 blocks for confirmation...");
  
 for(let i=1; i<=3; i++){
    const tokenURI = `https://gateway.pinata.cloud/ipfs/QmdWW9pB6oe3Q61BPAjuEa4aAVUNH8MDwB3FnPRahENpFM/${i}.json`;
    console.log(tokenURI);
    await nft
    .mintToken(tokenURI,{
        gasLimit: 500_000,
      })
    .then((tx) => tx.wait(1))
    .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))

    .catch((e) => console.log("something went wrong", e));
 }
 
};

main();