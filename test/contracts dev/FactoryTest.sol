// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SneakerTest.sol";

contract FactoryTest is Ownable {

    string public ownerName;
    //uint256 public numberOfSneakers;

    //uint256 constant maxNumberOfSneakers = 4;

    mapping(string => address) private sneakerAddress;
    mapping(address => SneakerTest) public sneakerList;

    // Alternative way to store sneaker contracts. Need to test.
    //mapping(string => mapping(address => SneakerTest)) private sneakers;
    
    event newSneakerContract(address contractAddress);

    /// @dev Contract constructor sets name for the sneaker brand/company.
    /// @param name The name of the sneaker brand/company.
    constructor(string memory name) {
        ownerName = name;
        // numberOfSneakers = 0;
    }
    
    /// @dev Allows owner to create a new SneakerTest contract.
    /// @param sneakerName The name of the token.
    /// @param symbol The symbol of the token.
    function newSneaker(string memory sneakerName, string memory symbol)
        public onlyOwner
    {
        // require(numberOfSneakers <= maxNumberOfSneakers);
        SneakerTest sneaker = new SneakerTest(sneakerName, symbol);
        sneakerList[address(sneaker)] = sneaker;
        sneakerAddress[sneakerName] = address(sneaker);
        // numberOfSneakers = numberOfSneakers + 1;
        emit newSneakerContract(address(sneaker));
    }
    
    /// @dev Allows owner to add confirmation codes to a specified contract.
    /// @param _sneaker The address of the sneaker contract.
    /// @param _confList The confirmation codes list.
    function addConfListToSneaker(address _sneaker, string[] calldata _confList) external onlyOwner {
        SneakerTest sneaker = sneakerList[_sneaker];
        require(address(sneaker) != address(0));
        sneaker.addToConfList(_confList);
    }
    
    /// @dev Allows owner to set sneaker contract active.
    /// @param _sneaker The address of the sneaker contract.
    /// @param active Active state of the sneaker contract.
    function setSneakerActive(address _sneaker, bool active) external onlyOwner {
        SneakerTest sneaker = sneakerList[_sneaker];
        require(address(sneaker) != address(0));
        sneaker.setIsActive(active);
    }

    function getSneakerAddress(string memory sneakerName) public view returns (address) {
        return sneakerAddress[sneakerName];
    }

    function getSneakerName(address _sneaker) public view returns (string memory) {
        SneakerTest sneaker = sneakerList[_sneaker];
        return sneaker.name();
    }

    /*
    /// In developement
    function removeSneaker(address _sneaker) external onlyOwner {
        SneakerTest sneaker = sneakerList[_sneaker];
        sneaker.setIsActive(false);

    }
    */
}