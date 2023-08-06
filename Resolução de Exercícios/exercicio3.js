/*
A função `MinWindowSubstring(strArr)` recebe um array de strings `strArr`, que conterá apenas duas strings. 
O primeiro parâmetro será a string N e o segundo parâmetro será uma string K com alguns caracteres. 
O objetivo é determinar a menor substring de N que contenha todos os caracteres em K.

Por exemplo: se `strArr` for ["aaabaaddae", "aed"], 
a menor substring de N que contém os caracteres "a", "e" e "d" é "dae", localizada no final da string. 
Portanto, para este exemplo, o programa deve retornar a string "dae".

Outro exemplo: se `strArr` for ["aabdccdbcacd", "aad"], a menor substring de N que contém todos os caracteres
em K é "aabd", localizada no início da string. 
Ambas as strings terão um comprimento entre 1 e 50 caracteres, e todos os caracteres de K existirão 
em algum lugar da string N. Ambas as strings conterão apenas caracteres alfabéticos minúsculos.
*/
class MinWindowSubstringSolver {
    constructor(strArr) {
        this.N = strArr[0];
        this.K = strArr[1];
    }

    findMinWindowSubstring() {
        const charCount = new Map();
        let windowStart = 0;
        let windowSize = Number.MAX_SAFE_INTEGER;
        let minWindow = "";

        for (const char of this.K) {
            charCount.set(char, 0);
        }

        const requiredChars = charCount.size;

        let left = 0;
        let right = 0;
        let formedChars = 0;

        while (right < this.N.length) {
            const rightChar = this.N[right];

            if (charCount.has(rightChar)) {
                charCount.set(rightChar, charCount.get(rightChar) + 1);
                if (charCount.get(rightChar) === 1) {
                    formedChars++;
                }
            }

            while (formedChars === requiredChars && left <= right) {
                const currentWindowSize = right - left + 1;
                if (currentWindowSize < windowSize) {
                    windowSize = currentWindowSize;
                    windowStart = left;
                }

                const leftChar = this.N[left];

                if (charCount.has(leftChar)) {
                    charCount.set(leftChar, charCount.get(leftChar) - 1);
                    if (charCount.get(leftChar) === 0) {
                        formedChars--;
                    }
                }

                left++;
            }

            right++;
        }

        if (windowSize === Number.MAX_SAFE_INTEGER) {
            return "";
        } else {
            return this.N.substring(windowStart, windowStart + windowSize);
        }
    }
}

const strArr1 = ["aaabaaddae", "aed"];
const solver1 = new MinWindowSubstringSolver(strArr1);
console.log(solver1.findMinWindowSubstring()); // Output: "dae"
