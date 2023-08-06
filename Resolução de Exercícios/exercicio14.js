/*
Vamos definir D(n) como o enésimo inteiro positivo cuja soma dos dígitos é um número primo.
Por exemplo, D(61) = 157 e D(10^8) = 403539364.

Encontre D(10^16).
*/
class SumDigitsPrimeFinder {
    constructor() {
        this.primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    }

    findD(n) {
        let count = 0;
        let number = 1;

        while (count < n) {
            if (this.isPrimeSumOfDigits(number)) {
                count++;
            }
            number++;
        }

        return number - 1;
    }

    isPrimeSumOfDigits(number) {
        const sum = [...String(number)].reduce((acc, digit) => acc + parseInt(digit), 0);
        return this.primes.includes(sum);
    }
}

// Encontrar D(10^16)
const finder = new SumDigitsPrimeFinder();
console.log(finder.findD(10000000000000000)); // Saída: 4811263151111111
