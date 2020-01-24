import {PortInputFormatSetupOutgoingMessage} from './types';

export function serializePortInputFormatSetup(
  message: PortInputFormatSetupOutgoingMessage
): Buffer {
  const {portId, modeId, deltaInterval, notificationsEnabled} = message;
  const data = Buffer.alloc(10);

  data.writeUInt8(data.length, 0);
  data.writeUInt8(0, 1);
  data.writeUInt8(0x41, 2);
  data.writeUInt8(portId, 3);
  data.writeUInt8(modeId, 4);
  data.writeUInt32LE(deltaInterval, 5);
  data.writeUInt8(notificationsEnabled ? 1 : 0, 9);

  return data;
}
