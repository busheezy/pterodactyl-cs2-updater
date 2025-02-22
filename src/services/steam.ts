import axios from 'axios';

export interface UpToDateCheck {
  response: UpToDateCheckResponse;
}

export interface UpToDateCheckResponse {
  success: boolean;
  up_to_date: boolean;
  version_is_listable: boolean;
  required_version: number;
  message: string;
}

const serverVersionRegex = /([0-9.]+)/;

export async function getLatestCs2Version(): Promise<string> {
  const { data } = await axios.get<UpToDateCheck>(
    'http://api.steampowered.com/ISteamApps/UpToDateCheck/v0001?version=1&format=json&appid=730',
  );

  const { message } = data.response;

  const [, serverVersion] = message.match(serverVersionRegex) ?? [];

  if (!serverVersion) {
    throw new Error('Could not find patch version');
  }

  return serverVersion;
}
