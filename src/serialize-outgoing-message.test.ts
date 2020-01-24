import {
  OutgoingMessage,
  serializeOutgoingMessage
} from './serialize-outgoing-message';

function assert(
  outgoingMessageData: number[],
  outgoingMessage: OutgoingMessage
): void {
  expect([
    ...new Uint8Array(serializeOutgoingMessage(outgoingMessage))
  ]).toEqual(outgoingMessageData);
}

describe('serializeOutgoingMessage()', () => {
  test('PortInformationRequestOutgoingMessage', () => {
    assert([5, 0, 33, 0, 1], {
      messageType: 'PortInformationRequest',
      portId: 0,
      portInformationRequestType: 'ModeInfo'
    });
  });

  test('PortModeInformationRequestOutgoingMessage', () => {
    assert([6, 0, 34, 0, 1, 0], {
      messageType: 'PortModeInformationRequest',
      portId: 0,
      modeId: 1,
      portModeInformationRequestType: 'Name'
    });
  });

  test('PortInputFormatSetupOutgoingMessage', () => {
    assert([10, 0, 65, 0, 1, 1, 0, 0, 0, 1], {
      messageType: 'PortInputFormatSetup',
      portId: 0,
      modeId: 1,
      deltaInterval: 1,
      notificationsEnabled: true
    });
  });

  test('PortOutputCommandOutgoingMessage', () => {
    assert([10, 0, 129, 0, 16, 81, 1, 255, 0, 0], {
      messageType: 'PortOutputCommand',
      portId: 0,
      portOutputSubCommandData: Uint8Array.from([81, 1, 255, 0, 0]).buffer
    });
  });
});
