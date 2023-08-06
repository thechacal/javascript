/*
Se listarmos todos os números naturais abaixo de 10 que são múltiplos de 3 ou 5, obtemos 3, 5, 6 e 9. 
A soma desses múltiplos é 23.
Encontre a soma de todos os múltiplos de 3 ou 5 abaixo de 1000.
*/
class MultiplesSum {
    constructor(limit) {
        this.limit = limit;
    }

    findMultiplesSum() {
        let sum = 0;

        for (let i = 1; i < this.limit; i++) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }

        return sum;
    }
}

// Encontre a soma dos múltiplos de 3 ou 5 abaixo de 1000
const multiplesSum = new MultiplesSum(1000);
console.log(multiplesSum.findMultiplesSum()); // Saída: 233168
