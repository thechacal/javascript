/*
Exercício 1
Uma empresa comercial possui um programa para controle das receitas e despesas em seus 10 projetos. 
Os projetos são numerados de 0 até 9. 
Faça um programa C que controle a entrada e saída de recursos dos projetos. 
O programa deverá ler um conjunto de informações contendo: 
Número do projeto, valor, tipo despesa ("R" - Receita e "D" - Despesa). 
O programa termina quando o valor do código do projeto for igual a -1. 
Sabe-se que Receita deve ser somada ao saldo do projeto e despesa subtraída do saldo do projeto. 
Ao final do programa, imprirmir o saldo final de cada projeto.

Dica: Usar uma estrutura do tipo vetor para controlar os saldos dos projetos. 
Usar o conceito de struct para agrupar as informações lidas.
*/
class Projeto {
    constructor(num) {
        this.numero = num;
        this.saldo = 0;
    }

    atualizarSaldo(valor, tipoDespesa) {
        if (tipoDespesa.toUpperCase() === 'R') {
            this.saldo += valor;
        } else if (tipoDespesa.toUpperCase() === 'D') {
            this.saldo -= valor;
        } else {
            console.log("Tipo de despesa inválido! Use 'R' para Receita ou 'D' para Despesa.");
        }
    }
}

class ControleProjetos {
    constructor() {
        this.projetos = [];
    }

    adicionarProjeto(projeto) {
        this.projetos.push(projeto);
    }

    executar() {
        while (true) {
            let numeroProjeto = parseInt(prompt("Digite o número do projeto (-1 para encerrar):"));

            if (numeroProjeto === -1) {
                break;
            }

            let valor = parseFloat(prompt("Digite o valor:"));
            let tipoDespesa = prompt("Digite o tipo de despesa (R - Receita, D - Despesa):").toUpperCase();

            let projetoEncontrado = false;
            for (let projeto of this.projetos) {
                if (projeto.numero === numeroProjeto) {
                    projeto.atualizarSaldo(valor, tipoDespesa);
                    projetoEncontrado = true;
                    break;
                }
            }

            if (!projetoEncontrado) {
                console.log("Projeto não encontrado!");
            }
        }
    }

    imprimirSaldos() {
        console.log("\nSaldo final de cada projeto:");
        for (let projeto of this.projetos) {
            console.log(`Projeto ${projeto.numero}: R$ ${projeto.saldo}`);
        }
    }
}

let controleProjetos = new ControleProjetos();

const NUM_PROJETOS = 10;
for (let i = 0; i < NUM_PROJETOS; i++) {
    controleProjetos.adicionarProjeto(new Projeto(i));
}

controleProjetos.executar();
controleProjetos.imprimirSaldos();
