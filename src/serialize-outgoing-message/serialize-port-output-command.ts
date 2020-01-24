import {PortOutputCommandOutgoingMessage} from './types';

export function serializePortOutputCommand(
  outgoingMessage: PortOutputCommandOutgoingMessage
): Buffer {
  const {portId, portOutputSubCommandData} = outgoingMessage;
  const data = Buffer.alloc(5 + portOutputSubCommandData.length);

  data.writeUInt8(data.length, 0);
  data.writeUInt8(0, 1);
  data.writeUInt8(0x81, 2);
  data.writeUInt8(portId, 3);
  data.writeUInt8(0x10, 4); // Execute immediately + No action
  portOutputSubCommandData.copy(data, 5);

  return data;
}
