// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract BET is ERC20{

struct Betting {
     address player1;
     address player2;
     uint256 curBetamount;
     bool isCreated;
     bool isStarted;
}
event bettingCreate(
    address  creator,
    uint256  nftid,
    uint256  price,
    bool    isCreated
);
event bettingStart(
    address  creator,
    uint256  nftid,
    uint256  price,
    bool  isStarted
);

mapping(uint256=>uint256) prevOracle;
mapping(uint256=>Betting) BettingList;
mapping(uint256 => mapping(address => uint256)) collectionAmount;

 constructor(string memory name , string memory symbol) ERC20(name,symbol)  {}
 
    // params _oracleprice price of 1eth
    function doBetting(uint256 _nftId,uint256 _oraclePrice) public payable {
        require(_oraclePrice!=0,"oracle pricce must not be 0");
        require(BettingList[_nftId].isStarted == true,"can't do Betting");
        address _ply1 = BettingList[_nftId].player1;
        address _ply2 = BettingList[_nftId].player2;
        uint256 collect1 = collectionAmount[_nftId][_ply1];
        uint256 collect2 = collectionAmount[_nftId][_ply2];
        uint256 curBettingEth = BettingList[_nftId].curBetamount*prevOracle[_nftId]/_oraclePrice;    
        if(curBettingEth/collect1*100>60){
           uint256 x=(5*curBettingEth/2*collect1)/3;
           collacteral( _nftId ,  _ply1 , x);
        }

        if(curBettingEth/collect2*100>60){
            uint256 x=(5*curBettingEth/2*collect2)/3;
            collacteral( _nftId ,  _ply2 , x);
        }
        prevOracle[_nftId] = _oraclePrice;
    }

    function collacteral( uint256 _nftId , address _target , uint256 _amount) internal {
        require(collectionAmount[_nftId][_target]<_amount,"amount > collection amount");
        transfer(_target,_amount);
        collectionAmount[_nftId][_target] -= _amount;
        BettingList[_nftId].curBetamount -=_amount;
    }

    function startBetting(uint256 _nftid, uint256 _BettingPrice,uint256 oracleprice) public payable {
        require(BettingList[_nftid].isStarted==false,"cant start this Betting");
        require(msg.value>=_BettingPrice,"cant start Betting");
        if(BettingList[_nftid].isCreated == false){
            BettingList[_nftid].player1 = msg.sender;
            BettingList[_nftid].curBetamount = _BettingPrice;
            prevOracle[_nftid] = oracleprice;
            collectionAmount[_nftid][msg.sender]=msg.value;
            BettingList[_nftid].isCreated = true;
            emit bettingCreate(BettingList[_nftid].player1,_nftid,collectionAmount[_nftid][msg.sender],BettingList[_nftid].isCreated);
        }else{
            BettingList[_nftid].isStarted=true;
            BettingList[_nftid].player2 = msg.sender;
            collectionAmount[_nftid][msg.sender]=msg.value;
            emit bettingStart(BettingList[_nftid].player2,_nftid,collectionAmount[_nftid][msg.sender],BettingList[_nftid].isStarted);
        }
    }
}

