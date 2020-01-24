import {parseError} from './parse-error';
import {parseHubAttachedIo} from './parse-hub-attached-io';
import {parsePortInformation} from './parse-port-information';
import {parsePortInputFormat} from './parse-port-input-format';
import {parsePortModeInformation} from './parse-port-mode-information';
import {parsePortValue} from './parse-port-value';
import {IncomingMessage} from './types';

export * from './types';

export function parseIncomingMessage(data: ArrayBuffer): IncomingMessage {
  const dataView = new DataView(data);
  const messageTypeOffset = dataView.getUint8(0) > 127 ? 3 : 2;
  const messageTypeId = dataView.getUint8(messageTypeOffset);
  const slicedData = data.slice(messageTypeOffset + 1);
  const slicedDataView = new DataView(slicedData);

  switch (messageTypeId) {
    case 0x04:
      return parseHubAttachedIo(slicedDataView);
    case 0x05:
      return parseError(slicedDataView);
    case 0x43:
      return parsePortInformation(slicedDataView);
    case 0x44:
      return parsePortModeInformation(slicedDataView);
    case 0x45:
      return parsePortValue(slicedDataView);
    case 0x47:
      return parsePortInputFormat(slicedDataView);
  }

  return {messageType: 'Unknown'};
}
