# Droplinked-XRPL

## Introduction

The droplinked protocol registers products on-chain in order to enable 3rd party publishers using these registered item listings to sell across any marketplace, dapp or native site to earn commission with immutable attribution. We compliment this infrastrucure with headless tooling that enables NFT gated shops that can be used droplinked.com or any other 3rd party marketplace, dapp or retail property (site or app) with the protocol and low-code tools/libraries. 

droplinkeds' contract implements base functionalities that leverage ethereum's ERC-1155 standard. The plan is to leverage an XRPL EVM compatible sidechain to provide the mechanisms that automate affiliate sales tracking & autonomous rewards association enabling producers and publishers to compensate one another. This contract implements SFT tokens (Semi-Fungible Token), which have both uniqueness and value. For example, a producer wants to mint 1M NFTs of the same product (each product has an nft which describes who owns the item); by minting 1M NFT's in a standard such as an ERC-721 is not cost effective (storing 1M ID's and owner address will cost a lot of gas); so instead of minting them one by one, we mint a base token (which contains the ID), and hold that id alongside the number of tokens that a particular account owns.

This way, we only store a single token ID (which represents the product), and a single number (which represents how many of these token ID's a person owns) for each particular account.

On droplinked, a publisher can send a publish request to the producer with a particular pre-defined commission amount. The producer can accept or reject requests and if a request is accepted, the publisher is then given the ability to publish the product that is shared with consumers to earn their entitled settlement portion of a sales commission.

## Contract Entities

Here we discuss entities used:

1. [NFTMetadata](https://github.com/FLATLAY/droplinked-ripple/blob/main/src/entities/nft-metadata.entity.js) : this entity holds the metadata of a non-fungible token. It contains name, description, image, attributes, properties ( like checksum, price, supply_amount and ... ) and localization data.

2. [NFTHolder](https://github.com/FLATLAY/droplinked-ripple/blob/main/src/entities/nft-holder.entity.js) : this struct holds the token ID and its amount for a specific account. remaining_amount is the amount left which is not published for a publisher.

3. [NFTPublishRequest](https://github.com/FLATLAY/droplinked-ripple/blob/main/src/entities/nft-publish-request.entity.js) : this struct holds the request of a publisher to a producer to publish a token. It has a holder_id, amount, a publisher address, a producer address, and commission. this struct will be saved in a dictionary which maps a request_id to a PublishRequest.

4. [NFTApproved](https://github.com/FLATLAY/droplinked-ripple/blob/main/src/entities/nft-approved.entity.js) : this struct holds the data of the approved tokens (for publishers), it has a holder_id, amount, owner and publisher account address, the token_id, and the amount of commission. After approving a PublishRequest by a producer, it will be saved in a dictionary which maps every approved_id to this object.

## Methods

Here we explain each method in the contract and how they are leveraged ( some of the methods functionalies will be updated and other methods will be added ):

1. [**Mint**](https://github.com/FLATLAY/droplinked-ripple/blob/main/src/droplinked.js) : gets (`client`, `wallet`, `tokenURI`) and mints the token to `caller`'s account.

# Project Feautures

## NFT Gating system

Producers can add a set of rules in order to sell their token representation of items. They can limit the buyer accounts which have bought several other tokens by the producer (gating), or they can provide tiered discounts to the holders.

## NFT Storefront

droplinked.com provides a storefront in wich the producers can upload their NFTs and set their prices and rulesets, while customers can explore the NFTs and buy them. These NFT's represent both digital and physical goods.
