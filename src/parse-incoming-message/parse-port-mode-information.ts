import {DatasetType, PortModeInformationIncomingMessage} from './types';

type PortModeInformationType =
  | 'Name'
  | 'Raw'
  | 'Pct'
  | 'Si'
  | 'Symbol'
  | 'ValueFormat'
  | 'Unknown';

function createDatasetType(datasetTypeId: number): DatasetType {
  switch (datasetTypeId) {
    case 0:
      return 'Int8';
    case 1:
      return 'Int16';
    case 2:
      return 'Int32';
    case 3:
      return 'Float';
  }

  return 'Unknown';
}

function createPortModeInformationType(
  portModeInformationTypeId: number
): PortModeInformationType {
  switch (portModeInformationTypeId) {
    case 0x00:
      return 'Name';
    case 0x01:
      return 'Raw';
    case 0x02:
      return 'Pct';
    case 0x03:
      return 'Si';
    case 0x04:
      return 'Symbol';
    case 0x80:
      return 'ValueFormat';
  }

  return 'Unknown';
}

export function parsePortModeInformation(
  data: Buffer
): PortModeInformationIncomingMessage {
  const portId = data.readUInt8(0);
  const modeId = data.readUInt8(1);

  const portModeInformationType = createPortModeInformationType(
    data.readUInt8(2)
  );

  if (portModeInformationType === 'Name') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      name: data
        .slice(3)
        .toString()
        .replace(/\0/g, '')
    };
  }

  if (portModeInformationType === 'Raw') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      rawRange: [data.readFloatLE(3), data.readFloatLE(7)]
    };
  }

  if (portModeInformationType === 'Pct') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      pctRange: [data.readFloatLE(3), data.readFloatLE(7)]
    };
  }

  if (portModeInformationType === 'Si') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      siRange: [data.readFloatLE(3), data.readFloatLE(7)]
    };
  }

  if (portModeInformationType === 'Symbol') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      symbol: data
        .slice(3)
        .toString()
        .replace(/\0/g, '')
    };
  }

  if (portModeInformationType === 'ValueFormat') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      valueFormat: {
        numberOfDatasets: data.readUInt8(3),
        datasetType: createDatasetType(data.readUInt8(4))
      }
    };
  }

  return {
    messageType: 'PortModeInformation',
    portId,
    modeId,
    portModeInformationType
  };
}
