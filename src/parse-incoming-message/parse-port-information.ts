import {PortInformationIncomingMessage} from './types';

export function parsePortInformation(
  data: Buffer
): PortInformationIncomingMessage {
  const portId = data.readUInt8(0);
  const typeId = data.readUInt8(1);

  if (typeId !== 1) {
    return {
      messageType: 'PortInformation',
      portId,
      portInformationType: 'PossibleModeCombinations'
    };
  }

  const inputModesBitmask = data.readUInt16LE(4);
  const inputModeIds: number[] = [];

  for (let i = 0; i < 16; i += 1) {
    if (inputModesBitmask & (1 << i)) {
      inputModeIds.push(i);
    }
  }

  const outputModesBitmask = data.readUInt16LE(6);
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
