// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface ISneakerMetadata {

    function setContractURI(string calldata URI) external;
    
    function setTokenURI(string calldata URI) external;
    
    function contractURI() external view returns (string memory);
}