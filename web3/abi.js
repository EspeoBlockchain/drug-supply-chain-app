export const abi = [
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x715018a6"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_vendor",
        "type": "address"
      }
    ],
    "name": "deregisterVendor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x77916c01"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8f32d59b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_vendor",
        "type": "address"
      }
    ],
    "name": "registerVendor",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa6fea6f4"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_vendor",
        "type": "address"
      }
    ],
    "name": "isVendor",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xee54d54f"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf2fde38b"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event",
    "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_drugItemId",
        "type": "bytes32"
      }
    ],
    "name": "getDrugItem",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x58200c3b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_drugItemId",
        "type": "bytes32"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_participantCategory",
        "type": "uint8"
      }
    ],
    "name": "registerInitialHandover",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x3b81238b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_drugItemId",
        "type": "bytes32"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_participantCategory",
        "type": "uint8"
      },
      {
        "name": "_temperature",
        "type": "int8"
      },
      {
        "name": "_transitCategory",
        "type": "uint8"
      }
    ],
    "name": "registerHandover",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xbc41ef05"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_drugItemId",
        "type": "bytes32"
      }
    ],
    "name": "isPurchasable",
    "outputs": [
      {
        "name": "",
        "type": "uint8[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x02ffc812"
  }
]