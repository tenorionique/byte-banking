## 1. Conhecendo o problema do cliente

# 1.1 Relembrando o projeto

    - O cliente banco agora quer que a conta tenha opções, conta poupança contendo saldo, saber quem é o cliente, quem é a agencia
    - Explicou que por boa pratica, e mostrou o site do MD sobre classes, que propriedades de instâncias devem ser definidas dentro dos métodos da classe:
        class Retangulo {
            constructor(altura, largura) {
                this.altura = altura;
                this.largura = largura;
            }
        }
    - Então no nosso Cliente, tirou o cpf e o nome declarados em cima, e deixou eles apenas dentro do construtor. 
    - Ja declarou as propriedades dentro do construtor ContaPoupança. 
    - Ficamos com um código duplicado em ContaCorrente e ContaPoupança, e isso não é legal! Como arrumar isso?
    (talvez eu tenha esquecido de copiar o código de contacorrente e colar em contapoupança igual o professor, ele copiou todos os metodos de um no outro, foi isso que ficou duplicado)
    
# 1.2 Compartilhando código

    -  Pra remover o código duplicado, vai crir um arquivo com uma classe Conta, com a base do código que é utilizada entre as outras duas classes.
    - Agora no index não instanciamos mais new ContaCorrente() ou new ContaPoupança(), apenas new Conta();
    - Ok, temos um código compartilhado, mas nem sempre conta corrente e conta poupança vão se comportar da mesma forma
    - Segundo problema, agora no meu console.log não sei mais distinguir qual conta é corrente ou poupança pois elas vem com um nome só Conta
    - Esses são problemas gerados por códigos extremamente compartilhados

## 2. Herança

## 3. Classes Abstratas

## 4. Sistema Interno

## 5. Interfaces e DuckType