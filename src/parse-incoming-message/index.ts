import {parseError} from './parse-error';
import {parseHubAttachedIo} from './parse-hub-attached-io';
import {parsePortInformation} from './parse-port-information';
import {parsePortInputFormat} from './parse-port-input-format';
import {parsePortModeInformation} from './parse-port-mode-information';
import {parsePortValue} from './parse-port-value';
import {IncomingMessage} from './types';

export * from './types';

export function parseIncomingMessage(
  incomingMessageData: ArrayBuffer
): IncomingMessage {
  const incomingMessageDataView = new DataView(incomingMessageData);
  const messageTypeOffset = incomingMessageDataView.getUint8(0) > 127 ? 3 : 2;
  const messageTypeId = incomingMessageDataView.getUint8(messageTypeOffset);

  const dataView = new DataView(
    incomingMessageData.slice(messageTypeOffset + 1)
  );

  switch (messageTypeId) {
    case 0x04:
      return parseHubAttachedIo(dataView);
    case 0x05:
      return parseError(dataView);
    case 0x43:
      return parsePortInformation(dataView);
    case 0x44:
      return parsePortModeInformation(dataView);
    case 0x45:
      return parsePortValue(dataView);
    case 0x47:
      return parsePortInputFormat(dataView);
  }

  return {messageType: 'Unknown'};
}
