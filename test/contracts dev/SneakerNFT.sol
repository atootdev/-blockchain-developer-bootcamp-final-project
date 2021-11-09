// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SneakerNFT is ERC721Enumerable, Initializable, Ownable {
    using Strings for uint256;

    struct Sneaker {
        string number;
        uint256 tokenId;
        bool active;
    }

    bool public isActive = false;

    mapping(string => Sneaker) private _sneakerList;

    string private _contractURI = '';
    string private _tokenURI = '';

    event SneakerListUpdated();
    event TokenMinted(address indexed owner, uint256 indexed tokenID);
    event ContractActive(bool indexed active);
    event ContractURIUpdated(string indexed contractURI);
    event TokenURIUpdated(string indexed tokenURI);

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function addToConfList(string[] memory confList) public onlyOwner {
        for(uint i = 0; i < confList.length; i++){
            _sneakerList[confList[i]].number = confList[i];
            _sneakerList[confList[i]].tokenId = i + 1;
            _sneakerList[confList[i]].active = true;
            emit SneakerListUpdated();
        }
    }

    function mint(string memory confNumber) public {
        require(isActive, 'Contract Is Not Active.');
        require(isNumberListed(confNumber), 'Confirmation Number is Not Valid');
        require(isNumberActive(confNumber), 'Confirmation Number Has Already Been Used');
        _safeMint(msg.sender, _sneakerList[confNumber].tokenId);
        _sneakerList[confNumber].active = false;
        emit TokenMinted(msg.sender, _sneakerList[confNumber].tokenId);
        emit SneakerListUpdated();
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
        emit ContractActive(isActive);
    }

    function setContractURI(string memory URI) public onlyOwner {
        _contractURI = URI;
        emit ContractURIUpdated(URI);
    }

    function setTokenURI(string memory URI) public onlyOwner {
        _tokenURI = URI;
        emit TokenURIUpdated(URI);
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        require(_exists(tokenId), 'Token does not exist');
        string memory URI = _tokenURI;
        return string(abi.encodePacked(URI, tokenId.toString()));
    }
}