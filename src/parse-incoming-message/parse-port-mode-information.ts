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
  dataView: DataView
): PortModeInformationIncomingMessage {
  const portId = dataView.getUint8(0);
  const modeId = dataView.getUint8(1);

  const portModeInformationType = createPortModeInformationType(
    dataView.getUint8(2)
  );

  if (portModeInformationType === 'Name') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      name: String.fromCharCode
        .apply(null, [...new Uint8Array(dataView.buffer.slice(3))])
        .replace(/\0/g, '')
    };
  }

  if (portModeInformationType === 'Raw') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      rawRange: [dataView.getFloat32(3, true), dataView.getFloat32(7, true)]
    };
  }

  if (portModeInformationType === 'Pct') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      pctRange: [dataView.getFloat32(3, true), dataView.getFloat32(7, true)]
    };
  }

  if (portModeInformationType === 'Si') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      siRange: [dataView.getFloat32(3, true), dataView.getFloat32(7, true)]
    };
  }

  if (portModeInformationType === 'Symbol') {
    return {
      messageType: 'PortModeInformation',
      portId,
      modeId,
      portModeInformationType,
      symbol: String.fromCharCode
        .apply(null, [...new Uint8Array(dataView.buffer.slice(3))])
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
        numberOfDatasets: dataView.getUint8(3),
        datasetType: createDatasetType(dataView.getUint8(4))
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
