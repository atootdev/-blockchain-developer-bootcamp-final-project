// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


contract User {
  address public owner;
  string public company_name;
  address[] public tokenList;

  modifier onlyOwner {
    require (msg.sender == owner);
    _;
  }
  
  constructor(address _owner, string memory _name) {
    owner = _owner;
    company_name = _name;
  }

  function transferOwnership(address _owner) external onlyOwner {
    owner = _owner;
  }

  function setName(string memory _name) public onlyOwner {
    company_name = _name;
  }

  function setToken(address token) external onlyOwner {
    tokenList.push(token);
  }
  
  function getData() public view returns (address, string memory){
    return (owner, company_name);
  }
}