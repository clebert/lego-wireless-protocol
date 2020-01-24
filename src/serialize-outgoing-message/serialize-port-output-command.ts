import {PortOutputCommandOutgoingMessage} from './types';

export function serializePortOutputCommand(
  outgoingMessage: PortOutputCommandOutgoingMessage
): ArrayBuffer {
  const {portId, portOutputSubCommandData} = outgoingMessage;

  const outgoingMessageData = new ArrayBuffer(
    5 + portOutputSubCommandData.byteLength
  );

  const outgoingMessageDataView = new DataView(outgoingMessageData);

  outgoingMessageDataView.setUint8(0, outgoingMessageData.byteLength);
  outgoingMessageDataView.setUint8(1, 0);
  outgoingMessageDataView.setUint8(2, 0x81);
  outgoingMessageDataView.setUint8(3, portId);
  outgoingMessageDataView.setUint8(4, 0x10); // Execute immediately + No action

  new Uint8Array(outgoingMessageData).set(
    new Uint8Array(portOutputSubCommandData),
    5
  );

  return outgoingMessageData;
}
