const hre = require("hardhat");

async function main() {
  const OurToken = await hre.ethers.getContractFactory("OurToken");
  const ourToken = await OurToken.deploy(100000000, 50);

  await ourToken.deployed();

  console.log("Our Token deployed: ", ourToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});