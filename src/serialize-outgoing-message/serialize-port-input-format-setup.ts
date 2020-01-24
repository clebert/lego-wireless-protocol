import {PortInputFormatSetupOutgoingMessage} from './types';

export function serializePortInputFormatSetup(
  outgoingMessage: PortInputFormatSetupOutgoingMessage
): ArrayBuffer {
  const {portId, modeId, deltaInterval, notificationsEnabled} = outgoingMessage;
  const outgoingMessageData = new ArrayBuffer(10);
  const outgoingMessageDataView = new DataView(outgoingMessageData);

  outgoingMessageDataView.setUint8(0, outgoingMessageData.byteLength);
  outgoingMessageDataView.setUint8(1, 0);
  outgoingMessageDataView.setUint8(2, 0x41);
  outgoingMessageDataView.setUint8(3, portId);
  outgoingMessageDataView.setUint8(4, modeId);
  outgoingMessageDataView.setUint32(5, deltaInterval, true);
  outgoingMessageDataView.setUint8(9, notificationsEnabled ? 1 : 0);

  return outgoingMessageData;
}
