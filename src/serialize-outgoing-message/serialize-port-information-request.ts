import {PortInformationRequestOutgoingMessage} from './types';

export function serializePortInformationRequest(
  outgoingMessage: PortInformationRequestOutgoingMessage
): ArrayBuffer {
  const {portId, portInformationRequestType} = outgoingMessage;
  const outgoingMessageData = new ArrayBuffer(5);
  const outgoingMessageDataView = new DataView(outgoingMessageData);

  outgoingMessageDataView.setUint8(0, outgoingMessageData.byteLength);
  outgoingMessageDataView.setUint8(1, 0);
  outgoingMessageDataView.setUint8(2, 0x21);
  outgoingMessageDataView.setUint8(3, portId);

  outgoingMessageDataView.setUint8(
    4,
    portInformationRequestType === 'PortValue' ? 0 : 1
  );

  return outgoingMessageData;
}
