import {PortInputFormatSetupOutgoingMessage} from './types';

export function serializePortInputFormatSetup(
  outgoingMessage: PortInputFormatSetupOutgoingMessage
): ArrayBuffer {
  const {portId, modeId, deltaInterval, notificationsEnabled} = outgoingMessage;
  const data = new ArrayBuffer(10);
  const dataView = new DataView(data);

  dataView.setUint8(0, data.byteLength);
  dataView.setUint8(1, 0);
  dataView.setUint8(2, 0x41);
  dataView.setUint8(3, portId);
  dataView.setUint8(4, modeId);
  dataView.setUint32(5, deltaInterval, true);
  dataView.setUint8(9, notificationsEnabled ? 1 : 0);

  return data;
}
