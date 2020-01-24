import {ErrorCode, ErrorIncomingMessage} from './types';

function createErrorCode(errorCodeId: number): ErrorCode {
  switch (errorCodeId) {
    case 1:
      return 'Ack';
    case 2:
      return 'Mack';
    case 3:
      return 'BufferOverflow';
    case 4:
      return 'Timeout';
    case 5:
      return 'CommandNotRecognized';
    case 6:
      return 'InvalidUse';
    case 7:
      return 'Overcurrent';
    case 8:
      return 'InternalError';
  }

  return 'Unknown';
}

export function parseError(dataView: DataView): ErrorIncomingMessage {
  const commandTypeId = dataView.getUint8(0);
  const errorCode = createErrorCode(dataView.getUint8(1));

  return {messageType: 'Error', commandTypeId, errorCode};
}
