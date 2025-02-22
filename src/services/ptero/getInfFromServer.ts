import axios from 'axios';
import { pteroClient } from './client';
import { PteroServer } from './ptero.types';

export async function getInfFromServer(server: PteroServer): Promise<string | null> {
  const { identifier } = server.attributes;

  try {
    const { data } = await pteroClient.get<string>(
      `/servers/${identifier}/files/contents?file=/game/csgo/steam.inf`,
    );

    return data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    if (error.response?.status === 500) {
      return null;
    }

    throw error;
  }
}
