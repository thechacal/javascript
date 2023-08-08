const dgram = require('dgram');

class ExtendedDatagramPacket {
    constructor(buf, length, sourceAddress, destinationAddress, interfaceIndex) {
        this.buffer = buf;
        this.length = length;
        this.sourceAddress = sourceAddress;
        this.destinationAddress = destinationAddress;
        this.interfaceIndex = interfaceIndex;
    }

    getSourceAddress() {
        return this.sourceAddress;
    }

    getDestinationAddress() {
        return this.destinationAddress;
    }

    getInterfaceIndex() {
        return this.interfaceIndex;
    }
}

class ControlInfo {
    constructor(packet) {
        if (packet instanceof ExtendedDatagramPacket) {
            this.sourceAddress = packet.getSourceAddress();
            this.destinationAddress = packet.getDestinationAddress();
            this.interfaceIndex = packet.getInterfaceIndex();
        }
    }

    getSourceAddress() {
        return this.sourceAddress;
    }

    getDestinationAddress() {
        return this.destinationAddress;
    }

    getInterfaceIndex() {
        return this.interfaceIndex;
    }
}

class UDPServerWithControlInfo {
    constructor(port) {
        this.socket = dgram.createSocket('udp4');
        this.port = port;

        this.socket.on('message', (message, remoteInfo) => {
            const packet = new ExtendedDatagramPacket(message, message.length, remoteInfo.address, 'localhost', 0);
            const controlInfo = new ControlInfo(packet);

            console.log(`Received: ${message.toString()}`);
            console.log(`Source Address: ${controlInfo.getSourceAddress()}`);
            console.log(`Destination Address: ${controlInfo.getDestinationAddress()}`);
            console.log(`Interface Index: ${controlInfo.getInterfaceIndex()}`);
        });

        this.socket.on('error', (err) => {
            console.error('Socket error:', err);
        });
    }

    startServer() {
        this.socket.bind(this.port, () => {
            console.log(`UDP server listening on port ${this.port}`);
        });
    }
}

const port = 12345; // Specify the port number
const server = new UDPServerWithControlInfo(port);
server.startServer();
