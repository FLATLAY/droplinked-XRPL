import { NFTStorage, File } from 'nft.storage';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

export const storeMetadata = async (metadata) => {
  const image = await fileFromPath(metadata.image);
  const storage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

  return storage.store({
    name: metadata.name,
    attributes: metadata.attributes,
    description: metadata.description,
    properties: metadata.properties,
    localization: metadata.localization,
    image,
  });
};

export const fileFromPath = async (filePath) => {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);

  return new File([content], path.basename(filePath), { type });
};
