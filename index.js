import { Cliente } from "./Cliente.js"
import { ContaCorrente } from "./Contas/ContaCorrente.js"
import { ContaPoupança } from "./Contas/ContaPoupança.js"
import { ContaSalario } from "./Contas/ContaSalario.js"

const cliente1 = new Cliente("Ricardo", 11122233309);

const contaCorrenteRicardo = new ContaCorrente(cliente1, 1001)
contaCorrenteRicardo.depositar(500);
contaCorrenteRicardo.sacar(100);

const contaPoupança = new ContaPoupança(50, cliente1, 1001);
contaPoupança.sacar(10)

const contaSalario = new ContaSalario(cliente1);
contaSalario.depositar(100);
contaSalario.sacar(10)

console.log(contaCorrenteRicardo);
console.log(contaPoupança);
console.log(contaSalario)
