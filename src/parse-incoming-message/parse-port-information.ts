import {PortInformationIncomingMessage} from './types';

export function parsePortInformation(
  dataView: DataView
): PortInformationIncomingMessage {
  const portId = dataView.getUint8(0);
  const typeId = dataView.getUint8(1);

  if (typeId !== 1) {
    return {
      messageType: 'PortInformation',
      portId,
      portInformationType: 'PossibleModeCombinations'
    };
  }

  const inputModesBitmask = dataView.getUint16(4, true);
  const inputModeIds: number[] = [];

  for (let i = 0; i < 16; i += 1) {
    if (inputModesBitmask & (1 << i)) {
      inputModeIds.push(i);
    }
  }

  const outputModesBitmask = dataView.getUint16(6, true);
  const outputModeIds: number[] = [];

  for (let i = 0; i < 16; i += 1) {
    if (outputModesBitmask & (1 << i)) {
      outputModeIds.push(i);
    }
  }

  return {
    messageType: 'PortInformation',
    portId,
    portInformationType: 'ModeInfo',
    inputModeIds,
    outputModeIds
  };
}
