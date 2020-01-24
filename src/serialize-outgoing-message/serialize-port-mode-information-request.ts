import {PortModeInformationRequestOutgoingMessage} from './types';

export function serializePortModeInformationRequest(
  outgoingMessage: PortModeInformationRequestOutgoingMessage
): ArrayBuffer {
  const {portId, modeId, portModeInformationRequestType} = outgoingMessage;
  const outgoingMessageData = new ArrayBuffer(6);
  const outgoingMessageDataView = new DataView(outgoingMessageData);

  outgoingMessageDataView.setUint8(0, outgoingMessageData.byteLength);
  outgoingMessageDataView.setUint8(1, 0);
  outgoingMessageDataView.setUint8(2, 0x22);
  outgoingMessageDataView.setUint8(3, portId);
  outgoingMessageDataView.setUint8(4, modeId);

  switch (portModeInformationRequestType) {
    case 'Name':
      outgoingMessageDataView.setUint8(5, 0x00);
      break;
    case 'Raw':
      outgoingMessageDataView.setUint8(5, 0x01);
      break;
    case 'Pct':
      outgoingMessageDataView.setUint8(5, 0x02);
      break;
    case 'Si':
      outgoingMessageDataView.setUint8(5, 0x03);
      break;
    case 'Symbol':
      outgoingMessageDataView.setUint8(5, 0x04);
      break;
    case 'ValueFormat':
      outgoingMessageDataView.setUint8(5, 0x80);
  }

  return outgoingMessageData;
}
