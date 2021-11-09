// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./User.sol";

contract UserFactory {
  address public owner;
  mapping(address => address) private users;


modifier onlyOwner {
    require (msg.sender == owner);
    _;
  }

  event newUserCreated(address userAddress);

  constructor() {
    owner = msg.sender;
  }

  /// @param _owner is the wallet address of the user.
  function createUser(address _owner, string memory _name) public onlyOwner {
    User user = new User(_owner, _name);
    users[_owner] = address(user);
    emit newUserCreated(address(user));
  }

  function getUser(address _owner) public view returns (address) {
    return users[_owner];
  }
}