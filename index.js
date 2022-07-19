class Cliente {
    nome;
    cpf;
}
class ContaCorrente {
    agencia;
    _saldo = 0; //_ quer dizer privado, pra evitar que o saldo seja mexido fora dessa classe
    sacar(valor) {
        if(this._saldo >= valor) {
            this._saldo -= valor;
            return valor;
        }
    } //_ é uma convenção, ele não esta privado realmente
    
    depositar(valor) {
        if( valor <= 0) return;
        this._saldo += valor;
    }
}

const cliente1 = new Cliente();
cliente1.nome = "Ricardo";
cliente1.cpf = "11122233309";

const cliente2 = new Cliente();
cliente2.nome = "Alice";
cliente2.cpf = "88822233309";

const contaCorrenteRicardo = new ContaCorrente()
//contaCorrenteRicardo.saldo = 0;
contaCorrenteRicardo.agencia = 1001;


contaCorrenteRicardo.depositar(100);
contaCorrenteRicardo.sacar(50);
console.log(contaCorrenteRicardo);