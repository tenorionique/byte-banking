# 1. Conhecendo o problema do cliente

- Essa é o guia de explicação de cada video e exercicio do curso JavaScript: Interfaces e Heranças em Orientação a Objetos, utilizando o projeto byte-bank, iniciado no curso anterior a esse. 

## 1.1 Relembrando o projeto

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
    
## 1.2 Compartilhando código

-  Pra remover o código duplicado, vai crir um arquivo com uma classe Conta, com a base do código que é utilizada entre as outras duas classes.
- Agora no index não instanciamos mais new ContaCorrente() ou new ContaPoupança(), apenas new Conta();
 - Ok, temos um código compartilhado, mas nem sempre conta corrente e conta poupança vão se comportar da mesma forma
- Segundo problema, agora no meu console.log não sei mais distinguir qual conta é corrente ou poupança pois elas vem com um nome só Conta
- Esses são problemas gerados por códigos extremamente compartilhados

# 2. Herança

## 2.2 Herança (vídeo)

- Colocou os setters e getters que estavam dentro da contacorrente para a conta
- Quer que a classe Conta Corrente tenha uma maneira diferente de sacar, atualmente tem uma taxa lá no código mas que era pra ser apenas para Conta Poupança. 
- No constructor de Conta, definir agora o tipo da conta - tipo 
- Agora no método sacar de Conta, faz a verificação de tipo, se for == corrente a taxa é 1.1
    o valor sacado é taxa * valor (sendo valor parametro passado ao método) e depois outro if verificando se o saldo é maior que esse valor sacado, se sim, deixa sacar. 
- Colocou outras regras pra conta salario, empresarial. E um if em depositar() pra não permitir deposito por conta salario - por isso tem um return vazio dentro do if **lembrando**
- Muitos ifs pra cada variação de conta, agora no index também temos que mudar informações pra passar o tipo da conta no instanciamento dos objetos. 
- O Código esta muito frágil. 
- Como compartilhar código entre as contas sem deixar o código frágil?
- Vamos escrever na classe ContaCorrente que ela extende Conta - extends
- A classe ContaCorrente vai herdar tudo que esta dentro da classe Conta, é como se o código estivesse escrito dentro da ContaCorrente. ContaCorrente é filha de Conta. 
- Agora deixamos apenas o construtor realmente escrito dentro da classe ContaCorrente porem não precisamos mais disso: 
        this.cliente = cliente;
        this.agencia = agencia;
        this._saldo = 0;
- Também já se encontram na Conta.
- Fazer a mesma coisa em ContaPoupança - extende de Conta
- Sempre que a gente Herda de uma Classe essa herança como acontece em ContaCorrente, para o JavaScript ele precisa criar  o objeto Conta pra falar para ContaCorrente - você herda todas essas propriedades na hora que você for construir com o seu constructor, e pra isso precisamos chamar o constructor da classe Conta. Só que normalmente a gente chama o constructor com o new, só que não faz sentido eu colocar um new Conta() dentro do constructor de ContaCorrente - dentro de uma Classe. Entao fazemos do super(), e nesse caso ele vai chamar o construtor da classe Mãe. 
- Não é sempre que o super() vai chamar o constructor de outra Classe. Poderia ser um método também. 
    - Ao passsar o mouse por cima do super() podemos ver o que ele esta chamando da outra classe, e o que ele precisa receber por parametro
            
        constructor(cliente, agencia) {
            super(0, cliente, agencia);
            ContaCorrente.numeroDeContas += 1; //conta quantas contas foram criadas usando static, isso vem lá do curso 1. 
        }
    }

- Sempre atentar na ordem que os parametros estão sendo passados pra não receber erros no objeto. 
- Mesma coisa foi feita para ContaPoupança 

## 2.3Exercicio
- Qual a sintaxe do JavaScript para herdarmos de uma classe?
- class Carro extends Veiculo
- dessa forma a classe carro herda as propriedades e métodos da classe Veículo

## 2.4 Super e sobrescrita

- Relembrando: o super() faz uma referencia a classe que estamos extendendo, a classe Mãe. No exemplo anterior o super() estava recebendo o constructor da classe Mãe Conta. 
- Consigo chamar  metodos com o super também. 
- Exemplo: coloquei um metodo em Conta chamado teste que tem um console.log
        teste() {
            console.log("teste na classe conta")
        }
- e na conta corrente chamei o método: 
        teste() {
            console.log("teste na classe conta corrente")
        }
- Podemos observar dois comportamentos: se eu executar agora do jeito que esta, no index fizer:
    contaCorrenteRicardo.teste()
    - e no terminar node .\index.js
    - o resultado sera: teste na classe conta corrente. Não vou receber o console.log(teste na classe conta) que vem da classe Mãe Conta

- se eu colocar o super no método acima super().teste
            teste() {
                super().teste
                console.log("teste na classe conta corrente")
            }
    
    - contaCorrenteRicardo.teste()
    - e no terminar node .\index.js
    - Então eu recebo os dois consoles.log da conta corrente e da conta. 

  - O que isso quer dizer? estamos sobrescrevendo um comportamento que existe na minha Classse Mãe, para especializar ele. Herança serve muito pra isso, pra gente especializar o comportamento.
  - Então eu vou pegar um código compartilhado do que eu quero compartilhar e eu vou especializar o que eu precisar. 
  - Podemos resolver o problema da regra da taxa de saque pra cada tipo de conta, agora! 
  - Chamei o metodo sacar() na ContaCorrente, e mudei a regra da taxa para 1.1, então toda vez que eu saco em uma contaCorrente, meu saldo total vai ser saldo = saldoatual - (saque+taxa). Assim sobrescrevemos o sacar(), colocamos outro comportamento nele. 

## 2.5 Exercício

Douglas começou a testar o que aprendeu com herança e escreveu o código abaixo:
    class Funcionario{
        getBonificacao(){
            return 100;
        }
    }
    class Diretor extends Funcionario{
        getBonificacao(){
            return 200;
        }
    }
    class DiretorTI extends Diretor{

    }

O problema é que quando ele instanciou um DiretorTI e chamou o método GetBonificacao ele recebeu o valor de 200 e não de 100 como ele esperava. Por que isso aconteceu?

- Só acontece porque a classe DiretorTI não sobrescreveu o método getBonificacao: Sim, se ele sobrescrever esse método a classe funcionará da maneira que ele espera. Porém esse código estará sendo sobrescrito em todas as camadas da hierarquia de classes. Será que é uma boa opção?
- Isso acontece porque a classe DiretorTI herda da classe Diretor e ela está sobrescrevendo o método getBonificacao da classe `Funcionário.: Isso mesmo! Com a herança podemos herdar classes que herdam de outras classes. E conforme essa cadeia cresce a complexidade do código tbm cresce. Por isso é considerada uma má prática criarmos árvores de herança muito profundas.

## 2.6 Privado e Protegido

- Vimos que podemos sobrescrever comportamentos na nossa classe Mãe, chamamos o nomedometodo () {// codico com comportamento que sobrescrever sem chamar super nenhuma }
- E pra chamar o comportamento padrão da classe mãe, chamamos  nomedometodo { super.nomedometodo() }
- Mas se olharmos o que fizemos, ainda temos uma repetição de código entre ContaCorrente e Conta, pois no método sacar, a unica linha que difere os dois é a let taxa = 1.1 e no outro let taxa = 1. Como resolver esse problema?
-  Na Conta, vou criar um método privado _sacar(), lembrando que sacar e _sacar não sao a mesma coisa
-  Copio o código para _sacar():
        const valorSacado = taxa * valor
        if(this._saldo >= valorSacado) {
            this._saldo -= valorSacado;
            return valorSacado;
        }
        return 0 //código acrescentado para caso não entre no if

- Sem esquecer os parametros de _sacar(valor, taxa)
- Agora vou em sacar(valor) retiro o codigo duplicado que ja esta em _sacar, fico apenas com taxa e escrevo this._sacar(valor, taxa), ficou assim:

        sacar(valor) {
            let taxa = 1
            return this._sacar(valor, taxa)      

    }
- Dessa forma temos um método sacar que é publico, consumindo um método privado passando pra ele os valores que a gente precisa. 
- e vamos retornar em sacar, o que o metodo _sacar nos retorna. Então quem chamar sacar, tem o retorno de _sacar, um publico usando um privado. Em vez de ter tudo junto e precisar duplicar código. 

- Mas se _sacar é privado, poderemos utilizar ele na ContaCorrente, os metodos e atributos privados não deveriam ficar apenas dentro de sua classe? Nesse caso como estamos trabalhando com heranças, podemos utilizar o método privado lá na classe filha.
- Então nossa classe ContaCorrente vai ficar: 
    sacar(valor) {
        let taxa = 1.1      
        return this._sacar(valor, taxa);
    }
    - Não estamos sobrescrevendo o método, então poderiamos utilizar o return super.sacar()
    - Dessa forma não temos mais a duplicação de código, pois uma parte foi abstraida para uma metodo privado.
# 3. Classes Abstratas

# 4. Sistema Interno

# 5. Interfaces e DuckType