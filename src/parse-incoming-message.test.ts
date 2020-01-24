import {IncomingMessage, parseIncomingMessage} from './parse-incoming-message';

function assert(data: number[], incomingMessage: IncomingMessage): void {
  expect(parseIncomingMessage(Buffer.from(data))).toEqual(incomingMessage);
}

describe('parseIncomingMessage()', () => {
  test('Unknown', () => {
    assert([0, 0, 0], {messageType: 'Unknown'});
  });

  test('Error', () => {
    assert([5, 0, 5, 22, 5], {
      messageType: 'Error',
      commandTypeId: 22,
      errorCode: 'CommandNotRecognized'
    });
  });

  test('HubAttachedIo', () => {
    assert([15, 0, 4, 0, 1, 39, 0, 0, 0, 0, 16, 0, 0, 0, 16], {
      messageType: 'HubAttachedIo',
      port: {portType: 'External', portId: 0},
      eventType: 'HubAttachedIo',
      ioType: 'InternalMotorWithTacho'
    });

    assert([15, 0, 4, 1, 1, 39, 0, 0, 0, 0, 16, 0, 0, 0, 16], {
      messageType: 'HubAttachedIo',
      port: {portType: 'External', portId: 1},
      eventType: 'HubAttachedIo',
      ioType: 'InternalMotorWithTacho'
    });

    assert([9, 0, 4, 16, 2, 39, 0, 0, 1], {
      messageType: 'HubAttachedIo',
      port: {portType: 'External', portId: 16},
      eventType: 'HubAttachedVirtualIo',
      ioType: 'InternalMotorWithTacho',
      portA: {portType: 'External', portId: 0},
      portB: {portType: 'External', portId: 1}
    });

    assert([15, 0, 4, 50, 1, 23, 0, 0, 0, 0, 1, 6, 0, 0, 32], {
      messageType: 'HubAttachedIo',
      port: {portType: 'Internal', portId: 50},
      eventType: 'HubAttachedIo',
      ioType: 'RgbLight'
    });

    assert([15, 0, 4, 58, 1, 40, 0, 0, 0, 0, 16, 0, 0, 1, 2], {
      messageType: 'HubAttachedIo',
      port: {portType: 'Internal', portId: 58},
      eventType: 'HubAttachedIo',
      ioType: 'InternalTilt'
    });

    assert([15, 0, 4, 59, 1, 21, 0, 2, 0, 0, 0, 0, 0, 1, 0], {
      messageType: 'HubAttachedIo',
      port: {portType: 'Internal', portId: 59},
      eventType: 'HubAttachedIo',
      ioType: 'Current'
    });

    assert([15, 0, 4, 60, 1, 20, 0, 2, 0, 0, 0, 0, 0, 1, 0], {
      messageType: 'HubAttachedIo',
      port: {portType: 'Internal', portId: 60},
      eventType: 'HubAttachedIo',
      ioType: 'Voltage'
    });

    assert([15, 0, 4, 70, 1, 66, 0, 1, 0, 0, 0, 0, 0, 0, 16], {
      messageType: 'HubAttachedIo',
      port: {portType: 'Internal', portId: 70},
      eventType: 'HubAttachedIo',
      ioType: 'Unknown'
    });

    assert([15, 0, 4, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], {
      messageType: 'HubAttachedIo',
      port: {portType: 'External', portId: 2},
      eventType: 'HubAttachedIo',
      ioType: 'Motor'
    });

    assert([15, 0, 4, 2, 1, 37, 0, 0, 0, 0, 16, 0, 0, 0, 16], {
      messageType: 'HubAttachedIo',
      port: {portType: 'External', portId: 2},
      eventType: 'HubAttachedIo',
      ioType: 'VisionSensor'
    });

    assert([15, 0, 4, 2, 1, 38, 0, 0, 0, 0, 16, 0, 0, 0, 16], {
      messageType: 'HubAttachedIo',
      port: {portType: 'External', portId: 2},
      eventType: 'HubAttachedIo',
      ioType: 'ExternalMotorWithTacho'
    });

    assert([5, 0, 4, 2, 0], {
      messageType: 'HubAttachedIo',
      port: {portType: 'External', portId: 2},
      eventType: 'HubDetachedIo'
    });
  });

  test('PortInputFormat', () => {
    assert([10, 0, 71, 0, 2, 1, 0, 0, 0, 1], {
      messageType: 'PortInputFormat',
      portId: 0,
      modeId: 2,
      deltaInterval: 1,
      notificationsEnabled: true
    });

    assert([10, 0, 71, 50, 1, 1, 0, 0, 0, 0], {
      messageType: 'PortInputFormat',
      portId: 50,
      modeId: 1,
      deltaInterval: 1,
      notificationsEnabled: false
    });
  });

  test('PortValue', () => {
    assert([5, 0, 69, 0, 0], {
      messageType: 'PortValue',
      portId: 0,
      valueData: Buffer.from([0])
    });

    assert([8, 0, 69, 0, 0, 0, 0, 0], {
      messageType: 'PortValue',
      portId: 0,
      valueData: Buffer.from([0, 0, 0, 0])
    });
  });

  test('PortInformation: InternalMotorWithTacho', () => {
    assert([11, 0, 67, 0, 1, 15, 3, 6, 0, 7, 0], {
      messageType: 'PortInformation',
      portId: 0,
      portInformationType: 'ModeInfo',
      inputModeIds: [1, 2],
      outputModeIds: [0, 1, 2]
    });
  });

  test('PortModeInformation: InternalMotorWithTacho', () => {
    assert([17, 0, 68, 0, 1, 0, 83, 80, 69, 69, 68, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 1,
      portModeInformationType: 'Name',
      name: 'SPEED'
    });

    assert([14, 0, 68, 0, 1, 1, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 1,
      portModeInformationType: 'Raw',
      rawRange: [-100, 100]
    });

    assert([14, 0, 68, 0, 1, 2, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 1,
      portModeInformationType: 'Pct',
      pctRange: [-100, 100]
    });

    assert([14, 0, 68, 0, 1, 3, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 1,
      portModeInformationType: 'Si',
      siRange: [-100, 100]
    });

    assert([10, 0, 68, 0, 1, 4, 80, 67, 84, 0], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 1,
      portModeInformationType: 'Symbol',
      symbol: 'PCT'
    });

    assert([10, 0, 68, 0, 1, 128, 1, 0, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 1,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 0, 2, 0, 80, 79, 83, 0, 0, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 2,
      portModeInformationType: 'Name',
      name: 'POS'
    });

    assert([14, 0, 68, 0, 2, 1, 0, 0, 180, 195, 0, 0, 180, 67], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 2,
      portModeInformationType: 'Raw',
      rawRange: [-360, 360]
    });

    assert([14, 0, 68, 0, 2, 2, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 2,
      portModeInformationType: 'Pct',
      pctRange: [-100, 100]
    });

    assert([14, 0, 68, 0, 2, 3, 0, 0, 180, 195, 0, 0, 180, 67], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 2,
      portModeInformationType: 'Si',
      siRange: [-360, 360]
    });

    assert([10, 0, 68, 0, 2, 4, 68, 69, 71, 0], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 2,
      portModeInformationType: 'Symbol',
      symbol: 'DEG'
    });

    assert([10, 0, 68, 0, 2, 128, 1, 2, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 0,
      modeId: 2,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int32'}
    });
  });

  test('PortInformation: RgbLight', () => {
    assert([11, 0, 67, 50, 1, 1, 2, 0, 0, 3, 0], {
      messageType: 'PortInformation',
      portId: 50,
      portInformationType: 'ModeInfo',
      inputModeIds: [],
      outputModeIds: [0, 1]
    });
  });

  test('PortInformation: InternalTilt', () => {
    assert([11, 0, 67, 58, 1, 6, 8, 255, 0, 0, 0], {
      messageType: 'PortInformation',
      portId: 58,
      portInformationType: 'ModeInfo',
      inputModeIds: [0, 1, 2, 3, 4, 5, 6, 7],
      outputModeIds: []
    });
  });

  test('PortModeInformation: InternalTilt', () => {
    assert([17, 0, 68, 58, 0, 0, 65, 78, 71, 76, 69, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 0,
      portModeInformationType: 'Name',
      name: 'ANGLE'
    });

    assert([14, 0, 68, 58, 0, 1, 0, 0, 180, 194, 0, 0, 180, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 0,
      portModeInformationType: 'Raw',
      rawRange: [-90, 90]
    });

    assert([14, 0, 68, 58, 0, 2, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 0,
      portModeInformationType: 'Pct',
      pctRange: [-100, 100]
    });

    assert([14, 0, 68, 58, 0, 3, 0, 0, 180, 194, 0, 0, 180, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 0,
      portModeInformationType: 'Si',
      siRange: [-90, 90]
    });

    assert([10, 0, 68, 58, 0, 4, 68, 69, 71, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 0,
      portModeInformationType: 'Symbol',
      symbol: 'DEG'
    });

    assert([10, 0, 68, 58, 0, 128, 2, 0, 3, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 0,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 2, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 58, 1, 0, 84, 73, 76, 84, 0, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 1,
      portModeInformationType: 'Name',
      name: 'TILT'
    });

    assert([14, 0, 68, 58, 1, 1, 0, 0, 0, 0, 0, 0, 32, 65], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 1,
      portModeInformationType: 'Raw',
      rawRange: [0, 10]
    });

    assert([14, 0, 68, 58, 1, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 1,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 58, 1, 3, 0, 0, 0, 0, 0, 0, 32, 65], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 1,
      portModeInformationType: 'Si',
      siRange: [0, 10]
    });

    assert([10, 0, 68, 58, 1, 4, 68, 73, 82, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 1,
      portModeInformationType: 'Symbol',
      symbol: 'DIR'
    });

    assert([10, 0, 68, 58, 1, 128, 1, 0, 1, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 1,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 58, 2, 0, 79, 82, 73, 78, 84, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 2,
      portModeInformationType: 'Name',
      name: 'ORINT'
    });

    assert([14, 0, 68, 58, 2, 1, 0, 0, 0, 0, 0, 0, 160, 64], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 2,
      portModeInformationType: 'Raw',
      rawRange: [0, 5]
    });

    assert([14, 0, 68, 58, 2, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 2,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 58, 2, 3, 0, 0, 0, 0, 0, 0, 160, 64], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 2,
      portModeInformationType: 'Si',
      siRange: [0, 5]
    });

    assert([10, 0, 68, 58, 2, 4, 68, 73, 82, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 2,
      portModeInformationType: 'Symbol',
      symbol: 'DIR'
    });

    assert([10, 0, 68, 58, 2, 128, 1, 0, 1, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 2,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 58, 3, 0, 73, 77, 80, 67, 84, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 3,
      portModeInformationType: 'Name',
      name: 'IMPCT'
    });

    assert([14, 0, 68, 58, 3, 1, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 3,
      portModeInformationType: 'Raw',
      rawRange: [0, 100]
    });

    assert([14, 0, 68, 58, 3, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 3,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 58, 3, 3, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 3,
      portModeInformationType: 'Si',
      siRange: [0, 100]
    });

    assert([10, 0, 68, 58, 3, 4, 73, 77, 80, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 3,
      portModeInformationType: 'Symbol',
      symbol: 'IMP'
    });

    assert([10, 0, 68, 58, 3, 128, 1, 2, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 3,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int32'}
    });

    assert([17, 0, 68, 58, 4, 0, 65, 67, 67, 69, 76, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 4,
      portModeInformationType: 'Name',
      name: 'ACCEL'
    });

    assert([14, 0, 68, 58, 4, 1, 0, 0, 130, 194, 0, 0, 130, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 4,
      portModeInformationType: 'Raw',
      rawRange: [-65, 65]
    });

    assert([14, 0, 68, 58, 4, 2, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 4,
      portModeInformationType: 'Pct',
      pctRange: [-100, 100]
    });

    assert([14, 0, 68, 58, 4, 3, 0, 0, 130, 194, 0, 0, 130, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 4,
      portModeInformationType: 'Si',
      siRange: [-65, 65]
    });

    assert([10, 0, 68, 58, 4, 4, 65, 67, 67, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 4,
      portModeInformationType: 'Symbol',
      symbol: 'ACC'
    });

    assert([10, 0, 68, 58, 4, 128, 3, 0, 3, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 4,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 3, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 58, 5, 0, 79, 82, 95, 67, 70, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 5,
      portModeInformationType: 'Name',
      name: 'OR_CF'
    });

    assert([14, 0, 68, 58, 5, 1, 0, 0, 0, 0, 0, 0, 192, 64], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 5,
      portModeInformationType: 'Raw',
      rawRange: [0, 6]
    });

    assert([14, 0, 68, 58, 5, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 5,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 58, 5, 3, 0, 0, 0, 0, 0, 0, 192, 64], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 5,
      portModeInformationType: 'Si',
      siRange: [0, 6]
    });

    assert([10, 0, 68, 58, 5, 4, 83, 73, 68, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 5,
      portModeInformationType: 'Symbol',
      symbol: 'SID'
    });

    assert([10, 0, 68, 58, 5, 128, 1, 0, 1, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 5,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 58, 6, 0, 73, 77, 95, 67, 70, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 6,
      portModeInformationType: 'Name',
      name: 'IM_CF'
    });

    assert([14, 0, 68, 58, 6, 1, 0, 0, 0, 0, 0, 0, 127, 67], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 6,
      portModeInformationType: 'Raw',
      rawRange: [0, 255]
    });

    assert([14, 0, 68, 58, 6, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 6,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 58, 6, 3, 0, 0, 0, 0, 0, 0, 127, 67], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 6,
      portModeInformationType: 'Si',
      siRange: [0, 255]
    });

    assert([10, 0, 68, 58, 6, 4, 83, 69, 78, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 6,
      portModeInformationType: 'Symbol',
      symbol: 'SEN'
    });

    assert([10, 0, 68, 58, 6, 128, 2, 0, 3, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 6,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 2, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 58, 7, 0, 67, 65, 76, 73, 66, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 7,
      portModeInformationType: 'Name',
      name: 'CALIB'
    });

    assert([14, 0, 68, 58, 7, 1, 0, 0, 0, 0, 0, 0, 127, 67], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 7,
      portModeInformationType: 'Raw',
      rawRange: [0, 255]
    });

    assert([14, 0, 68, 58, 7, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 7,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 58, 7, 3, 0, 0, 0, 0, 0, 0, 127, 67], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 7,
      portModeInformationType: 'Si',
      siRange: [0, 255]
    });

    assert([10, 0, 68, 58, 7, 4, 67, 65, 76, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 7,
      portModeInformationType: 'Symbol',
      symbol: 'CAL'
    });

    assert([10, 0, 68, 58, 7, 128, 3, 0, 3, 0], {
      messageType: 'PortModeInformation',
      portId: 58,
      modeId: 7,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 3, datasetType: 'Int8'}
    });
  });

  test('PortInformation: Current', () => {
    assert([11, 0, 67, 59, 1, 2, 2, 3, 0, 0, 0], {
      messageType: 'PortInformation',
      portId: 59,
      portInformationType: 'ModeInfo',
      inputModeIds: [0, 1],
      outputModeIds: []
    });
  });

  test('PortModeInformation: Current', () => {
    assert([17, 0, 68, 59, 0, 0, 67, 85, 82, 32, 76, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 0,
      portModeInformationType: 'Name',
      name: 'CUR L'
    });

    assert([14, 0, 68, 59, 0, 1, 0, 0, 0, 0, 0, 240, 127, 69], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 0,
      portModeInformationType: 'Raw',
      rawRange: [0, 4095]
    });

    assert([14, 0, 68, 59, 0, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 0,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 59, 0, 3, 0, 0, 0, 0, 0, 192, 24, 69], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 0,
      portModeInformationType: 'Si',
      siRange: [0, 2444]
    });

    assert([10, 0, 68, 59, 0, 4, 109, 65, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 0,
      portModeInformationType: 'Symbol',
      symbol: 'mA'
    });

    assert([10, 0, 68, 59, 0, 128, 1, 1, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 0,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int16'}
    });

    assert([17, 0, 68, 59, 1, 0, 67, 85, 82, 32, 83, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 1,
      portModeInformationType: 'Name',
      name: 'CUR S'
    });

    assert([14, 0, 68, 59, 1, 1, 0, 0, 0, 0, 0, 240, 127, 69], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 1,
      portModeInformationType: 'Raw',
      rawRange: [0, 4095]
    });

    assert([14, 0, 68, 59, 1, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 1,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 59, 1, 3, 0, 0, 0, 0, 0, 192, 24, 69], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 1,
      portModeInformationType: 'Si',
      siRange: [0, 2444]
    });

    assert([10, 0, 68, 59, 1, 4, 109, 65, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 1,
      portModeInformationType: 'Symbol',
      symbol: 'mA'
    });

    assert([10, 0, 68, 59, 1, 128, 1, 1, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 59,
      modeId: 1,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int16'}
    });
  });

  test('PortInformation: Voltage', () => {
    assert([11, 0, 67, 60, 1, 2, 2, 3, 0, 0, 0], {
      messageType: 'PortInformation',
      portId: 60,
      portInformationType: 'ModeInfo',
      inputModeIds: [0, 1],
      outputModeIds: []
    });
  });

  test('PortModeInformation: Voltage', () => {
    assert([17, 0, 68, 60, 0, 0, 86, 76, 84, 32, 76, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 0,
      portModeInformationType: 'Name',
      name: 'VLT L'
    });

    assert([14, 0, 68, 60, 0, 1, 0, 0, 0, 0, 0, 80, 115, 69], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 0,
      portModeInformationType: 'Raw',
      rawRange: [0, 3893]
    });

    assert([14, 0, 68, 60, 0, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 0,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 60, 0, 3, 0, 0, 0, 0, 0, 0, 22, 70], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 0,
      portModeInformationType: 'Si',
      siRange: [0, 9600]
    });

    assert([10, 0, 68, 60, 0, 4, 109, 86, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 0,
      portModeInformationType: 'Symbol',
      symbol: 'mV'
    });

    assert([10, 0, 68, 60, 0, 128, 1, 1, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 0,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int16'}
    });

    assert([17, 0, 68, 60, 1, 0, 86, 76, 84, 32, 83, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 1,
      portModeInformationType: 'Name',
      name: 'VLT S'
    });

    assert([14, 0, 68, 60, 1, 1, 0, 0, 0, 0, 0, 80, 115, 69], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 1,
      portModeInformationType: 'Raw',
      rawRange: [0, 3893]
    });

    assert([14, 0, 68, 60, 1, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 1,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 60, 1, 3, 0, 0, 0, 0, 0, 0, 22, 70], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 1,
      portModeInformationType: 'Si',
      siRange: [0, 9600]
    });

    assert([10, 0, 68, 60, 1, 4, 109, 86, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 1,
      portModeInformationType: 'Symbol',
      symbol: 'mV'
    });

    assert([10, 0, 68, 60, 1, 128, 1, 1, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 60,
      modeId: 1,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int16'}
    });
  });

  test('PortInformation: VisionSensor', () => {
    assert([11, 0, 67, 2, 1, 7, 11, 95, 6, 160, 0], {
      messageType: 'PortInformation',
      portId: 2,
      portInformationType: 'ModeInfo',
      inputModeIds: [0, 1, 2, 3, 4, 6, 9, 10],
      outputModeIds: [5, 7]
    });
  });

  test('PortModeInformation: VisionSensor', () => {
    assert([17, 0, 68, 2, 0, 0, 67, 79, 76, 79, 82, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 0,
      portModeInformationType: 'Name',
      name: 'COLOR'
    });

    assert([14, 0, 68, 2, 0, 1, 0, 0, 0, 0, 0, 0, 32, 65], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 0,
      portModeInformationType: 'Raw',
      rawRange: [0, 10]
    });

    assert([14, 0, 68, 2, 0, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 0,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 2, 0, 3, 0, 0, 0, 0, 0, 0, 32, 65], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 0,
      portModeInformationType: 'Si',
      siRange: [0, 10]
    });

    assert([10, 0, 68, 2, 0, 4, 73, 68, 88, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 0,
      portModeInformationType: 'Symbol',
      symbol: 'IDX'
    });

    assert([10, 0, 68, 2, 0, 128, 1, 0, 3, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 0,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 2, 1, 0, 80, 82, 79, 88, 0, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Name',
      name: 'PROX'
    });

    assert([14, 0, 68, 2, 1, 1, 0, 0, 0, 0, 0, 0, 32, 65], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Raw',
      rawRange: [0, 10]
    });

    assert([14, 0, 68, 2, 1, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 2, 1, 3, 0, 0, 0, 0, 0, 0, 32, 65], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Si',
      siRange: [0, 10]
    });

    assert([10, 0, 68, 2, 1, 4, 68, 73, 83, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Symbol',
      symbol: 'DIS'
    });

    assert([10, 0, 68, 2, 1, 128, 1, 0, 3, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 2, 2, 0, 67, 79, 85, 78, 84, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Name',
      name: 'COUNT'
    });

    assert([14, 0, 68, 2, 2, 1, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Raw',
      rawRange: [0, 100]
    });

    assert([14, 0, 68, 2, 2, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 2, 2, 3, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Si',
      siRange: [0, 100]
    });

    assert([10, 0, 68, 2, 2, 4, 67, 78, 84, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Symbol',
      symbol: 'CNT'
    });

    assert([10, 0, 68, 2, 2, 128, 1, 2, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int32'}
    });

    assert([17, 0, 68, 2, 3, 0, 82, 69, 70, 76, 84, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 3,
      portModeInformationType: 'Name',
      name: 'REFLT'
    });

    assert([14, 0, 68, 2, 3, 1, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 3,
      portModeInformationType: 'Raw',
      rawRange: [0, 100]
    });

    assert([14, 0, 68, 2, 3, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 3,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 2, 3, 3, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 3,
      portModeInformationType: 'Si',
      siRange: [0, 100]
    });

    assert([10, 0, 68, 2, 3, 4, 80, 67, 84, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 3,
      portModeInformationType: 'Symbol',
      symbol: 'PCT'
    });

    assert([10, 0, 68, 2, 3, 128, 1, 0, 3, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 3,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 2, 4, 0, 65, 77, 66, 73, 0, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 4,
      portModeInformationType: 'Name',
      name: 'AMBI'
    });

    assert([14, 0, 68, 2, 4, 1, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 4,
      portModeInformationType: 'Raw',
      rawRange: [0, 100]
    });

    assert([14, 0, 68, 2, 4, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 4,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 2, 4, 3, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 4,
      portModeInformationType: 'Si',
      siRange: [0, 100]
    });

    assert([10, 0, 68, 2, 4, 4, 80, 67, 84, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 4,
      portModeInformationType: 'Symbol',
      symbol: 'PCT'
    });

    assert([10, 0, 68, 2, 4, 128, 1, 0, 3, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 4,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 2, 6, 0, 82, 71, 66, 32, 73, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 6,
      portModeInformationType: 'Name',
      name: 'RGB I'
    });

    assert([14, 0, 68, 2, 6, 1, 0, 0, 0, 0, 0, 192, 127, 68], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 6,
      portModeInformationType: 'Raw',
      rawRange: [0, 1023]
    });

    assert([14, 0, 68, 2, 6, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 6,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 2, 6, 3, 0, 0, 0, 0, 0, 192, 127, 68], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 6,
      portModeInformationType: 'Si',
      siRange: [0, 1023]
    });

    assert([10, 0, 68, 2, 6, 4, 82, 65, 87, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 6,
      portModeInformationType: 'Symbol',
      symbol: 'RAW'
    });

    assert([10, 0, 68, 2, 6, 128, 3, 1, 5, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 6,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 3, datasetType: 'Int16'}
    });

    assert([17, 0, 68, 2, 9, 0, 68, 69, 66, 85, 71, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 9,
      portModeInformationType: 'Name',
      name: 'DEBUG'
    });

    assert([14, 0, 68, 2, 9, 1, 0, 0, 0, 0, 0, 192, 127, 68], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 9,
      portModeInformationType: 'Raw',
      rawRange: [0, 1023]
    });

    assert([14, 0, 68, 2, 9, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 9,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 2, 9, 3, 0, 0, 0, 0, 0, 0, 32, 65], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 9,
      portModeInformationType: 'Si',
      siRange: [0, 10]
    });

    assert([10, 0, 68, 2, 9, 4, 78, 47, 65, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 9,
      portModeInformationType: 'Symbol',
      symbol: 'N/A'
    });

    assert([10, 0, 68, 2, 9, 128, 2, 1, 5, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 9,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 2, datasetType: 'Int16'}
    });

    assert([17, 0, 68, 2, 10, 0, 67, 65, 76, 73, 66, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 10,
      portModeInformationType: 'Name',
      name: 'CALIB'
    });

    assert([14, 0, 68, 2, 10, 1, 0, 0, 0, 0, 0, 255, 127, 71], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 10,
      portModeInformationType: 'Raw',
      rawRange: [0, 65535]
    });

    assert([14, 0, 68, 2, 10, 2, 0, 0, 0, 0, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 10,
      portModeInformationType: 'Pct',
      pctRange: [0, 100]
    });

    assert([14, 0, 68, 2, 10, 3, 0, 0, 0, 0, 0, 255, 127, 71], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 10,
      portModeInformationType: 'Si',
      siRange: [0, 65535]
    });

    assert([10, 0, 68, 2, 10, 4, 78, 47, 65, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 10,
      portModeInformationType: 'Symbol',
      symbol: 'N/A'
    });

    assert([10, 0, 68, 2, 10, 128, 8, 1, 5, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 10,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 8, datasetType: 'Int16'}
    });
  });

  test('PortInformation: ExternalMotorWithTacho', () => {
    assert([11, 0, 67, 2, 1, 7, 4, 6, 0, 1, 0], {
      messageType: 'PortInformation',
      portId: 2,
      portInformationType: 'ModeInfo',
      inputModeIds: [1, 2],
      outputModeIds: [0]
    });
  });

  test('PortModeInformation: ExternalMotorWithTacho', () => {
    assert([17, 0, 68, 2, 1, 0, 83, 80, 69, 69, 68, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Name',
      name: 'SPEED'
    });

    assert([14, 0, 68, 2, 1, 1, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Raw',
      rawRange: [-100, 100]
    });

    assert([14, 0, 68, 2, 1, 2, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Pct',
      pctRange: [-100, 100]
    });

    assert([14, 0, 68, 2, 1, 3, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Si',
      siRange: [-100, 100]
    });

    assert([10, 0, 68, 2, 1, 4, 80, 67, 84, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'Symbol',
      symbol: 'PCT'
    });

    assert([10, 0, 68, 2, 1, 128, 1, 0, 4, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 1,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int8'}
    });

    assert([17, 0, 68, 2, 2, 0, 80, 79, 83, 0, 0, 0, 0, 0, 0, 0, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Name',
      name: 'POS'
    });

    assert([14, 0, 68, 2, 2, 1, 0, 0, 180, 195, 0, 0, 180, 67], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Raw',
      rawRange: [-360, 360]
    });

    assert([14, 0, 68, 2, 2, 2, 0, 0, 200, 194, 0, 0, 200, 66], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Pct',
      pctRange: [-100, 100]
    });

    assert([14, 0, 68, 2, 2, 3, 0, 0, 180, 195, 0, 0, 180, 67], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Si',
      siRange: [-360, 360]
    });

    assert([10, 0, 68, 2, 2, 4, 68, 69, 71, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'Symbol',
      symbol: 'DEG'
    });

    assert([10, 0, 68, 2, 2, 128, 1, 2, 6, 0], {
      messageType: 'PortModeInformation',
      portId: 2,
      modeId: 2,
      portModeInformationType: 'ValueFormat',
      valueFormat: {numberOfDatasets: 1, datasetType: 'Int32'}
    });
  });

  test('PortInformation: Motor', () => {
    assert([11, 0, 67, 2, 1, 1, 1, 0, 0, 1, 0], {
      messageType: 'PortInformation',
      portId: 2,
      portInformationType: 'ModeInfo',
      inputModeIds: [],
      outputModeIds: [0]
    });
  });
});
