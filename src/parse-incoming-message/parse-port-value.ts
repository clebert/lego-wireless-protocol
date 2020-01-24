import {PortValueIncomingMessage} from './types';

export function parsePortValue(data: Buffer): PortValueIncomingMessage {
  const portId = data.readUInt8(0);

  return {messageType: 'PortValue', portId, valueData: data.slice(1)};
}
