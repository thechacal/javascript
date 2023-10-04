/*Usandondo conceitos assíncronos e Promises para realizar operações concorrentes ( threads ). 

Lembre-se de que esta adaptação usa o módulo fs para simular operações de I/O de arquivo e o 
http para simular conexões de rede. A implementação de TcpConnect.connect e outras partes específicas 
dependem do ambiente onde você executará este código. Certifique-se de adaptar o código para suas 
necessidades específicas e ambiente de execução.
*/

const fs = require('fs');
const http = require('http');
const url = require('url');

class File {
    constructor(name, host) {
        this.f_name = name;
        this.f_host = host;
        this.f_fd = -1;
        this.f_flags = 0;
        this.f_tid = null;
    }
}

class WebFetcher {
    constructor() {
        this.MAXFILES = 20;
        this.SERV = '80';
        this.files = Array(this.MAXFILES).fill(null);
        this.nconn = 0;
        this.nfiles = 0;
        this.nlefttoconn = 0;
        this.nlefttoread = 0;
        this.ndone = 0;
        this.ndoneMutex = {};
        this.ndoneLock = {};
        this.ndoneCond = {};
        this.ndoneLock = new Lock();
        this.ndoneCond = this.ndoneLock.newCondition();
    }

    async start(args, maxnconn) {
        this.nfiles = Math.min(args.length - 3, this.MAXFILES);

        for (let i = 0; i < this.nfiles; i++) {
            this.files[i] = new File(args[i + 3], args[1]);
        }

        console.log('nfiles = ' + this.nfiles);

        await this.homePage(args[1], args[2]);

        this.nlefttoread = this.nlefttoconn = this.nfiles;
        this.nconn = 0;

        while (this.nlefttoread > 0) {
            while (this.nconn < maxnconn && this.nlefttoconn > 0) {
                let i;
                for (i = 0; i < this.nfiles; i++) {
                    if (this.files[i].f_flags === 0) {
                        break;
                    }
                }

                if (i === this.nfiles) {
                    console.log('nlefttoconn = ' + this.nlefttoconn + ' but nothing found');
                    return;
                }

                this.files[i].f_flags = 1;
                const file = this.files[i];
                file.f_tid = new WebFetcherRunnable(file);
                file.f_tid.start();
                this.nconn++;
                this.nlefttoconn--;
            }

            this.ndoneLock.lock();
            try {
                while (this.ndone === 0) {
                    await this.ndoneCond.await();
                }

                for (let i = 0; i < this.nfiles; i++) {
                    if ((this.files[i].f_flags & 4) !== 0) {
                        const fptr = this.files[i].f_tid;
                        fptr.f_flags = 8;
                        this.ndone--;
                        this.nconn--;
                        this.nlefttoread--;
                        console.log('thread ' + fptr.f_tid + ' for ' + fptr.f_name + ' done');
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.ndoneLock.unlock();
            }
        }
    }

    async homePage(host, fname) {
        let fd;
        let line;

        fd = await TcpConnect.connect(host, this.SERV);
        const request = `GET ${fname} HTTP/1.0\r\n\r\n`;

        const out = fs.createWriteStream(fd);
        out.write(request);
        out.end();

        const reader = fs.createReadStream(fd);

        reader.on('data', (chunk) => {
            console.log(`read ${chunk.length} bytes of home page`);
        });

        reader.on('end', () => {
            console.log('end-of-file on home page');
        });

        reader.on('error', (err) => {
            console.error(err);
        });
    }
}

class WebFetcherRunnable {
    constructor(file) {
        this.fptr = file;
    }

    start() {
        this.run().catch((err) => {
            console.error(err);
        });
    }

    async run() {
        let fd;
        let line;
        fd = await TcpConnect.connect(this.fptr.f_host, this.SERV);
        this.fptr.f_fd = fd;

        console.log('do_get_read for ' + this.fptr.f_name + ', fd ' + fd + ', thread ' + this.fptr.f_tid);

        this.writeGetCmd(this.fptr);

        const reader = fs.createReadStream(fd);

        reader.on('data', (chunk) => {
            console.log(`read ${chunk.length} bytes from ${this.fptr.f_name}`);
        });

        reader.on('end', () => {
            console.log('end-of-file on ' + this.fptr.f_name);
            this.fptr.f_flags = 4;

            this.ndoneLock.lock();
            try {
                this.ndone++;
                this.ndoneCond.signal();
            } finally {
                this.ndoneLock.unlock();
            }
        });

        reader.on('error', (err) => {
            console.error(err);
        });
    }

    writeGetCmd(fptr) {
        const line = `GET ${fptr.f_name} HTTP/1.0\r\n\r\n`;
        const out = fs.createWriteStream(fptr.f_fd);
        out.write(line);
        out.end();
        console.log('wrote ' + line.length + ' bytes for ' + fptr.f_name);
        fptr.f_flags = 2;
    }
}

class TcpConnect {
    static async connect(host, serv) {
        // Implement the connection logic here (not shown in the provided code)
        // Return a file descriptor or socket for the connection
        return -1;
    }
}

const args = process.argv.slice(2);
if (args.length < 4) {
    console.log('Usage: node WebFetcher <#conns> <IPaddr> <homepage> file1 ...');
} else {
    const maxnconn = parseInt(args[0]);
    const webFetcher = new WebFetcher();
    webFetcher.start(args, maxnconn);
}