import {HubAttachedIoIncomingMessage, IoType, Port} from './types';

function createPort(portId: number): Port {
  return portId <= 49
    ? {portType: 'External', portId}
    : portId <= 100
    ? {portType: 'Internal', portId}
    : {portType: 'Reserved', portId};
}

function createIoType(ioTypeId: number): IoType {
  switch (ioTypeId) {
    case 0x01:
      return 'Motor';
    case 0x02:
      return 'SystemTrainMotor';
    case 0x05:
      return 'Button';
    case 0x08:
      return 'LedLight';
    case 0x14:
      return 'Voltage';
    case 0x15:
      return 'Current';
    case 0x16:
      return 'PiezoTone';
    case 0x17:
      return 'RgbLight';
    case 0x22:
      return 'ExternalTiltSensor';
    case 0x23:
      return 'MotionSensor';
    case 0x25:
      return 'VisionSensor';
    case 0x26:
      return 'ExternalMotorWithTacho';
    case 0x27:
      return 'InternalMotorWithTacho';
    case 0x28:
      return 'InternalTilt';
  }

  return 'Unknown';
}

export function parseHubAttachedIo(data: Buffer): HubAttachedIoIncomingMessage {
  const port = createPort(data.readUInt8(0));
  const eventTypeId = data.readUInt8(1);

  if (eventTypeId === 0) {
    return {messageType: 'HubAttachedIo', port, eventType: 'HubDetachedIo'};
  }

  const ioType = createIoType(data.readUInt16LE(2));

  if (eventTypeId === 1) {
    return {
      messageType: 'HubAttachedIo',
      port,
      eventType: 'HubAttachedIo',
      ioType
    };
  }

  const portA = createPort(data.readUInt8(4));
  const portB = createPort(data.readUInt8(5));

  return {
    messageType: 'HubAttachedIo',
    port,
    eventType: 'HubAttachedVirtualIo',
    ioType,
    portA,
    portB
  };
}
