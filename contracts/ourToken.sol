// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract OurToken is ERC20Capped, ERC20Burnable {
    address payable public owner;
    uint256 public blockReward;
//Set the block reward when contract is deployed
    constructor(
        uint256 cap,
        uint256 reward
    ) ERC20("OurToken", "OCT") ERC20Capped(cap * (10 ** decimals())) {
        owner = payable(msg.sender);
        _mint(owner, 10000000 * (10 ** decimals()));
        blockReward = reward * (10 ** decimals());
    }

    function _mint(
        address account,
        uint256 amount
    ) internal virtual override(ERC20Capped, ERC20) {
        require(
            ERC20.totalSupply() + amount <= cap(),
            "ERC20Capped: cap exceeded"
        );
        super._mint(account, amount);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, blockReward);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 value
    ) internal virtual override onlyOwner {
        if (
            from != address(0) &&
            to != block.coinbase &&
            block.coinbase != address(0)
        ) {
            _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, value);
    }

    function setBlockReward(uint256 reward) public onlyOwner {
        blockReward = reward * (10 ** decimals());
    }

    function destroy() public onlyOwner {
        selfdestruct(owner);
    }

    function withdrawToken(address _tokenContract, uint256 _amount) external onlyOwner {
        OurToken tokenContract = OurToken(_tokenContract);
        tokenContract.transfer(msg.sender, _amount);
    }

//     contract Receiver {
//     event ValueReceived(address user, uint amount);
//     function() external payable {
//         emit ValueReceived(msg.sender, msg.value);
//     }
// }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    //  event Transfer(address indexed from, address indexed to, uint tokens);

   
   
    // function recieve() public {

    // }
}

