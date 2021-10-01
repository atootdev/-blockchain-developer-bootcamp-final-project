// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SneakerTest is ERC721Enumerable, Ownable {
    using Strings for uint256;

    struct Sneaker {
        string number;
        uint256 tokenId;
        bool active;
    }

    bool public isActive = false;

    mapping(string => Sneaker) private _sneakerList;

    string private _contractURI = '';
    string private _tokenBaseURI = '';
    string private _tokenRevealedBaseURI = '';

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function addToConfList(string[] memory confList) public onlyOwner {
        for(uint i = 0; i < confList.length; i++){
            _sneakerList[confList[i]].number = confList[i];
            _sneakerList[confList[i]].tokenId = i + 1;
            _sneakerList[confList[i]].active = true;
        }
    }

    function mint(string memory confNumber) public {
        require(isActive, 'Contract Is Not Active.');
        require(isNumberListed(confNumber), 'Confirmation Number is Not Valid');
        require(isNumberActive(confNumber), 'Confirmation Number Has Already Been Used');
        _safeMint(msg.sender, _sneakerList[confNumber].tokenId);
        _sneakerList[confNumber].active = false;
    }

    function isNumberActive(string memory confNumber) public view onlyOwner returns (bool){
        return _sneakerList[confNumber].active;
    }

    function isNumberListed(string memory confNumber) public view onlyOwner returns (bool) {
        string memory number = _sneakerList[confNumber].number;
        if(keccak256(abi.encodePacked(number)) == keccak256(abi.encodePacked(confNumber))) {
            return true;
        } else {
            return false;
        }
    }

    function setIsActive(bool _isActive) public onlyOwner {
        isActive = _isActive;
    }

    function setContractURI(string memory URI) public onlyOwner {
        _contractURI = URI;
    }

    function setBaseURI(string memory URI) public onlyOwner {
        _tokenBaseURI = URI;
    }
    
    function setRevealedBaseURI(string memory revealedBaseURI) public onlyOwner {
        _tokenRevealedBaseURI = revealedBaseURI;
    }

    function contractURI() public view onlyOwner returns (string memory) {
        return _contractURI;
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        require(_exists(tokenId), 'Token does not exist');

        /// Convert string to bytes so we can check if it's empty or not.
        string memory revealedBaseURI = _tokenRevealedBaseURI;
        return bytes(revealedBaseURI).length > 0 ?
            string(abi.encodePacked(revealedBaseURI, tokenId.toString())) :
            _tokenBaseURI;
    }
}