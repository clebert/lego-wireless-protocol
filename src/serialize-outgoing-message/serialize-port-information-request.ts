import {PortInformationRequestOutgoingMessage} from './types';

export function serializePortInformationRequest(
  outgoingMessage: PortInformationRequestOutgoingMessage
): Buffer {
  const {portId, portInformationRequestType} = outgoingMessage;
  const data = Buffer.alloc(5);

  data.writeUInt8(data.length, 0);
  data.writeUInt8(0, 1);
  data.writeUInt8(0x21, 2);
  data.writeUInt8(portId, 3);
  data.writeUInt8(portInformationRequestType === 'PortValue' ? 0 : 1, 4);

  return data;
}
