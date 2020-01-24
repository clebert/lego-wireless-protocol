const assert = require('assert');
const {parseIncomingMessage, serializeOutgoingMessage} = require('./lib');

const incomingMessage = parseIncomingMessage(
  Buffer.from([9, 0, 4, 16, 2, 39, 0, 0, 1])
);

assert.deepEqual(incomingMessage, {
  messageType: 'HubAttachedIo',
  port: {portType: 'External', portId: 16},
  eventType: 'HubAttachedVirtualIo',
  ioType: 'InternalMotorWithTacho',
  portA: {portType: 'External', portId: 0},
  portB: {portType: 'External', portId: 1}
});

const data = serializeOutgoingMessage({
  messageType: 'PortInformationRequest',
  portId: 0,
  portInformationRequestType: 'ModeInfo'
});

assert.deepEqual(data, Buffer.from([5, 0, 33, 0, 1]));
