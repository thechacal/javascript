const net = require('net');

const hostname = process.argv[2];
const port = parseInt(process.argv[3]);

if (!hostname || !port) {
    console.error("Usage: node NetworkClient.js <hostname or IPaddress> <service or port#>");
    process.exit(1);
}

const socket = new net.Socket();

socket.connect(port, hostname, () => {
    const peerAddress = socket.remoteAddress;
    const peerPort = socket.remotePort;
    console.log(`Connected to ${peerAddress}:${peerPort}`);
});

socket.on('data', (data) => {
    console.log(`${data.length} bytes from PEEK`);
    console.log(data.toString());
});

socket.on('end', () => {
    socket.destroy();
    console.log("Connection closed by remote host");
});

socket.on('error', (err) => {
    console.error("Error:", err);
});

process.on('SIGINT', () => {
    socket.end();
    console.log("Connection closed by client");
});
