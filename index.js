import { Cliente } from "./Cliente.js"
import { ContaCorrente } from "./Contas/ContaCorrente.js"
import { ContaPoupança } from "./Contas/ContaPoupança.js"
import { ContaSalario } from "./Contas/ContaSalario.js"
import { Gerente } from "./Funcionarios/Gerente.js"
import { Diretor } from "./Funcionarios/Diretor.js"
import { SistemaAutenticacao } from "./SistemaAutenticacao.js"

const cliente1 = new Cliente("Ricardo", 11122233309);

// const contaCorrenteRicardo = new ContaCorrente(cliente1, 1001)
// contaCorrenteRicardo.depositar(500);
// contaCorrenteRicardo.sacar(100);

// const contaPoupança = new ContaPoupança(50, cliente1, 1001);
// contaPoupança.sacar(10)

// const contaSalario = new ContaSalario(cliente1);
// contaSalario.depositar(100);
// contaSalario.sacar(10)

// console.log(contaCorrenteRicardo);
// console.log(contaPoupança);
// console.log(contaSalario)

const diretor = new Diretor("Rodrigo", 10000, 123456789);
diretor.cadastrarSenha("123456");

const gerente = new Gerente("Ricardo", 5000, 1236549871);
gerente.cadastrarSenha("45678")

const cliente = new Cliente( "Lais", 7895632148, "456")

const clienteEstaLogado = SistemaAutenticacao.login(cliente, "456");
const diretorEstaLogado = SistemaAutenticacao.login(diretor, "123456");
const gerenteEstaLogado = SistemaAutenticacao.login(gerente, "45678");

console.log(diretorEstaLogado);
console.log(gerenteEstaLogado);
console.log(clienteEstaLogado);

