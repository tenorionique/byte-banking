import { Conta } from "./Conta.js"
export class ContaPoupança extends Conta {
    constructor(saldoInicial, cliente, agencia) {
        super( saldoInicial, cliente, agencia)
    }
}