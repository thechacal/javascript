/*
A função `BracketCombinations(num)` recebe um número inteiro `num` maior ou igual a zero e deve retornar
a quantidade de combinações válidas que podem ser formadas com `num` pares de parênteses. 
Por exemplo, se o valor de entrada for 3, as combinações possíveis com 3 pares de parênteses são: 
()()(), ()(()), (())(), ((())), e (()()). 
Existem 5 combinações no total quando o valor de entrada é 3, então o programa deve retornar 5.
*/
class BracketCombinations {
    constructor(num) {
        this.num = num;
    }

    calculateCombinations() {
        return this.calculate(this.num);
    }

    calculate(num) {
        if (num === 0) {
            return 1;
        }

        let totalCombinations = 0;

        for (let i = 0; i < num; i++) {
            const leftCombinations = this.calculate(i);
            const rightCombinations = this.calculate(num - i - 1);
            totalCombinations += leftCombinations * rightCombinations;
        }

        return totalCombinations;
    }
}

const num = 3;
const combinations = new BracketCombinations(num);
const result = combinations.calculateCombinations();
console.log(`O número de combinações válidas é: ${result}`);
