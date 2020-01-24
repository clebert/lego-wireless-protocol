import {PortModeInformationRequestOutgoingMessage} from './types';

export function serializePortModeInformationRequest(
  outgoingMessage: PortModeInformationRequestOutgoingMessage
): ArrayBuffer {
  const {portId, modeId, portModeInformationRequestType} = outgoingMessage;
  const data = new ArrayBuffer(6);
  const dataView = new DataView(data);

  dataView.setUint8(0, data.byteLength);
  dataView.setUint8(1, 0);
  dataView.setUint8(2, 0x22);
  dataView.setUint8(3, portId);
  dataView.setUint8(4, modeId);

  switch (portModeInformationRequestType) {
    case 'Name':
      dataView.setUint8(5, 0x00);
      break;
    case 'Raw':
      dataView.setUint8(5, 0x01);
      break;
    case 'Pct':
      dataView.setUint8(5, 0x02);
      break;
    case 'Si':
      dataView.setUint8(5, 0x03);
      break;
    case 'Symbol':
      dataView.setUint8(5, 0x04);
      break;
    case 'ValueFormat':
      dataView.setUint8(5, 0x80);
  }

  return data;
}
