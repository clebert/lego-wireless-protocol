import {PortOutputCommandOutgoingMessage} from './types';

export function serializePortOutputCommand(
  outgoingMessage: PortOutputCommandOutgoingMessage
): ArrayBuffer {
  const {portId, portOutputSubCommandData} = outgoingMessage;
  const data = new ArrayBuffer(5 + portOutputSubCommandData.byteLength);
  const dataView = new DataView(data);

  dataView.setUint8(0, data.byteLength);
  dataView.setUint8(1, 0);
  dataView.setUint8(2, 0x81);
  dataView.setUint8(3, portId);
  dataView.setUint8(4, 0x10); // Execute immediately + No action

  new Uint8Array(data).set(new Uint8Array(portOutputSubCommandData), 5);

  return data;
}
