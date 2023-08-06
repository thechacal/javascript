/*
A função `BracketMatcher(str)` recebe a string `str` como parâmetro e deve retornar 1 se os parênteses
estiverem corretamente combinados e cada um estiver devidamente fechado. Caso contrário, deve retornar 0. 
Por exemplo: se `str` for "(hello (world))", o resultado deve ser 1, 
mas se `str` for "((hello (world))", o resultado deve ser 0 porque os parênteses não estão corretamente 
combinados. Apenas os caracteres "(" e ")" serão usados como parênteses. 
Se `str` não contiver parênteses, a função deve retornar 1.
*/
class BracketMatcher {
    constructor(str) {
        this.str = str;
        this.openCount = 0;
    }

    isCorrectlyMatched() {
        for (let i = 0; i < this.str.length; i++) {
            const char = this.str[i];

            if (char === '(') {
                this.openCount++;
            } else if (char === ')') {
                if (this.openCount === 0) {
                    return false;
                }
                this.openCount--;
            }
        }

        return this.openCount === 0;
    }
}

// Teste com exemplos
const matcher1 = new BracketMatcher("(hello (world))");
console.log(matcher1.isCorrectlyMatched() ? "1" : "0"); // Saída: 1

const matcher2 = new BracketMatcher("((hello (world))");
console.log(matcher2.isCorrectlyMatched() ? "1" : "0"); // Saída: 0

const matcher3 = new BracketMatcher("hello world");
console.log(matcher3.isCorrectlyMatched() ? "1" : "0"); // Saída: 1 (nenhum parêntese)
