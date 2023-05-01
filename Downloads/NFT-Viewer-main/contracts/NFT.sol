// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./FungibleToken.sol";


contract NFT is ERC721URIStorage{
    
    FungibleToken public token;   
    uint256 public constant MINT_PRICE = 5 * 10 ** 9;
    uint256 public constant MAX_SUPPLY = 3;
    uint256 public tokenIds = 1 ;

   
constructor(address _tokenAddress) ERC721("Nonfungible","NFT"){
   token = FungibleToken(_tokenAddress);
}

function mintToken(string memory _tokenURI) public {

    require(tokenIds <= MAX_SUPPLY, "Exceeds token supply");
    require(token.balanceOf(msg.sender) >= MINT_PRICE,"token balance low");
     
     token.approve(address(this), MINT_PRICE);
     token.transferFrom(msg.sender, address(this), MINT_PRICE);
    _mint(msg.sender, tokenIds);
    _setTokenURI(tokenIds, _tokenURI);
    tokenIds += 1;
  
}
}

