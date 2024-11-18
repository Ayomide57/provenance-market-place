// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {RwaToken} from "./RwaToken.sol";
import {Auction} from "./Auction.sol";

contract Registrar {
    error ErrorAssetNotFound();
    error ErrorUnauthorize();
    error ErrorNewPriceShouldBeHigher();

    //Only registra can mint a Nft Property Token
    uint256 public immutable PROPERTY_TOKEN = 1000;
    uint256 public BID_DURATION = 4 weeks ;
    address public owner;
    address public pmpToken;


    struct Asset {
        bool verified;
        bool existed;
        address p_owner; // Address of the current property owner
        address nftAddress; // The new depoyed property nft smart contract address
        uint256 property_RegId; // property registration number
        uint256 value; // property market value
        string document_url; // property uploaded url link
        uint256 auctionEndTime; // action End time
    }

    // Mapping to store asset details by owner address and property registration ID
    mapping(address => mapping( uint256 => Asset))
        public assets;
    

    // Event to log asset transfer
    event EventAssetTransferred(
        address indexed previousOwner,
        address indexed newOwner,
        address nftAddress,
        uint256 indexed property_RegId
    );
    event EventAssetVerified(
        address indexed p_owner,
        address nftAddress,
        uint256 indexed property_RegId,
        uint256 indexed value,
        string document_url,
        bool verified
    );
    event EventAssetVerificationRequest(
        address indexed p_owner,
        uint256 indexed property_RegId
    );

    event EventInitiatedBid(
        address indexed _p_owner,
        uint256 indexed _property_RegId,
        uint256 _auctionEndTime,
        Auction indexed auction
    );


    // modifiers
    modifier assetNotFound(address _p_owner, uint256 _property_RegId) {
        if(!assets[_p_owner][_property_RegId].existed) revert ErrorAssetNotFound();
        _;
    }

    modifier onlyOwner() {
        if(msg.sender != owner) revert ErrorUnauthorize();
        _;
    }


    modifier onlyPropertyOwner(address _p_owner, uint256 _property_RegId) {
        if(assets[_p_owner][_property_RegId].p_owner != msg.sender) revert ErrorUnauthorize();
        _;
    }


    constructor(address _pmpToken){
        owner = msg.sender;
        pmpToken = _pmpToken;
    }

    function generateRwa(
        address _p_owner,
        uint256 _property_RegId,
        uint256 _price
    )
        public
        onlyOwner
        assetNotFound(_p_owner, _property_RegId)
        returns (bool)
    {
        RwaToken _newRwaToken = new RwaToken( _p_owner, _price/PROPERTY_TOKEN, assets[_p_owner][_property_RegId].document_url);
        assets[_p_owner][_property_RegId].nftAddress = address(_newRwaToken);
        assets[_p_owner][_property_RegId].value = _price;
        assets[_p_owner][_property_RegId].verified = true;
        assets[_p_owner][_property_RegId].property_RegId = _property_RegId;
        // Emit event
        emit EventAssetVerified(
            _p_owner,
            address(_newRwaToken),
            assets[_p_owner][_property_RegId].property_RegId,
            _price,
            assets[_p_owner][_property_RegId].document_url,
            true
        );
        return true;
    }

    function createNewRwa(
        address _p_owner,
        uint256 _property_RegId,
        uint256 _price,
        string memory _document_url
    ) public onlyOwner returns (bool) {
        RwaToken _newRwaToken = new RwaToken( _p_owner, _price/PROPERTY_TOKEN, _document_url);
        assets[_p_owner][_property_RegId] = Asset(true, true, _p_owner, address(_newRwaToken), _property_RegId, _price, _document_url, 0);
        emit EventAssetVerified(
            _p_owner,
            address(_newRwaToken),
            _property_RegId,
            _price,
            _document_url,
            true
        );
        return true;
    }
// add sold property 
    function transferAsset(
        address nftAddress,
        address _new_owner,
        uint256 _property_RegId,
        uint256 _price // multiply token by PROPERTY_TOKEN = 1000
    ) public onlyPropertyOwner(msg.sender, _property_RegId) returns (bool) {
        if(_price <= assets[msg.sender][_property_RegId].value) revert ErrorNewPriceShouldBeHigher();
        assets[msg.sender][_property_RegId].p_owner = _new_owner;
        assets[_new_owner][_property_RegId] = Asset(true, true, _new_owner, nftAddress, _property_RegId, _price, assets[msg.sender][_property_RegId].document_url, 0);
        emit EventAssetVerified(_new_owner, address(nftAddress), _property_RegId, _price, assets[msg.sender][_property_RegId].document_url, true);
        emit EventAssetTransferred(msg.sender, nftAddress, _new_owner, _property_RegId);
        return true;
    }

    function verification_request(
        address _p_owner,
        uint256 _property_RegId,
        string memory _document_url
    ) external returns (bool) {
        assets[_p_owner][_property_RegId] = Asset(
            false,
            true,
            _p_owner,
            address(0),
            _property_RegId,
            0,
            _document_url,
            0
        );
        emit EventAssetVerificationRequest(
            _p_owner,
            _property_RegId
        );
        return true;
    }
    
// Initiate New Auction Contract every time user initiate a bid 

    function initiateBid(
       uint256 _property_RegId //_property_RegId
    ) onlyPropertyOwner(msg.sender, _property_RegId) public returns(bool){
        uint256 _bid_duration = block.timestamp + BID_DURATION; 
        uint starting_bid = assets[msg.sender][_property_RegId].value / PROPERTY_TOKEN;
        Auction auction = new Auction(msg.sender, _bid_duration, starting_bid, pmpToken);
        assets[msg.sender][_property_RegId].auctionEndTime = _bid_duration;
        emit EventInitiatedBid(msg.sender, _property_RegId, _bid_duration, auction);
        return true;
    }

}