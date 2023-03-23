import xrpl from 'xrpl';

export const createAccount = async (client) => {
  const wallet = await client.fundWallet(null, {
    amount: '1000',
    faucetHost: null,
  });

  return wallet;
};

export const getWalletFromSeed = async (seed) => {
  const wallet = xrpl.Wallet.fromSeed(seed);

  return wallet;
};
