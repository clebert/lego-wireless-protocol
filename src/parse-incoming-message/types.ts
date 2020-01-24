export type IncomingMessage =
  | HubAttachedIoIncomingMessage
  | ErrorIncomingMessage
  | PortInformationIncomingMessage
  | PortModeInformationIncomingMessage
  | PortValueIncomingMessage
  | PortInputFormatIncomingMessage
  | UnknownIncomingMessage;

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#hub-attached-i-o
 */
export type HubAttachedIoIncomingMessage = {
  readonly messageType: 'HubAttachedIo'; // 0x04
} & (
  | {
      readonly port: Port;
      readonly eventType: 'HubAttachedIo';
      readonly ioType: IoType;
    }
  | {
      readonly port: Port;
      readonly eventType: 'HubAttachedVirtualIo';
      readonly ioType: IoType;
      readonly portA: Port;
      readonly portB: Port;
    }
  | {
      readonly port: Port;
      readonly eventType: 'HubDetachedIo';
    }
);

export interface Port {
  readonly portType: 'External' | 'Internal' | 'Reserved';
  readonly portId: number;
}

export type IoType =
  | 'Motor'
  | 'SystemTrainMotor'
  | 'Button'
  | 'LedLight'
  | 'Voltage'
  | 'Current'
  | 'PiezoTone'
  | 'RgbLight'
  | 'ExternalTiltSensor'
  | 'MotionSensor'
  | 'VisionSensor'
  | 'ExternalMotorWithTacho'
  | 'InternalMotorWithTacho'
  | 'InternalTilt'
  | 'Unknown';

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/#generic-error-messages
 */
export interface ErrorIncomingMessage {
  readonly messageType: 'Error'; // 0x05
  readonly commandTypeId: number;
  readonly errorCode: ErrorCode;
}

export type ErrorCode =
  | 'Ack'
  | 'Mack'
  | 'BufferOverflow'
  | 'Timeout'
  | 'CommandNotRecognized'
  | 'InvalidUse'
  | 'Overcurrent'
  | 'InternalError'
  | 'Unknown';

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-information
 */
export type PortInformationIncomingMessage = {
  readonly messageType: 'PortInformation'; // 0x43
} & (
  | {
      readonly portId: number;
      readonly portInformationType: 'ModeInfo';
      readonly inputModeIds: number[];
      readonly outputModeIds: number[];
    }
  | {
      readonly portId: number;
      readonly portInformationType: 'PossibleModeCombinations';
    }
);

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-mode-information
 */
export type PortModeInformationIncomingMessage = {
  readonly messageType: 'PortModeInformation'; // 0x44
  readonly portId: number;
  readonly modeId: number;
} & (
  | {
      readonly portModeInformationType: 'Name';
      readonly name: string;
    }
  | {
      readonly portModeInformationType: 'Raw';
      readonly rawRange: [number, number];
    }
  | {
      readonly portModeInformationType: 'Pct';
      readonly pctRange: [number, number];
    }
  | {
      readonly portModeInformationType: 'Si';
      readonly siRange: [number, number];
    }
  | {
      readonly portModeInformationType: 'Symbol';
      readonly symbol: string;
    }
  | {
      readonly portModeInformationType: 'ValueFormat';
      readonly valueFormat: ValueFormat;
    }
  | {
      readonly portModeInformationType: 'Unknown';
    }
);

export interface ValueFormat {
  readonly datasetType: DatasetType;
  readonly numberOfDatasets: number;
}

export type DatasetType = 'Int8' | 'Int16' | 'Int32' | 'Float' | 'Unknown';

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-value-single
 */
export interface PortValueIncomingMessage {
  readonly messageType: 'PortValue'; // 0x45
  readonly portId: number;
  readonly valueData: ArrayBuffer;
}

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-input-format-single
 */
export interface PortInputFormatIncomingMessage {
  readonly messageType: 'PortInputFormat'; // 0x47
  readonly portId: number;
  readonly modeId: number;
  readonly deltaInterval: number;
  readonly notificationsEnabled: boolean;
}

export interface UnknownIncomingMessage {
  readonly messageType: 'Unknown';
}
