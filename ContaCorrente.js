export class ContaCorrente {
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