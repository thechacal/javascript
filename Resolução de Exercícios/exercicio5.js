/*
A função `CodelandUsernameValidation(str)` recebe o parâmetro `str` e deve determinar se a string
é um nome de usuário válido de acordo com as seguintes regras:

1. O nome de usuário deve ter entre 4 e 25 caracteres.
2. Deve começar com uma letra.
3. Pode conter apenas letras, números e o caractere de sublinhado (underscore).
4. Não pode terminar com um caractere de sublinhado.

Se o nome de usuário for válido, o programa deve retornar a string "true", caso contrário, 
deve retornar a string "false".
*/
class UsernameValidator {
    constructor(str) {
        this.str = str;
    }

    isValidUsername() {
        const length = this.str.length;

        if (length < 4 || length > 25) {
            return false;
        }

        if (!/^[a-zA-Z]/.test(this.str)) {
            return false;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(this.str)) {
            return false;
        }

        const lastChar = this.str[length - 1];
        if (!(/[a-zA-Z0-9]/.test(lastChar)) || lastChar === '_') {
            return false;
        }

        return true;
    }
}

// Teste com exemplos
const validator1 = new UsernameValidator("username123");
console.log(validator1.isValidUsername() ? "true" : "false"); // Saída: true

const validator2 = new UsernameValidator("_invalid");
console.log(validator2.isValidUsername() ? "true" : "false"); // Saída: false

const validator3 = new UsernameValidator("user_name_");
console.log(validator3.isValidUsername() ? "true" : "false"); // Saída: false
