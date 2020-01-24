import {serializePortInformationRequest} from './serialize-port-information-request';
import {serializePortInputFormatSetup} from './serialize-port-input-format-setup';
import {serializePortModeInformationRequest} from './serialize-port-mode-information-request';
import {serializePortOutputCommand} from './serialize-port-output-command';
import {OutgoingMessage} from './types';

export * from './types';

export function serializeOutgoingMessage(
  outgoingMessage: OutgoingMessage
): ArrayBuffer {
  switch (outgoingMessage.messageType) {
    case 'PortInformationRequest':
      return serializePortInformationRequest(outgoingMessage);
    case 'PortInputFormatSetup':
      return serializePortInputFormatSetup(outgoingMessage);
    case 'PortModeInformationRequest':
      return serializePortModeInformationRequest(outgoingMessage);
    case 'PortOutputCommand':
      return serializePortOutputCommand(outgoingMessage);
  }
}
