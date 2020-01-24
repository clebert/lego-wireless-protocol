import {PortModeInformationRequestOutgoingMessage} from './types';

export function serializePortModeInformationRequest(
  outgoingMessage: PortModeInformationRequestOutgoingMessage
): Buffer {
  const {portId, modeId, portModeInformationRequestType} = outgoingMessage;
  const data = Buffer.alloc(6);

  data.writeUInt8(data.length, 0);
  data.writeUInt8(0, 1);
  data.writeUInt8(0x22, 2);
  data.writeUInt8(portId, 3);
  data.writeUInt8(modeId, 4);

  switch (portModeInformationRequestType) {
    case 'Name':
      data.writeUInt8(0x00, 5);
      break;
    case 'Raw':
      data.writeUInt8(0x01, 5);
      break;
    case 'Pct':
      data.writeUInt8(0x02, 5);
      break;
    case 'Si':
      data.writeUInt8(0x03, 5);
      break;
    case 'Symbol':
      data.writeUInt8(0x04, 5);
      break;
    case 'ValueFormat':
      data.writeUInt8(0x80, 5);
  }

  return data;
}
