// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileVerification {
    mapping(bytes32 => bool) public fileHashes;

    // Сохранение хэша файла
    function storeFileHash(bytes32 fileHash) public {
        require(!fileHashes[fileHash], "File already exists.");
        fileHashes[fileHash] = true;
    }

    // Проверка подлинности файла
    function verifyFileHash(bytes32 fileHash) public view returns (bool) {
        return fileHashes[fileHash];
    }
}
