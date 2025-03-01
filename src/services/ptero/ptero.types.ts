export interface PteroServerResponse {
  data: PteroServer[];
}

export interface PteroServer {
  attributes: ServerAttributes;
}

export type ServerStatus =
  | 'installing'
  | 'install_failed'
  | 'reinstall_failed'
  | 'suspended'
  | 'restoring_backup'
  | null;

export interface ServerAttributes {
  server_owner: boolean;
  identifier: string;
  uuid: string;
  name: string;
  node: string;
  invocation: string;
  sftp_details: SftpDetails;
  description: string;
  status: ServerStatus;
}

export interface SftpDetails {
  ip: string;
  port: number;
}
