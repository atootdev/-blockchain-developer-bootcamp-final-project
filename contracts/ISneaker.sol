// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface ISneaker {
    
    event SneakerListUpdated();

    event TokenMinted(address indexed owner, uint256 indexed tokenID);

    event ContractActive(bool indexed active);

    event ContractURIUpdated(string indexed contractURI);

    event TokenURIUpdated(string indexed tokenURI);

    /*
     * Functions
     */

    function addToConfList(string[] calldata confList) external;

    function setIsActive(bool _isActive) external;


}