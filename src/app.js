import React, { useState } from 'react';
import Web3 from 'web3';
import { uploadFile } from './utils/ipfs'; // опционально для IPFS
import { verifyFileHash } from './utils/blockchain'; // функция для взаимодействия со смарт-контрактом

const App = () => {
  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState('');
  const [verificationResult, setVerificationResult] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      // Хеширование файла и загрузка в блокчейн
      const fileBuffer = await file.arrayBuffer();
      const hash = Web3.utils.keccak256(fileBuffer);
      setFileHash(hash);
      // Опционально: Загрузка в IPFS
      // const ipfsHash = await uploadFile(file);
      await verifyFileHash(hash);
    }
  };

  const handleVerify = async () => {
    const result = await verifyFileHash(fileHash);
    setVerificationResult(result ? 'File is valid!' : 'File is invalid!');
  };

  return (
    <div className="App">
      <h1>Decentralized File Verification</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Verify</button>
      <p>File Hash: {fileHash}</p>
      <button onClick={handleVerify}>Verify File</button>
      <p>Verification Result: {verificationResult}</p>
    </div>
  );
};

export default App;
