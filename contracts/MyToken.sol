pragma solidity 0.4.24;

import "./IERC20.sol";


/**
 * @title MyToken
 * @dev 
 */
contract MyToken is IERC20 {

  string public constant name = "Foo"; // solium-disable-line uppercase, max-len
  // string public constant symbol = "BAR"; // solium-disable-line uppercase 
  uint8 public constant decimals = 3; // solium-disable-line uppercase

  // 1M tokens + 18 decimals
  uint256 public constant INITIAL_SUPPLY = 1 * (10 ** 6) * (10 ** uint256(decimals)); // solium-disable-line max-len

  /**
   * @dev Constructor that gives msg.sender all of existing tokens.
   */
  constructor () public {
    // balances[msg.sender] = INITIAL_SUPPLY;
    // emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
  }

  function totalSupply() external view returns (uint256){
    return INITIAL_SUPPLY;
  }

}
