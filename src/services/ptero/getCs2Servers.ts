import { pteroClient } from './client';
import { PteroServerResponse } from './ptero.types';

export async function getCs2Servers() {
  const {
    data: { data: servers },
  } = await pteroClient.get<PteroServerResponse>('/');

  const filteredServers = servers.filter((server) => {
    if (!server.attributes.invocation.startsWith('./game/cs2.sh')) {
      return false;
    }

    if (server.attributes.is_installing) {
      return false;
    }

    if (server.attributes.is_suspended) {
      return false;
    }

    return true;
  });

  return filteredServers;
}
