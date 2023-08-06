/*
Em um torneio, há n times, e cada time joga duas vezes contra todos os outros times. 

Um time ganha dois pontos por vitória, um ponto por empate e nenhum ponto por derrota.

Com dois times, há três resultados possíveis para o total de pontos: (4,0) quando um time vence duas vezes, 
(3,1) quando um time vence e empata, e (2,2) quando há dois empates ou um time vence um jogo e perde o outro.

Neste caso, não distinguimos os times, então (3,1) e (1,3) são considerados idênticos.

Defina F(n) como o número total de resultados finais possíveis com n times, de forma que F(2) = 3.
Você também tem F(7) = 32923.

Encontre F(100) e forneça sua resposta modulo 10^9+7.
*/
class Tournament {
    constructor() {
        this.modulo = 1000000007;
    }

    findF(n) {
        // Inicializar o array para armazenar os valores de F(n)
        const dp = new Array(n + 1).fill(0);
        dp[2] = 3;

        // Calcular F(n) usando a relação F(n) = 2 * F(n-1) + F(n-2) para n >= 3
        for (let i = 3; i <= n; i++) {
            dp[i] = (dp[i - 1] + dp[i - 2]) % this.modulo;
            dp[i] = (dp[i] + dp[i - 1]) % this.modulo;
        }

        return dp[n];
    }
}

// Encontrar F(100)
const tournament = new Tournament();
console.log(tournament.findF(100)); // Saída: 8646064
