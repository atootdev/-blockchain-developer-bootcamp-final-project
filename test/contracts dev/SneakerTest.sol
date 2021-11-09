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

    uint256 public tokenCount;

    /// @dev State variable to control when minting is allowed.
    bool public isActive;

    mapping(string => Sneaker) private _sneakerList;

    string private _contractURI = '';
    string private _tokenURI = '';

    event SneakerListUpdated();
    event TokenMinted(address indexed owner, uint256 indexed tokenID);
    event ContractActive(bool indexed active);
    event ContractURIUpdated(string indexed contractURI);
    event TokenURIUpdated(string indexed tokenURI);

    /// @dev Function modifier to require an active contract status.
    modifier activeContract() {
        require(isActive == true, 'Contract Is Not Active');
        _;
    }

    /// @dev Function modifier to require an active confirmation code.
    modifier activeCode(string memory _confCode){
        require(_sneakerList[_confCode].active == true, 'Code Is Not Active');
        _;
    }

    /*
     * Functions
     */
    
    /// @dev Contract constructor sets name and symbol for the sneaker NFT.
    /// @param name is the name of the sneaker NFT
    /// @param symbol is the symbol of the sneaker NFT
    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {
        tokenCount = 0;
        isActive = false;
    }

    /// @dev Allows the owner to add confirmation codes to the list.
    /// @param confList List of confirmation codes.
    function addToConfList(string[] calldata confList) external onlyOwner {
        for(uint i = 0; i < confList.length; i++) {
            _sneakerList[confList[i]] = Sneaker({
                number: confList[i],
                tokenId: i + 1,
                active: true
            });
        }
        emit SneakerListUpdated();
    }

    /// @dev Allows anyone with a valid confirmation code to mint a token.
    /// @param confCode Confirmation code.
    function mint(string memory confCode) public activeContract activeCode(confCode) {
        _sneakerList[confCode].active = false;
        _safeMint(msg.sender, _sneakerList[confCode].tokenId);
        emit TokenMinted(msg.sender, _sneakerList[confCode].tokenId);
        emit SneakerListUpdated();
    }

    /// @dev Allows the owner to set the isActive variable.
    /// @param _isActive Active state of the contract.
    function setIsActive(bool _isActive) external onlyOwner {
        isActive = _isActive;
        emit ContractActive(isActive);
    }

    /// @dev Allows the owner to set the Contract URI.
    /// @param URI Contract URI.
    function setContractURI(string calldata URI) external onlyOwner {
        _contractURI = URI;
        emit ContractURIUpdated(URI);
    }

    /// @dev Allows the owner to set the Token URI.
    /// @param URI Token URI.
    function setTokenURI(string calldata URI) external onlyOwner {
        _tokenURI = URI;
        emit TokenURIUpdated(URI);
    }

    /// @dev Allows anyone to get the Contract URI.
    /// @return Contract URI.
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }
    
    /// @dev Allows anyone to get the Token URI of the corresponding tokenId.
    /// @param tokenId Token ID.
    /// @return Token URI.
    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        require(_exists(tokenId), 'Token does not exist');
        return string(abi.encodePacked(_tokenURI, tokenId.toString()));
    }
}