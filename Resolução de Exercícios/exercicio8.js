/*
A função `FirstReverse(str)` recebe o parâmetro `str` e deve retornar a string em ordem reversa. 
Por exemplo, se a string de entrada for "Hello World and Coders", o programa deve retornar a 
string "sredoC dna dlroW olleH".
*/
class Reverser {
    constructor(str) {
        this.str = str;
    }

    reverseString() {
        return this.str.split('').reverse().join('');
    }
}

// Teste com exemplo "Hello World and Coders"
const reverser = new Reverser("Hello World and Coders");
console.log(reverser.reverseString()); // Saída: "sredoC dna dlroW olleH"
