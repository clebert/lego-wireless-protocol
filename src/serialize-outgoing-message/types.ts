export type PortModeInformationRequestType =
  | 'Name'
  | 'Raw'
  | 'Pct'
  | 'Si'
  | 'Symbol'
  | 'ValueFormat';

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-information-request
 */
export interface PortInformationRequestOutgoingMessage {
  readonly messageType: 'PortInformationRequest'; // 0x21
  readonly portId: number;
  readonly portInformationRequestType: 'PortValue' | 'ModeInfo';
}

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-mode-information-request
 */
export interface PortModeInformationRequestOutgoingMessage {
  readonly messageType: 'PortModeInformationRequest'; // 0x22
  readonly portId: number;
  readonly modeId: number;
  readonly portModeInformationRequestType: PortModeInformationRequestType;
}

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-input-format-setup-single
 */
export interface PortInputFormatSetupOutgoingMessage {
  readonly messageType: 'PortInputFormatSetup'; // 0x41
  readonly portId: number;
  readonly modeId: number;
  readonly deltaInterval: number;
  readonly notificationsEnabled: boolean;
}

/**
 * https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-output-command
 */
export interface PortOutputCommandOutgoingMessage {
  readonly messageType: 'PortOutputCommand'; // 0x81
  readonly portId: number;
  readonly portOutputSubCommandData: Buffer;
}

export type OutgoingMessage =
  | PortInformationRequestOutgoingMessage
  | PortModeInformationRequestOutgoingMessage
  | PortInputFormatSetupOutgoingMessage
  | PortOutputCommandOutgoingMessage;
