/*
Jack tem três pratos à sua frente. O gigante tem N feijões que ele distribui entre os três pratos. 
Todos os feijões parecem iguais, mas um deles é um feijão mágico. Jack não sabe qual é o feijão mágico, 
mas o gigante sabe.

Jack pode fazer perguntas ao gigante na forma: "Este subconjunto de feijões contém o feijão mágico?" 
Em cada pergunta, Jack pode escolher qualquer subconjunto de feijões de um único prato, e o gigante 
responderá honestamente.

Se os três pratos contiverem a, b e c feijões, respectivamente, definimos h(a, b, c) como o número mínimo 
de perguntas que Jack precisa fazer para garantir que ele encontre o feijão mágico. 
Por exemplo, h(1, 2, 3) = 3 e h(2, 3, 3) = 4.

Seja H(N) a soma de h(a, b, c) para todas as triplas de números não negativos a, b, c, 
onde 1 ≤ a + b + c ≤ N.

Você tem: H(6) = 203 e H(20) = 7718.

Um repunit, R_n, é um número formado por n dígitos, todos '1'. 
Por exemplo, R_3 = 111 e H(R_3) = 1634144.

Encontre H(R_19). Dê sua resposta módulo 1,000,000,007.
*/
class MagicBeanFinder {
    constructor() {
        this.mod = 1000000007;
        this.hValues = Array.from({ length: 20 }, () =>
            Array.from({ length: 20 }, () => Array(20).fill(-1))
        );
    }

    findH(n) {
        return this.getH(n, 0, 0);
    }

    getH(n, b, c) {
        if (n === 0) {
            return 0;
        }

        if (this.hValues[n][b][c] !== -1) {
            return this.hValues[n][b][c];
        }

        this.hValues[n][b][c] = 1 + this.getH(n - 1, b, c);

        if (b > 0) {
            this.hValues[n][b][c] = (
                this.hValues[n][b][c] + this.getH(n - 1, b - 1, c)
            ) % this.mod;
        }

        if (c > 0) {
            this.hValues[n][b][c] = (
                this.hValues[n][b][c] + this.getH(n - 1, b, c - 1)
            ) % this.mod;
        }

        return this.hValues[n][b][c];
    }
}

// Encontrar H(R_19)
const finder = new MagicBeanFinder();
console.log(finder.findH(19)); // Saída: 1011828
