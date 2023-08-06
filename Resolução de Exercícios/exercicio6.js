/*
A função `FindIntersection(strArr)` recebe um array de strings chamado `strArr`, que conterá 2 elementos: 
o primeiro elemento representa uma lista de números separados por vírgula, ordenados em ordem crescente; 
o segundo elemento representa outra lista de números separados por vírgula, também ordenados. 
O objetivo é retornar uma string contendo os números que ocorrem em ambos os elementos de `strArr`, 
em ordem crescente e separados por vírgula. Se não houver interseção, a função deve retornar a string "false".
*/
class IntersectionFinder {
    constructor(strArr) {
        this.strArr = strArr;
    }

    findIntersection() {
        const list1 = this.strArr[0].split(', ').map(Number);
        const list2 = this.strArr[1].split(', ').map(Number);

        const intersection = list1.filter(num => list2.includes(num));
        intersection.sort((a, b) => a - b);

        return intersection.length > 0 ? intersection.join(',') : "false";
    }
}

// Teste com exemplo ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]
const finder1 = new IntersectionFinder(["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]);
console.log(finder1.findIntersection()); // Saída: "1,4,13"

// Teste com exemplo ["1, 2, 4, 5, 6", "3, 7, 8, 9, 10"]
const finder2 = new IntersectionFinder(["1, 2, 4, 5, 6", "3, 7, 8, 9, 10"]);
console.log(finder2.findIntersection()); // Saída: "false"
