import Bluebird from 'bluebird';
import { getInfFromServer } from './services/ptero/getInfFromServer';
import { restartServer } from './services/ptero/restartServer';
import { getLatestCs2Version } from './services/steam';
import { getServerVersionFromInf } from './utils/getServerVersionFromInf';
import { isServerVersionNewer } from './utils/isServerVersionNewer';
import { failureAlert, successAlert } from './services/discord';
import { getCs2Servers } from './services/ptero/getCs2Servers';
import { ensureCacheFileExists, getLastUpdate, setLastUpdateNow } from './lastUpdateCache';
import { differenceInMinutes } from 'date-fns';

async function run() {
  await ensureCacheFileExists();

  const latestCs2Version = await getLatestCs2Version();
  const servers = await getCs2Servers();

  await Bluebird.mapSeries(servers, async (server) => {
    try {
      const lastUpdated = await getLastUpdate(server.attributes.identifier);

      if (lastUpdated && differenceInMinutes(new Date(), lastUpdated) < 30) {
        return;
      }

      const serverInf = await getInfFromServer(server);

      if (serverInf === null) {
        return;
      }

      const infServerVersion = getServerVersionFromInf(serverInf);

      if (isServerVersionNewer(latestCs2Version, infServerVersion)) {
        await restartServer(server);
        await setLastUpdateNow(server.attributes.identifier);
        await successAlert(server);
      }
    } catch (error) {
      console.error(`Error checking server ${server.attributes.name}`);
      console.error(error);

      if (error instanceof Error) {
        await failureAlert(server, error);
      }
    }
  });
}

run().catch(console.error);
