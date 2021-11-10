// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SneakerDrop {
    using SafeMath for uint256;
    address public owner;

    struct Seller {
        uint256 id;
        address seller;
        string username;
        string company;
        string profileImgHash;
        string profileCoverImgHash;
        string bio;
        bool registered;
    }

    struct Sneaker {
        uint256 sneakerId;
        address sneaker;
        address creator;
        bool exists;
    }

    uint256 public totalSneakers = 0;
    uint256 public totalSellers = 0;

    mapping(address => Seller) private sellers; //mapping to get seller details from seller address
    mapping(string => address) private sellerAddressFromUsername; //mapping to get Seller address from username/company name
    mapping(string => bool) private usernames; //To check which username is taken, taken=>true, not taken=>false

    mapping(uint256 => Sneaker) private sneakers; // mapping to get sneaker details from sneaker id
    mapping(address => uint256[]) private sellerSneakers; // mapping to get sneaker id from seller address

    modifier onlyOwner() {
        require(msg.sender == owner, "Invalid User: User must be the owner.");
        _;
    }

    modifier onlySneakerOwner(uint256 id) {
        require(msg.sender == sneakers[id].creator, "You are not the sneaker owner!");
        _;
    }

    modifier onlyAllowedSeller(address seller) {
        require(
            sellers[seller].registered == true,
            "Not a Registered Seller!"
        );
        _;
    }

    modifier usernameTaken(string memory username) {
        require(!usernames[username], "Username already taken");
        _;
    }

    // modifier checkUserExists(){require(registeredUser[msg.sender]); _;}
    modifier checkSellerNotExists(address seller) {
        require(
            sellers[seller].registered == false,
            "Seller already registered"
        );
        _;
    }

    modifier checkSneakerExits(uint256 id) {
        require(sneakers[id].exists == true, "Sneaker does not exist");
        _;
    }

    event logRegisterSeller(address seller, uint256 id);
    event logSneakerCreated(address sneaker, address creator,uint sneakerid);

    constructor() {
        owner = msg.sender;
        registerSeller(msg.sender, "owner", "owner", "", "", "owner");
    }

    /*
     **************************************SELLER FUNCTIONS********************************************************************************
     */

    /// @notice Register a new seller
    /// @param _seller address of seller
    /// @param  _username username of username
    /// @param _companyname name of person
    /// @param _imgHash Ipfs Hash of sellers Profile Image
    /// @param _coverHash Ipfs Hash of seller cover Image
    /// @param _bio Biography of seller
    function registerSeller(address _seller, string memory _username, string memory _companyname, string memory _imgHash,
        string memory _coverHash, string memory _bio)
        public onlyOwner checkSellerNotExists(_seller) usernameTaken(_username) {
        usernames[_username] = true; // Attack Prevented
        totalSellers = totalSellers.add(1);
        uint256 _id = totalSellers;
        bool _registered = true;
        sellers[_seller] = Seller(
            _id,
            _seller,
            _username,
            _companyname,
            _imgHash,
            _coverHash,
            _bio,
            _registered
        );
        sellerAddressFromUsername[_username] = _seller;
        emit logRegisterSeller(_seller, totalSellers);
    }

    /// @notice Change username of a seller
    /// @param _username New username of seller
    function changeUsername(string memory _username) public onlyAllowedSeller(msg.sender) usernameTaken(_username) {
        sellers[msg.sender].username = _username;
    }

    /// @notice Check username available or not
    /// @param  _username username to Check
    /// @return status true or false
    function usernameAvailable(string memory _username) public view returns (bool status) {
        return !usernames[_username];
    }

    /// @notice Check seller registered or not
    /// @param _seller address of seller
    /// @return registered true or false
    function sellerStatus(address _seller) public view returns (bool registered) {
        return sellers[_seller].registered;
    }

    /// @notice Get seller details
    /// @return id Id of seller
    /// @return username username of person
    /// @return company name of seller
    /// @return imghash seller profile image ipfs hash
    /// @return coverhash usercCover image ipfs hash
    /// @return bio Biography of seller
    function getSeller() public view returns (
            uint256 id,
            string memory username,
            string memory company,
            string memory imghash,
            string memory coverhash,
            string memory bio
        ) {
        return (
            sellers[msg.sender].id,
            sellers[msg.sender].username,
            sellers[msg.sender].company,
            sellers[msg.sender].profileImgHash,
            sellers[msg.sender].profileCoverImgHash,
            sellers[msg.sender].bio
        );
    }

    /// @notice Get seller details
    /// @param _seller address of seller
    /// @return id Id of seller
    /// @return username username of person
    /// @return company name of seller
    /// @return imghash seller profile image ipfs hash
    /// @return coverhash usercCover image ipfs hash
    /// @return bio Biography of seller
    function getSeller(address _seller) public view returns (
            uint256 id,
            string memory username,
            string memory company,
            string memory imghash,
            string memory coverhash,
            string memory bio
        ) {
        return (
            sellers[_seller].id,
            sellers[_seller].username,
            sellers[_seller].company,
            sellers[_seller].profileImgHash,
            sellers[_seller].profileCoverImgHash,
            sellers[_seller].bio
        );
    }

    /// @notice Get seller address
    /// @param _username of seller
    /// @return seller Address of seller
    function getSellerAddress(string memory _username) public view returns (address seller) {
        return sellerAddressFromUsername[_username];
    }


    /*
     **************************************SNEAKER FUNCTIONS*************************************************************************
     */
    
    function addSneaker(address _sneaker, address _creator) public onlyOwner {
        totalSneakers = totalSneakers.add(1);
        uint256 _id = totalSneakers;
        bool _exists = true;
        sellerSneakers[_creator].push(_id);
        sneakers[_id] = Sneaker(
            _id,
            _sneaker,
            _creator,
            _exists
        );
        emit logSneakerCreated(_sneaker, _creator, _id);
    }

    /// @notice Get a Sneaker
    /// @param  _id Id of sneaker
    /// @return sneaker address of Sneaker
    /// @return  creator address of Sneaker seller
    function getSneaker(uint256 _id) public view checkSneakerExits(_id)
        returns (
            address sneaker,
            address creator
        ) {
        return (
            sneakers[_id].sneaker,
            sneakers[_id].creator
        );
    }

    /// @notice Get list of sneakers owner by seller
    /// @return sneakerList Array of sneaker ids
    function getSellerSneakers() public view returns(uint256[] memory sneakerList){
        return sellerSneakers[msg.sender];
    }
    
    /// @notice Get list of sneakers owned by seller
    /// @param _seller Seller address
    /// @return sneakerList Array of sneaker ids
    function getSellerSneakers(address _seller) public view returns(uint256[] memory sneakerList){
        return sellerSneakers[_seller];
    }
}
