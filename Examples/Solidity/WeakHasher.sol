// SPDX-License-Identifier: CC-BY-SA-4.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Example of weak hash implementation
 * @dev Look at https://docs.soliditylang.org/en/develop/natspec-format.html
 */
contract WeakHasher {
    /// @notice The divisor of the modulo operation
    uint8 public constant m = 249;
    /// @notice A constant used as an addend for the hashing
    uint8 public constant v = 4;
    /// @notice A counter of the number of received hashing requests
    uint public count = 0;

    /**
     * @notice Applies the hash
     * @param k An unsigned integer used as the key
     * @return h A byte containing the hash of the provided key
     */
    function hashIt(uint k) public returns (bytes1 h) {
        count++;
        // Record the current step of the computation
        uint8 q = modIt(k);
        uint8 s = sumIt(q);
        return bytes1(s);
    }

    /**
     * @notice Applies the modulo operation, utilising `mod` as the divisor
     * @param k An unsigned integer used as the key
     * @return h The result of the modulo operation
     */
    function modIt(uint k) pure public returns (uint8) {
        return uint8(k % m);
    }

    /**
     * @notice Applies the sum operation, using `v` as the addend
     * @param w An unsigned integer
     * @return h The result of the summation
     */
    function sumIt(uint8 w) pure public returns (uint8) {
        return uint8(v + w);
    }
}
