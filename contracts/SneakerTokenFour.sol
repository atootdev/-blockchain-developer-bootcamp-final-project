// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ISneaker.sol";
import "./ISneakerMetadata.sol";

contract SneakerTokenFour is ERC721Enumerable, Ownable, ISneaker, ISneakerMetadata {
    using Strings for uint256;

    struct Sneaker {
        string code;
        uint256 tokenId;
        bool active;
    }

    /// @dev State variable to control when minting is allowed.
    bool public isActive = false;

    mapping(string => Sneaker) public sneakerList;

    string private _contractURI = '';
    string private _tokenURI = '';

    /// @dev Function modifier to require an active contract status.
    modifier activeContract() {
      require(isActive == true, 'Contract Is Not Active');
      _;
    }

    /// @dev Function modifier to require an active confirmation code.
    modifier activeCode(string memory confCode){
      require(sneakerList[confCode].active == true, 'Code Is Not Active');
      _;
    }

    /*
     * Functions
     */

    /// @dev Contract constructor sets name and symbol for the sneaker token.
    /// @param name is the name of the sneaker token
    /// @param symbol is the symbol of the sneaker token
    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {
    }

    /// @dev Allows the owner to add confirmation codes to the list.
    /// @param confList List of confirmation codes.
    function addToConfList(string[] calldata confList) external override onlyOwner {
        for(uint i = 0; i < confList.length; i++) {
            sneakerList[confList[i]] = Sneaker({
                code: confList[i],
                tokenId: i + 1,
                active: true
            });
        }
        emit SneakerListUpdated();
    }

    /// @dev Allows anyone with a valid confirmation code to mint a token.
    /// @param confCode Confirmation code.
    function mint(string memory confCode) public activeContract activeCode(confCode) {
        sneakerList[confCode].active = false;
        _safeMint(msg.sender, sneakerList[confCode].tokenId);
        emit TokenMinted(msg.sender, sneakerList[confCode].tokenId);
        emit SneakerListUpdated();
    }

    /// @dev Allows the owner to set the isActive variable.
    /// @param _isActive Active state of the contract.
    function setIsActive(bool _isActive) external override onlyOwner {
        require(isActive != _isActive, "Input matches current state");
        isActive = _isActive;
        emit ContractActive(isActive);
    }

    /// @dev Allows the owner to set the Contract URI.
    /// @param URI Contract URI.
    function setContractURI(string calldata URI) external override onlyOwner {
        _contractURI = URI;
        emit ContractURIUpdated(URI);
    }

    /// @dev Allows the owner to set the Token URI.
    /// @param URI Token URI.
    function setTokenURI(string calldata URI) external override onlyOwner {
        _tokenURI = URI;
        emit TokenURIUpdated(URI);
    }

    /// @dev Allows anyone to get the Contract URI.
    /// @return Contract URI.
    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    /// @dev Returns the tokenURI for the specified token id.
    /// @param tokenId Token Id.
    function tokenURI(uint256 tokenId) public view override(ERC721) returns (string memory) {
        /// @dev Convert string to bytes so we can check if it's empty or not.
        string memory revealedBaseURI = _tokenURI;
        return bytes(revealedBaseURI).length > 0 ? _tokenURI :
            string(abi.encodePacked(revealedBaseURI, tokenId.toString()));
    }
}