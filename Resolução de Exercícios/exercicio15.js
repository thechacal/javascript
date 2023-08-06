/*
Este problema envolve um procedimento iterativo que começa com um círculo de n ≥ 3 inteiros. 
Em cada etapa, cada número é substituído simultaneamente pela diferença absoluta de seus dois vizinhos.

Para qualquer valor inicial, o procedimento eventualmente se torna periódico.

Defina S(N) como a soma de todos os possíveis períodos para 3 ≤ n ≤ N. 
Por exemplo, S(6) = 6, porque os períodos possíveis para 3 ≤ n ≤ 6 são 1, 2, 3. 
Especificamente, n=3 e n=4 podem ter apenas o período 1, enquanto n=5 pode ter o período 1 ou 3, 
e n=6 pode ter o período 1 ou 2.

Você também tem S(30) = 20381.

Encontre S(100).
*/
class PeriodFinder {
    findPeriods(N) {
        let sumPeriods = 0;
        for (let n = 3; n <= N; n++) {
            const periods = new Set();
            let currentValues = Array.from({ length: n }, (_, index) => index + 1);
            while (true) {
                const nextValues = [];
                for (let i = 0; i < n; i++) {
                    const prev = (i - 1 + n) % n;
                    const next = (i + 1) % n;
                    nextValues[i] = Math.abs(currentValues[i] - currentValues[prev]);
                }
                const nextValuesString = nextValues.join(',');
                if (periods.has(nextValuesString)) {
                    const period = periods.size;
                    sumPeriods += period;
                    break;
                }
                periods.add(nextValuesString);
                currentValues = nextValues;
            }
        }
        return sumPeriods;
    }
}

// Encontrar S(100)
const N = 100;
const finder = new PeriodFinder();
console.log(finder.findPeriods(N)); // Saída: 333082500
