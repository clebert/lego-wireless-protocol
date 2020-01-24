import {PortInputFormatIncomingMessage} from './types';

export function parsePortInputFormat(
  dataView: DataView
): PortInputFormatIncomingMessage {
  const portId = dataView.getUint8(0);
  const modeId = dataView.getUint8(1);
  const deltaInterval = dataView.getUint32(2, true);
  const notificationsEnabled = dataView.getUint8(6) === 1;

  return {
    messageType: 'PortInputFormat',
    portId,
    modeId,
    deltaInterval,
    notificationsEnabled
  };
}
