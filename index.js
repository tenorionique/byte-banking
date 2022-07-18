class Cliente {
    nome;
    cpf;
    agencia;
    saldo;
    rg;
}

const cliente1 = new Cliente();
const cliente2 = new Cliente();

cliente1.nome = "Ricardo";
cliente1.cpf = "11122233309";
cliente1.agencia = 1001;
cliente1.saldo = 0;
cliente1.rg= 12345678;

cliente2.nome = "Alice";
cliente2.cpf = "88822233309";
cliente2.agencia = 1001;
cliente2.saldo = 0;

console.log(cliente1, cliente2);
