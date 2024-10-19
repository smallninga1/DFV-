import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const contractABI = [...] // ABI контракта
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contract = new web3.eth.Contract(contractABI, contractAddress);

export const verifyFileHash = async (fileHash) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.verifyFileHash(fileHash).call({ from: accounts[0] });
    return result;
  } catch (error) {
    console.error('Error verifying file hash:', error);
    return false;
  }
};
