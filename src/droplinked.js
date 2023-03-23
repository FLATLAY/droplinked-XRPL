import xrpl from 'xrpl';
import dotenv from 'dotenv';
import { createAccount, getWalletFromSeed } from './accounts.js';
import { NETWORK } from './constants/network.constant.js';
import { storeMetadata } from './utilities/ipfs-metadata.js';
import { NFTMetadata } from './Entities/nft-metadata.entity.js';

dotenv.config({ path: '../.env' });

const mint = async (client, wallet, { tokenURI }) => {
  const transactionBlob = {
    TransactionType: 'NFTokenMint',
    Account: wallet.classicAddress,
    URI: tokenURI,
    Flags: 8,
    TransferFee: 1000,
    NFTokenTaxon: 0,
  };

  const transaction = await client.submitAndWait(transactionBlob, {
    wallet,
  });

  return transaction;
};

const getNFTs = async (client, wallet) => {
  const nfts = await client.request({
    method: 'account_nfts',
    account: wallet.classicAddress,
  });

  return nfts;
};

const main = async () => {
  const client = new xrpl.Client(NETWORK.TEST_NET);
  await client.connect();

  const account = await createAccount(client);
  // const wallet = await getWalletFromSeed('sEdTkL6XSoMFPy55JXnuEBXTex1i6A4');

  const metadata = new NFTMetadata(
    'Nike Air Force 1',
    'Nike Air Force 1 tripple white .',
    '../statics/test-images/air-force-1.png',
    [
      {
        display_type: 'string',
        trait_type: '',
        value: '',
      },
    ],
    { total_supply: 1000 },
    { uri: null, locales: ['en'], default: 'en' },
  );

  const storingResult = await storeMetadata(metadata);

  const mintResult = await mint(client, account.wallet, {
    tokenURI: xrpl.convertStringToHex(storingResult.url),
  });

  const nfts = await getNFTs(client, account.wallet);

  client.disconnect();
};

main();
