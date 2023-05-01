
import contractABI from "./contract.json";
import "./App.css";
import { ethers, Wallet } from "ethers";
import { useState, useEffect } from "react";


function App() {
  const [state, setState] = useState(true);
  const [token, setToken] = useState([]);


  const connectContract = async (provider) => {

    const privateKey = "bff39cb7c9e44a6ecf4f4d7a143fbb3c934576ff67cf784c6a190a980e6abc19";
    const signer = new ethers.Wallet(privateKey,provider)
  
  
    const address = "0xC2984F58901a1cECAde22d8be4aA07e2Ee67f28d";
    const contract = new ethers.Contract(address, contractABI, signer);
    getMetaData(contract);
  };
  const getMetaData = async (contract) => {
    for (let i = 1; i <= 3; i++) {
      const tokensURI = await contract.tokenURI(i);
      const getMetadata = await fetch(tokensURI);
      const metadata = await getMetadata.json();

      token.push({
        name: metadata.name,
        description: metadata.description,
        image: metadata.image,
        attributes: metadata.attributes,
      });
      console.log(setToken(token));
    }
    setToken(token);
    setState(false);
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    connectContract(provider);
  }, []);

  return (
    <div className="content">
      {token.map((token, id) => (
        <div key={id}>
          <img style={{ width: "200", height: "200" }} src={token.image} />
          <div>
            <div className="name">
              <h1>{token.name}</h1>
            </div>
            <div className="name">
              <p>{token.description}</p> 
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
