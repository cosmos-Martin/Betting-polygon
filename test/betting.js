const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("betting contract", async () => {
  let bettingContract;
  let owner,player1,player2;
  beforeEach(async () => {
    const bettingToken = await ethers.getContractFactory("BET");
    [owner,player1,player2] = await ethers.getSigners();  
     bettingContract = await bettingToken.deploy("bettingToken","BT");
     bettingContract = await bettingContract.deployed();
    console.log("contract address-----------",bettingContract.address);
    console.log("deployer address----------",owner.address);
    console.log("player1 address----------",player1.address);
    console.log("player2 address----------",player2.address);
  });

  it("create vetting",async function(){
    let bettingPrice = ethers.utils.parseEther("90");
    let player1price = ethers.utils.parseEther("130");
    let player2price = ethers.utils.parseEther("300");

    await expect(bettingContract.connect(player1).startBetting(1,bettingPrice,{value:player1price}))
    .to.emit(bettingContract, "bettingStart")
    .withArgs(player1.address,1,player1price, true);
    // await expect(bettingContract.connect(player2).startBetting(1,bettingPrice,{value:player2price}));
  })

  // it("do vetting",async function(){
  //   let bettingPrice = ethers.utils.parseEther("90");
  //   let player1price = ethers.utils.parseEther("130");
  //   let player2price = ethers.utils.parseEther("300");
  //   await expect(bettingContract.connect(player1).startBetting(1,bettingPrice,{value:player1price}))
  //   .to.emit(bettingContract, "bettingStart").withArgs(player1.address,1,player1price, true);
  //   await expect(bettingContract.connect(player2).startBetting(1,bettingPrice,{value:player2price}));
  // })

});

