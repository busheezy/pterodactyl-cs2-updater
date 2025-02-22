import { pteroClient } from './client';
import { PteroServer } from './ptero.types';

export async function restartServer(server: PteroServer) {
  try {
    await pteroClient.post(`/servers/${server.attributes.identifier}/power`, {
      signal: 'restart',
    });
  } catch (error) {
    console.error(`Error restarting server ${server.attributes.name}`);
    console.error(error);
  }
}
