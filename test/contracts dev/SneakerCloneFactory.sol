// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract SneakerCloneFactory {
  using Address for address;
  using Clones for address;

  event NewInstance(address instance);
}
