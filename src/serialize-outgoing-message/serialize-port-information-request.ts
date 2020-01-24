import {PortInformationRequestOutgoingMessage} from './types';

export function serializePortInformationRequest(
  outgoingMessage: PortInformationRequestOutgoingMessage
): ArrayBuffer {
  const {portId, portInformationRequestType} = outgoingMessage;
  const data = new ArrayBuffer(5);
  const dataView = new DataView(data);

  dataView.setUint8(0, data.byteLength);
  dataView.setUint8(1, 0);
  dataView.setUint8(2, 0x21);
  dataView.setUint8(3, portId);
  dataView.setUint8(4, portInformationRequestType === 'PortValue' ? 0 : 1);

  return data;
}
