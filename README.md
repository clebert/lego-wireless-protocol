# lego-wireless-protocol

[![][ci-badge]][ci-link] [![][version-badge]][version-link]
[![][license-badge]][license-link] [![][types-badge]][types-link]
[![][size-badge]][size-link]

[ci-badge]:
  https://github.com/clebert/lego-wireless-protocol/workflows/CI/badge.svg
[ci-link]: https://github.com/clebert/lego-wireless-protocol
[version-badge]: https://badgen.net/npm/v/lego-wireless-protocol
[version-link]: https://www.npmjs.com/package/lego-wireless-protocol
[license-badge]: https://badgen.net/npm/license/lego-wireless-protocol
[license-link]:
  https://github.com/clebert/lego-wireless-protocol/blob/master/LICENSE
[types-badge]: https://badgen.net/npm/types/lego-wireless-protocol
[types-link]: https://github.com/clebert/lego-wireless-protocol
[size-badge]: https://badgen.net/bundlephobia/minzip/lego-wireless-protocol
[size-link]: https://bundlephobia.com/result?p=lego-wireless-protocol

A partial implementation of the LEGO wireless protocol using JavaScript.

The documentation of the LEGO wireless protocol can be found
[here](https://lego.github.io/lego-ble-wireless-protocol-docs/).

## Installation

Using `yarn`:

```
yarn add lego-wireless-protocol
```

Using `npm`:

```
npm install lego-wireless-protocol --save
```

## Usage Example

### Parsing An Incoming Message

```ts
import {parseIncomingMessage} from 'lego-wireless-protocol';

const incomingMessageData = Uint8Array.from([9, 0, 4, 16, 2, 39, 0, 0, 1])
  .buffer;

const incomingMessage = parseIncomingMessage(incomingMessageData);

assert.deepEqual(incomingMessage, {
  messageType: 'HubAttachedIo',
  port: {portType: 'External', portId: 16},
  eventType: 'HubAttachedVirtualIo',
  ioType: 'InternalMotorWithTacho',
  portA: {portType: 'External', portId: 0},
  portB: {portType: 'External', portId: 1}
});
```

### Serializing An Outgoing Message

```ts
import {serializeOutgoingMessage} from 'lego-wireless-protocol';

const outgoingMessageData = serializeOutgoingMessage({
  messageType: 'PortInformationRequest',
  portId: 0,
  portInformationRequestType: 'ModeInfo'
});

assert.deepEqual([...new Uint8Array(outgoingMessageData)], [5, 0, 33, 0, 1]);
```

## API Reference

```ts
function parseIncomingMessage(
  incomingMessageData: ArrayBuffer
): IncomingMessage;
```

```ts
function serializeOutgoingMessage(
  outgoingMessage: OutgoingMessage
): ArrayBuffer;
```

### `IncomingMessage`

```ts
type IncomingMessage =
  | HubAttachedIoIncomingMessage
  | ErrorIncomingMessage
  | PortInformationIncomingMessage
  | PortModeInformationIncomingMessage
  | PortValueIncomingMessage
  | PortInputFormatIncomingMessage
  | UnknownIncomingMessage;
```

#### [`HubAttachedIoIncomingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#hub-attached-i-o)

<details><summary>Show Type</summary>

```ts
type HubAttachedIoIncomingMessage = {
  readonly messageType: 'HubAttachedIo';
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

interface Port {
  readonly portType: 'External' | 'Internal' | 'Reserved';
  readonly portId: number;
}

type IoType =
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
```

</details>

#### [`ErrorIncomingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/#generic-error-messages)

<details><summary>Show Type</summary>

```ts
interface ErrorIncomingMessage {
  readonly messageType: 'Error';
  readonly commandTypeId: number;
  readonly errorCode: ErrorCode;
}

type ErrorCode =
  | 'Ack'
  | 'Mack'
  | 'BufferOverflow'
  | 'Timeout'
  | 'CommandNotRecognized'
  | 'InvalidUse'
  | 'Overcurrent'
  | 'InternalError'
  | 'Unknown';
```

</details>

#### [`PortInformationIncomingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-information)

<details><summary>Show Type</summary>

```ts
type PortInformationIncomingMessage = {
  readonly messageType: 'PortInformation';
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
```

</details>

#### [`PortModeInformationIncomingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-mode-information)

<details><summary>Show Type</summary>

```ts
type PortModeInformationIncomingMessage = {
  readonly messageType: 'PortModeInformation';
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

interface ValueFormat {
  readonly datasetType: DatasetType;
  readonly numberOfDatasets: number;
}

type DatasetType = 'Int8' | 'Int16' | 'Int32' | 'Float' | 'Unknown';
```

</details>

#### [`PortValueIncomingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-value-single)

<details><summary>Show Type</summary>

```ts
interface PortValueIncomingMessage {
  readonly messageType: 'PortValue';
  readonly portId: number;
  readonly valueData: ArrayBuffer;
}
```

</details>

#### [`PortInputFormatIncomingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-input-format-single)

<details><summary>Show Type</summary>

```ts
interface PortInputFormatIncomingMessage {
  readonly messageType: 'PortInputFormat';
  readonly portId: number;
  readonly modeId: number;
  readonly deltaInterval: number;
  readonly notificationsEnabled: boolean;
}
```

</details>

#### `UnknownIncomingMessage`

<details><summary>Show Type</summary>

```ts
interface UnknownIncomingMessage {
  readonly messageType: 'Unknown';
}
```

</details>

### `OutgoingMessage`

```ts
type OutgoingMessage =
  | PortInformationRequestOutgoingMessage
  | PortModeInformationRequestOutgoingMessage
  | PortInputFormatSetupOutgoingMessage
  | PortOutputCommandOutgoingMessage;
```

#### [`PortInformationRequestOutgoingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-information-request)

<details><summary>Show Type</summary>

```ts
interface PortInformationRequestOutgoingMessage {
  readonly messageType: 'PortInformationRequest';
  readonly portId: number;
  readonly portInformationRequestType: 'PortValue' | 'ModeInfo';
}
```

</details>

#### [`PortModeInformationRequestOutgoingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-mode-information-request)

<details><summary>Show Type</summary>

```ts
interface PortModeInformationRequestOutgoingMessage {
  readonly messageType: 'PortModeInformationRequest';
  readonly portId: number;
  readonly modeId: number;
  readonly portModeInformationRequestType: PortModeInformationRequestType;
}

type PortModeInformationRequestType =
  | 'Name'
  | 'Raw'
  | 'Pct'
  | 'Si'
  | 'Symbol'
  | 'ValueFormat';
```

</details>

#### [`PortInputFormatSetupOutgoingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-input-format-setup-single)

<details><summary>Show Type</summary>

```ts
interface PortInputFormatSetupOutgoingMessage {
  readonly messageType: 'PortInputFormatSetup';
  readonly portId: number;
  readonly modeId: number;
  readonly deltaInterval: number;
  readonly notificationsEnabled: boolean;
}
```

</details>

#### [`PortOutputCommandOutgoingMessage`](https://lego.github.io/lego-ble-wireless-protocol-docs/index.html#port-output-command)

<details><summary>Show Type</summary>

```ts
interface PortOutputCommandOutgoingMessage {
  readonly messageType: 'PortOutputCommand';
  readonly portId: number;
  readonly portOutputSubCommandData: ArrayBuffer;
}
```

</details>

## Development

### Publish A New Release

```
yarn release patch
```

```
yarn release minor
```

```
yarn release major
```

After a new release has been created by pushing the tag, it must be published
via the GitHub UI. This triggers the final publication to npm.

---

Copyright (c) 2020, Clemens Akens. Released under the terms of the
[MIT License](https://github.com/clebert/lego-wireless-protocol/blob/master/LICENSE).
