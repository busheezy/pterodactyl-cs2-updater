import { MessageBuilder, Webhook } from 'webhook-discord';
import { env } from '../env';
import { PteroServer } from './ptero/ptero.types';

const hook = new Webhook(env.DISCORD_WEBHOOK_URL);

export async function successAlert(server: PteroServer) {
  const embed = new MessageBuilder()
    .setName('Ptero CS2 Updater')
    .setTitle(server.attributes.name)
    .setColor('#00FF00')
    .addField('Status', 'Success', true)
    .addField('Identifier', server.attributes.identifier)
    .addField('Node', server.attributes.node)
    .setURL(`${env.PTERO_URL}/server/${server.attributes.identifier}`)
    .setTime();

  await hook.send(embed);
}

export async function failureAlert(server: PteroServer, error: Error) {
  const embed = new MessageBuilder()
    .setName('Ptero CS2 Updater')
    .setTitle(server.attributes.name)
    .addField('Status', 'Failure', true)
    .setColor('#FF0000')
    .setDescription(error.message)
    .addField('Identifier', server.attributes.identifier)
    .addField('Node', server.attributes.node)
    .setURL(`${env.PTERO_URL}/server/${server.attributes.identifier}`)
    .setTime();

  await hook.send(embed);
}
