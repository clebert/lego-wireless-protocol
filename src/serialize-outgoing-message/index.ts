import {serializePortInformationRequest} from './serialize-port-information-request';
import {serializePortInputFormatSetup} from './serialize-port-input-format-setup';
import {serializePortModeInformationRequest} from './serialize-port-mode-information-request';
import {serializePortOutputCommand} from './serialize-port-output-command';
import {OutgoingMessage} from './types';

export * from './types';

export function serializeOutgoingMessage(message: OutgoingMessage): Buffer {
  switch (message.messageType) {
    case 'PortInformationRequest':
      return serializePortInformationRequest(message);
    case 'PortInputFormatSetup':
      return serializePortInputFormatSetup(message);
    case 'PortModeInformationRequest':
      return serializePortModeInformationRequest(message);
    case 'PortOutputCommand':
      return serializePortOutputCommand(message);
  }
}
