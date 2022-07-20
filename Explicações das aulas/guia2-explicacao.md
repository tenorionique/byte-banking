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

## 2.4 Super e sobrescrita **é poliformismo**

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

## 3.1 Propriedade constructor

- Agora temos três classes: Conta, ContaCorrente, ContaPoupança. Mas nossa classe Conta não conversa com a gente exatamente do jeito que o byte bank quer, ela não me diz muita coisa. Ela foi criada para ser herdada, para depois termos a especialização dela.Então não faz sentido instanciar Conta no nosso projeto. Mas do jeito que esta agora, qualquer um pode chegar e instancia-la. Como resolver isso, previnir que isso aconteça?

- Toda vez que alguém tentar dar um new Conta eu quero bloquear, eu não quero fazer isso acontecer. Ou pelo menos, inicialmente, eu quero dar um aviso.
- O que eu vou fazer? Vou vir no Conta.js e vou falar, if(this.constructor == Conta), se o meu construtor for do tipo Conta, eu vou dar um console.log e falar "Você não deveria instanciar um objeto do tipo conta"
-  E aqui eu estou falando this.constructor porque ele salva quem foi o construtor inicialmente chamado
    export class Conta {
        constructor(saldoInicial, cliente, agencia) {
            this._saldo = saldoInicial;
            this._cliente = cliente;
            this._agencia = agencia;
            if(this.constructor == Conta) {
                console.log("Você não deveria instanciar um objeto do tipo conta")
            }
        }
- O console.log(this.constructor) podemos ver que o construtor, foi chamado através de uma classe filha ou uma classe mãe, então se ele for chamado pela classe mãe Conta por isso o if(this.constructor == Conta). Aí joga a mensagem no console.

## 3.2 Classes Abstratas
- O que fizemos anteriormente só nos gera um aviso, e o dev pode muito bem ignora-lo, então nosso problema ainda persiste de ser possivel instanciar a classe Conta;
- console é uma classe e ao dar ctrl + space no console. podemos ver o autocomplete e varios metodos dessa classe, sendo um deles o .error() mas só utilizando isso, também não estoura um erro no terminal igual quando apagamos uma info importante e tomamos um 'referenceError' ou alguma outra.
- Maneira mais certa de arrumar isso: 
    export class Conta {
        constructor(saldoInicial, cliente, agencia) {
            if(this.constructor == Conta) {
            throw new Error("Você não deveria instanciar um objeto do tipo Conta diretamente") 
            }
            this._saldo = saldoInicial;
            this._cliente = cliente;
            this._agencia = agencia;
    }

- Colocamos a verificação antes das chamadas dos this.
- E dentro do escopo do if: ao invés de dar um console.error, eu vou criar um novo erro. Aqui eu vou lançar, então vou dar um throw, nós vamos lançar um novo erro para o meu programa, eu vou lançar um novo, new Error. E nós temos uma classe chamada Error, que é a classe padrão do JavaScript para usarmos quando queremos lançar erros.
- por enquanto, se quisermos parar a execução do nosso programa em algum ponto, podemos dar um throw em um novo objeto do tipo erro.
- Inclusive, esse tipo de classe que é pensada para não ser instanciada diretamente, como a nossa Conta, é normalmente chamada de **classe abstrata**, é uma classe que não pode ser instanciada. Então, vou escrever um comentário "//Classe abstrata" no início do código de Conta.
    -  Ela só funciona para ser herdada, **uma classe abstrata nunca pode ser construída diretamente, nunca podemos dar um new nela, nunca vai ter uma instância dessa própria classe**, mas ela **pode ser herdada**, assim como temos nossa ContaCorrente que herda daquela classe abstrata chamada Conta.

## 4.3 Exericio - Design de código

Júlia está criando um código para a empresa de sua mãe e ela precisa cadastrar os funcionários da empresa. Com isso ela criou o seguinte código:

    class Funcionario {
        constructor(nome, cpf, salario) {
            this.nome = nome;
            this.cpf = cpf;
            this._salario = salario;
            this._bonificacao;
        }
        }

        class Gerente extends Funcionario {
        constructor(nome, cpf) {
            super(nome, cpf, 2400);
            this._bonificacao = 1.2;
        }
        }

        class Assistente extends Funcionario {
        constructor(nome, cpf) {
            super(nome, cpf, 1200);
            this._bonificacao = 0.9;
        }
    }

Com essas classes ela tem uma maneira de saber quem são os funcionários dentro da empresa dos seus pais. Porém existem alguns cargos dentro da empresa que só existe um funcionário preenchendo eles. Por isso Júlia decidiu não criar classes filhas e usar diretamente a classe Funcionário para identificar esses cargos.
Qual o problema com essa decisão?
 - Ela terá um grande trabalho no futuro quando quiser adicionar uma classe para um tipo de funcionário que atualmente está sendo representado pela classe funcionário. Além da quantidade de trabalho ser grande ela corre o risco de esquecer de alterar algum lugar que atualmente usa a representação de funcionário.,
 - Um dos problemas é que ela perde a informação de qual tipo de funcionário ela tem. Como ela está usando uma classe mais genérica ao invés de criar classes especificas ela não distingue cada tipo de funcionário.: 
 Exatamente! Ao desenvolvermos um sistema as classes mais abstratas e genéricas nos ajudam a delimitar os contextos de negócio que estamos trabalhando, mas as classes concretas e especificas nos dão informações mais granulares. Sempre é bom ter a quantidade certa de cada tipo de classe

## 4.4 Métodos Abstratos

    
# 4. Sistema Interno

# 5. Interfaces e DuckType