import {parseError} from './parse-error';
import {parseHubAttachedIo} from './parse-hub-attached-io';
import {parsePortInformation} from './parse-port-information';
import {parsePortInputFormat} from './parse-port-input-format';
import {parsePortModeInformation} from './parse-port-mode-information';
import {parsePortValue} from './parse-port-value';
import {IncomingMessage} from './types';

export * from './types';

export function parseIncomingMessage(data: Buffer): IncomingMessage {
  const messageTypeOffset = data.readUInt8(0) > 127 ? 3 : 2;
  const messageTypeId = data.readUInt8(messageTypeOffset);
  const slicedData = data.slice(messageTypeOffset + 1);

  switch (messageTypeId) {
    case 0x04:
      return parseHubAttachedIo(slicedData);
    case 0x05:
      return parseError(slicedData);
    case 0x43:
      return parsePortInformation(slicedData);
    case 0x44:
      return parsePortModeInformation(slicedData);
    case 0x45:
      return parsePortValue(slicedData);
    case 0x47:
      return parsePortInputFormat(slicedData);
  }

  return {messageType: 'Unknown'};
}
