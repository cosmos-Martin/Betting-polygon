
const { expect } = require("chai");
const { ethers , waffle } = require("hardhat");

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
    let provider = ethers.getDefaultProvider();
    const balance1 = await provider.getBalance(player1.address);
    const balance2 = await provider.getBalance(player2.address);
    // console.log(balance.toString()); // prints 100000000000... 18 zeros

    // to format the value in a readable format
    console.log("player1 balance first",ethers.utils.formatEther(balance1)); // prints 1.0
    console.log("player2 balance first",ethers.utils.formatEther(balance2)); // prints 1.0
    let bettingPrice = ethers.utils.parseEther("90");
    let player1price = ethers.utils.parseEther("130");
    let player2price = ethers.utils.parseEther("300");

    await bettingContract.connect(player1).startBetting(1,bettingPrice,1000,{value:player1price});
    await bettingContract.connect(player2).startBetting(1,bettingPrice,1000,{value:player2price});
    
  });
 
  // it("create vetting",async function(){

    
  //   // await expect(bettingContract.connect(player1).startBetting(1,bettingPrice,{value:player1price})).to.emit(bettingContract, "bettingStart").withArgs(player1.address,1,player1price, true);
  //   // await expect(bettingContract.connect(player1).startBetting(1,bettingPrice,{value:player1price}));
  //    //await expect(bettingContract.connect(player2).startBetting(1,bettingPrice,{value:player2price}));
    
    
  // })

  it("do vetting",async function(){
    let bettingPrice = ethers.utils.parseEther("90");
    let player1price = ethers.utils.parseEther("330");
    let player2price = ethers.utils.parseEther("400");
    // player1balance =await player1.getBalance();
    let provider = ethers.getDefaultProvider();
    const balance1 = await provider.getBalance(player1.address);
    const balance2 = await provider.getBalance(player2.address);
    // console.log(balance.toString()); // prints 100000000000... 18 zeros

    // to format the value in a readable format
    console.log("player1 balance before",ethers.utils.formatEther(balance1)); // prints 1.0
    console.log("player2 balance before",ethers.utils.formatEther(balance2)); // prints 1.0
    
    await bettingContract.doBetting(1,400);

     balance1 = await provider.getBalance(player1.address);
     balance2 = await provider.getBalance(player2.address);
    // console.log(balance.toString()); // prints 100000000000... 18 zeros

    // to format the value in a readable format
    console.log("player1 balance after",ethers.utils.formatEther(balance1)); // prints 1.0
    console.log("player2 balance after",ethers.utils.formatEther(balance2)); // prints 1.0
    
    // await bettingContract.connect(player1).startBetting(1,bettingPrice,{value:player1price});
   // await bettingContract.connect(player2).startBetting(1,bettingPrice,{value:player2price});
  })

});

