import * as path from 'node:path';
import { promises as fs } from 'node:fs';

const cachePath = path.join(__dirname, '..', 'cache.json');

type LastUpdateCache = Record<string, Date | undefined>;

export async function ensureCacheFileExists() {
  try {
    await fs.access(cachePath);
  } catch {
    await fs.writeFile(cachePath, JSON.stringify({}));
  }
}

export async function getLastUpdate(identifier: string) {
  const cacheJson = await fs.readFile(cachePath, 'utf-8');
  const cache = JSON.parse(cacheJson) as LastUpdateCache;
  return cache[identifier];
}

export async function setLastUpdateNow(identifier: string) {
  const cacheJson = await fs.readFile(cachePath, 'utf-8');
  const cache = JSON.parse(cacheJson) as LastUpdateCache;
  cache[identifier] = new Date();
  await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
}
