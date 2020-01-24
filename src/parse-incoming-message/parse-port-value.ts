import {PortValueIncomingMessage} from './types';

export function parsePortValue(dataView: DataView): PortValueIncomingMessage {
  const portId = dataView.getUint8(0);

  return {
    messageType: 'PortValue',
    portId,
    valueData: dataView.buffer.slice(1)
  };
}
