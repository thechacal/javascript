/*
A função `LongestWord(sen)` recebe o parâmetro `sen` e deve retornar a palavra mais longa na string. 
Se houver duas ou mais palavras com o mesmo comprimento, deve-se retornar a primeira palavra da string
com esse comprimento. A função deve ignorar pontuação e assume que `sen` não estará vazio. 
As palavras também podem conter números, por exemplo, "Hello world123 567".
*/
class LongestWordFinder {
    constructor(sen) {
        this.sen = sen;
    }

    findLongestWord() {
        const words = this.sen.split(/\W+/);
        let longestWord = '';

        for (const word of words) {
            if (word.length > longestWord.length) {
                longestWord = word;
            }
        }

        return longestWord;
    }
}

// Encontrar a palavra mais longa na string
const finder = new LongestWordFinder("Hello world123 567");
console.log(finder.findLongestWord()); // Saída: "world123"
