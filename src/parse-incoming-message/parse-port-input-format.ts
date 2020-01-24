import {PortInputFormatIncomingMessage} from './types';

export function parsePortInputFormat(
  data: Buffer
): PortInputFormatIncomingMessage {
  const portId = data.readUInt8(0);
  const modeId = data.readUInt8(1);
  const deltaInterval = data.readUInt32LE(2);
  const notificationsEnabled = data.readUInt8(6) === 1;

  return {
    messageType: 'PortInputFormat',
    portId,
    modeId,
    deltaInterval,
    notificationsEnabled
  };
}
