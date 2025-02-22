export function getServerVersionFromInf(steamInf: string) {
  const serverVersionRegex = /PatchVersion=([^=\n]+)/;

  const [, version] = steamInf.match(serverVersionRegex) ?? [];

  if (!version) {
    throw new Error('Could not find server version');
  }

  return version.trim();
}
