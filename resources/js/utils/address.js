import { getAddress, isAddress } from "@ethersproject/address";

export function isValidAddress(address) {
    // Need to catch because ethers' isAddress throws in some cases (bad checksum)
    try {
        const isValid = address && isAddress(address);
        return !!isValid;
    } catch (error) {
        return false;
    }
}

export function validateAddress(address, context) {
    if (!address || !isAddress(address)) {
        const errorMsg = `Invalid addresses for ${context}: ${address}`;

        throw new Error(errorMsg);
    }
}

export function normalizeAddress(address) {
    validateAddress(address, "normalize");
    return getAddress(address);
}

export function shortenAddress(address, elipsis, capitalize) {
    if (address == undefined) {
        return null;
    }
    validateAddress(address, "shorten");
    const shortened =
        normalizeAddress(address).substr(0, 8) + (elipsis ? "..." : "");
    return capitalize ? capitalizeAddress(shortened) : shortened;
}

export function capitalizeAddress(address) {
    return "0x" + address.substring(2).toUpperCase();
}

export function areAddressesEqual(a1, a2) {
    validateAddress(a1, "compare");
    validateAddress(a2, "compare");
    return getAddress(a1) === getAddress(a2);
}

export function trimLeading0x(input) {
    return input.startsWith("0x") ? input.substring(2) : input;
}

export function ensureLeading0x(input) {
    return input.startsWith("0x") ? input : `0x${input}`;
}
