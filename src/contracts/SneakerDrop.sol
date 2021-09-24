// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SneakerDrop {
    address[] public contracts;
    address public lastContractAddress;

    event newSneakerContract(address contractAddress);

    constructor() public {}

    function newSneaker(string memory _name, string memory _symbol)
        public
        returns (address newContract)
    {
        Sneaker s = (new Sneaker)(_name, _symbol);
        contracts.push(s);
        lastContractAddress = address(s);
        emit newSneakerContract(s);
        return s;
    }
}

contract Sneaker is ERC721Enumerable, Ownable {
    using Strings for uint256;

    uint256 public maxSupply;

    mapping(uint256 => bool) private _confList;
    mapping(address => uint256) private _confListClaimed;

    string private _contractURI = "";
    string private _tokenBaseURI = "";
    string private _tokenRevealedBaseURI = "";


    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

}
