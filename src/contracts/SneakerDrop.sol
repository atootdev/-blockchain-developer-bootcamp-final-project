// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SneakerDrop {
    string public _name;
    address public immutable _owner;
    address[] public contracts;
    string[] public sneakers;
    
    modifier onlyOwner() {
        require(msg.sender == _owner, "Access Denied: Must be the owner of the contract");
        _;
    }

    event newSneakerContract(address contractAddress);

    constructor(string memory name) {
        _name = name;
        _owner = msg.sender;
    }

    function newSneaker(string memory s_name, string memory _symbol)
        public onlyOwner returns (address newContract)
    {
        Sneaker c = new Sneaker(s_name, _symbol);
        contracts.push(address(c));
        sneakers.push(s_name);
        emit newSneakerContract(address(c));
        return address(c);
    }

    function newSneakerSalted(bytes32 salt, string memory s_name, string memory _symbol)
        public onlyOwner returns (address newContract)
    {
        address predictedAddress = address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(abi.encodePacked(
                type(Sneaker).creationCode,
                s_name,
                _symbol
            ))
        )))));

        Sneaker s = new Sneaker{salt: salt}(s_name, _symbol);
        require(address(s) == predictedAddress);
        contracts.push(address(s));
        sneakers.push(s_name);
        emit newSneakerContract(address(s));
        return address(s);
    }
}

contract Sneaker is ERC721Enumerable, Ownable {
    using Strings for uint256;

    bool public isActive = false;

    //first is a boolean mapping of the confirmations numbers.
    //second is an address mapping of the tokenIds.
    mapping(string => bool) private _confList;

    string private _contractURI = '';
    string private _tokenBaseURI = '';
    string private _tokenRevealedBaseURI = '';

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    function addToConfList(string[] calldata confList) external onlyOwner {
        for(uint i = 0; i < confList.length; i++){
            _confList[confList[i]] = true;
        }
    }

    function mint(string memory confNumber, uint256 tokenId) public {
        require(isActive, 'Contract Is Not Active.');
        require(_confList[confNumber] = true, 'Incorrect/Already Used Confirmation Code');
        
        _safeMint(msg.sender, tokenId);
        _confList[confNumber] = false;
    }

    function setIsActive(bool _isActive) external onlyOwner {
        isActive = _isActive;
    }

    function setContractURI(string calldata URI) external onlyOwner {
        _contractURI = URI;
    }

    function setBaseURI(string calldata URI) external onlyOwner {
        _tokenBaseURI = URI;
    }
    
    function setRevealedBaseURI(string calldata revealedBaseURI) external onlyOwner {
        _tokenRevealedBaseURI = revealedBaseURI;
    }

    function contractURI() public view returns (string memory) {
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
