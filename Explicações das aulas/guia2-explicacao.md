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

- no byte-bank toda conta vai ter alguma taxa para um saque, o que muda o valor da taxa é o tipo da conta
- o byte bank quer implementar o saque dentro de ContaPoupança, com taxa de 2%
- então vamos chamar o metodo sacar la também
- criamos conta salario, e teremos agora uma taxa diferente
- todas as minhas classes que herdam de conta são especializações, faz sentido ter um método sacar() la dentro que tenha comportamento de saque, com uma taxa fixa? sendo que todas as minhas herdeiras precisam ter taxas diferentes? Logo se eu esquecer de sobrescrever o método, ele vai vir com o método escrito na classe Mãe, e vai ser a taxa errada...
- Assim como a classe não é feita para ser instanciada diretamente, o método sacar() não é feito para ser chamado diretamente, ele tem que ser sempre sobrescrito. Então ele é o que chamamos de método abstrato, é um método que não é feito para ser chamado diretamente, ele é feito para ser sempre sobrescrito, então deixarei um comentário indicando que ele é "//Método abstrato".
- Porque assim nós conseguimos garantir que todas as implementações que herdam de Conta vão ter que implementar esse método sacar e elas vão ter que saber como elas têm que chamar esse método, como elas vão ter que manipulá-lo para ter uma taxa para saber das informações de como uma conta tem que fazer seu saque ou não.
-  A conta tem o método sacar, esse método existe, porque nós queremos definir que toda conta vai ter o método sacar, mas ele não vai ter nada. E se ele não vai ter nada, se alguém esquecer, por acaso, de chamá-lo, eu tenho que lançar um erro. Da mesma maneira que lançamos um erro quando tentamos construir diretamente uma classe abstrata, podemos lançar um erro quanto tentarmos chamar o método abstrato.
- Então, na Conta, no meu método sacar() eu vou também lançar um novo erro, e a mensagem desse erro vai ser: "O método Sacar da conta é abstrato". Se ele é abstrato, alguém esqueceu de chamá-lo. Se eu fizer isso agora e pedirmos para limpar o nosso terminal e para executar de novo, vamos vir aqui no terminal, agora sim ele deu um erro, falando que ele para justamente onde lançamos o erro e ele fala: "O método Sacar da conta é abstrato".

## 4.5 Refletindo sobre o tema: Métodos e Classes Abstratas

Aprendemos nessa aula sobre o conceito de Métodos e Classes abstratas. Selecione as afirmativas corretas sobre esses temas:
 - Classes abstratas são pensadas de forma que elas apenas possam ser herdadas por outras.: Exatamente, elas nos ajudam a criar abstrações no código e a compartilhar código entre outras classes
  - Métodos abstratos devem ser sobrescritos pelas classes filhas.: Isso mesmo, dessa forma não faz sentido termos um método abstrato fora de uma classe abstrata. Tome esse cuidado quando for criar seu código.

# 4. Sistema Interno

## 4.1 Criando funcionarios
- byte-bank: Vocês podem criar para nós um sistema para os meus gerentes e diretores?
- Criamos pastas pra separar contas de funcionários
- Criamos uma classe Mãe Funcionário
- E criamos Gerente e Diretor, que apesar de serem bem parecidos, já tem bonificação diferente
- Além do que, um diretor tem um nível de acesso no sistema que vamos criar mais pra frente, maior, e um gerente vai ter um nível de acesso menor no sistema que estamos criando, eles terão acesso a dados diferentes, por isso é importante já termos aqui as classes separadas, porque o banco já nos falou: "Eu preciso de um gerente, eu preciso de um diretor e eles vão trabalhar de maneiras diferentes".
- Agora já temos o nosso diretor e o nosso gerente criados, já temos a nossa classe Funcionario inicialmente criada só com as propriedades, e vamos explorar um pouco mais de como esse sistema tem que funcionar daqui a pouco.
## 4.2 Polimorfismo
- Como vimos, temos agora dois funcionários, um gerente e um diretor, e precisamos criar nosso sistema de autenticação, já que para eles usarem o sistema que o ByteBank pediu para criarmos, aquele sistema interno do banco, vamos precisar autenticar esses funcionários e  vamos precisar saber a senha deles. Eles vão ter que ter uma senha para conseguirem se autenticar.
-  Lá na minha classe Funcionario, já que eu vou ter meu diretor e meu gerente podendo usar esse sistema de autenticação, eu vou vir aqui na classe Funcionario e vou colocar uma senha, então this._senha, vamos ter uma senha aqui no nosso funcionário.
- E essa senha será cadastrada depois, já que primeiro eu vou criar um funcionário e depois eu vou pegar essa senha, então eu vou ter aqui um método chamado "cadastrar senha", onde configuramos essa senha para a pessoa usar.
- Eu vou chamar o método cadastrarSenha, e ele vai receber uma (senha) e ele vai atribuir inicialmente ao this._senha para a senha que foi pedida. Vamos agora ter esse cadastro de senha tanto no Diretor quanto no Gerente, porque os dois vão utilizar aquele sistema interno que estamos criando.

    export class Funcionario {
        constructor(nome, salario, cpf) {
            this._nome = nome;
            this._salario = salario;
            this._cpf = cpf;

            this._bonificacao = 1;
            this._senha;
        }
        
        cadastrarSenha(senha) {
            this._senha = senha;
        }

    }
- Diretor e Gerente herdam essas caracteristicas de Funcionario
- Agora no index.js eu instancio novo diretor e novo gerente. 
    const diretor = new Diretor("Rodrigo", 10000, 123456789);
    const gerente = new Gerente("Ricardo", 5000, 1236549871);

- Agora tenho o meu diretor e o meu gerente, só que queremos ter um sistema de autenticação, eu quero conseguir fazer com que ele se logue nesse sistema. Então abriu outro arquivo SistemaAutenticaçcao
    export class SistemaAutenticacao {
        static login(funcionario, senha) {
            return funcionario.senha == senha;
        }
    }
- E esse método estático login() vai receber o funcionário, quem está se logando, e vai receber uma senha. Eu quero que esse método login() retorne verdadeiro quando a senha do meu funcionário for igual a senha que foi passada pelo parâmetro senha do meu login().
-  Então o que eu quero fazer é funcionario.senha tem que ser igual a senha. Se isso for verdadeiro, eu vou retornar que ele está logado, então eu vou retornar só essa expressão, funcionario.senha == senha.
- Você pode ver que eu tenho que acessar a senha do funcionário, e aí a importância de começarmos as coisas sempre com o método de propriedades privadas, porque não sabemos exatamente como teremos que acessar. Mas a senha, por exemplo, é uma informação sensível. 
- La na classe Funcionarios, vou fazer um método getter (assessor de leitura) get senha() que vai retornar a nossa senha. this._senha

    export class Funcionario {
        constructor(nome, salario, cpf) {
            this._nome = nome;
            this._salario = salario;
            this._cpf = cpf;

            this._bonificacao = 1;
            this._senha;
        }

        get senha() {
            return this._senha;
        }
        cadastrarSenha(senha) {
            this._senha = senha;
        }

    }

- Dessa maneira nós conseguimos manter o encapsulamento da nossa classe, expondo só o que precisamos. Essa propriedade senha, ninguém consegue atribuí-la, eu só consigo atribuí-la através do cadastrarSenha(), e aqui eu posso ter outras seguranças para chamar esse método cadastrarSenha(), mas o meu sistema de autenticação só se preocupa com esse assessor get.

- Agora no index cadastramos uma senha para o diretor e o gerente:
    diretor.cadastrarSenha("123456");
    gerente.cadastrarSenha("45678");

- Agora vamos ver se eles estão logados, salvo numa constante e chamo a classe estatica SistemaAutenticacao.login() e passo os dois parametros de funcionario, e de senha. 

    const estaLogado = SistemaAutenticacao.login(diretor, "123456");
    const estaLogado2 = SistemaAutenticacao.login(gerente, "45678");

- Vai executar a comparação dentro de login() e retornar true para ambos os casos, pois as senhas são iguais
- E você pode ver que é legal que usando classes, tanto o meu diretor quanto o meu gerente são funcionários, como eles têm propriedades semelhantes, eu consigo usá-los de maneira intercambiável ou colocar meu gerente aqui no SistemaAutenticacao.login, ou meu diretor, sem precisar mudar o código da autenticação.
-  E essa propriedade dos objetos de tomarem várias formas ou até de recebermos aqui na autenticação um funcionário mais genérico e conseguir reutilizá-lo, independentemente de ele ser um diretor ou um gerente, é chamado de **polimorfismo**.

## 4. 3 Interfaces

- Vimos essa nova palavra, o polimorfismo. Se olharmos agora, é um pouco não intuitivo esse novo conceito, vamos explorá-lo um pouco mais para ver como podemos definir e entendê-lo um pouco melhor.
- esse método estático chamado login() na classe SistemaAutenticacao, ele recebe um funcionário, ou seja, ele recebe um objeto que estamos esperando, que seja um funcionário, por isso que colocamos o nome de funcionário aqui.E vai verificar, esse funcionário tem uma senha? Se essa senha for igual à senha que foi passada, então eu estou aceitando e eu vou retornar verdadeiro, porque eu vou deixá-lo logar.

- Mas, na verdade, o polimorfismo quer dizer que podemos ter diferentes objetos, diferentes classes sendo tratadas da mesma forma. É um objeto tratado de várias formas ou que se transforma em várias formas, por isso polimorfismo. E nesse caso, temos o diretor e o gerente herdando da classe Funcionario, que tem a nossa senha e tem a propriedade senha.

- O ByteBank agora quer outra coisa: “Eu tenho meu diretor e meu gerente, os dois estão conseguindo logar no meu sistema, mas eu quero que o meu cliente também logue nesse sistema”. Nosso trabalho agora é fazer com que o cliente também fique logado, com que ele também consiga ser autenticado pelo nosso sistema de autenticação.

- Na classe Cliente, vamos passar no construct de Cliente, um novo parametro senha;

        constructor(nome, cpf,senha){
            this.nome = nome;
            this._cpf = cpf;
            this._senha = senha;
        }

- Agora no index.js se instanciarmos cliente e chamarmos SistemaAutenticacao.login()
    const cliente = new Cliente( "Lais", 7895632148, "456")

    const clienteEstaLogado = SistemaAutenticacao.login(cliente, "456");

- E dermos um console.log(clienteEstaLogado), vamos tomar um false. Por que?
- Por que o SistemaAutenticação.login() tem um return de comparação assim: 
    return funcionario.senha == senha;
- Só se olharmos nosso constructor de Cliente, nós temos um this._senha. E lembrando: senha e _senha são coisas diferentes. Logo o que temos é um senha chegando como undefined naquela comparação acima. undefinde === "456" é falso. 
- um adendo, vamos editar o SistemaAutenticacao:
    export class SistemaAutenticacao {
        static login(funcionario, senha) {
            return funcionario.senha == senha;
        }
    }
- Para: 
    export class SistemaAutenticacao {
        static login(autenticavel, senha) {
            return autenticavel.senha == senha;
        }
    }
- isso quer dizer que, não vamos necessariamente receber funcionario, pois essa classe funciona com outros objetos também, não só os herdeiros de funcionario, acabamos de usar Cliente, que não é herdeiro de funcionario e a comparação foi executada. 
- Mas dessa forma ainda nao esta bom, temos nossa senha muito exposta, e não queremos que ela vaze. 
Então vamos criar um método autenticar() que recebe senha por parametro. 
Então se essa senha existir em alguma classe (genericamente referenciada como autenticavel) que contenha esse metodo autenticar, aí eu vou retornar verdadeiro ou falso

    export class SistemaAutenticacao {
        static login(autenticavel, senha) {
            return autenticavel.autenticar(senha);
        }
    } 

- Na classe Funcionario, tirou o get senha() e colocou o autenticar(). 
-  É um método que vai receber uma senha e dessa senha eu vou dar um return verificando se essa senha é igual à senha que ele tem internamente. Dessa forma eu não preciso expor essa propriedade _senha e ainda consigo tratar todo mundo como se tivesse esse polimorfismo, como se estivesse sendo autenticável.

    autenticar( senha) {
        return senha == this._senha
    }


- Não implementei esse método em Cliente, então quando fui ver o console.log que esta no index, recebo um erro pois não existe o método autenticar() nele. 
    const clienteEstaLogado = SistemaAutenticacao.login(cliente, "456");
    console.log(clienteEstaLogado);

- E se ele não tiver esse método, ele vai dar um erro, porque quando abrimos e fechamos parênteses aqui, ele está tentando executar esse método. E um método não vai vir undefined, ele não vai colocar isso por padrão lá no objeto do JavaScript, então ele vai dar um erro, ele vai falar: “Você está querendo executar uma função que não existe”, e nós tomamos um erro.
- Quando estamos falando de funções, vamos tomar um erro, quando estamos falando de propriedades, ele vai vir para o padrão undefined. Comportamentos dentro do JavaScript aos quais temos que estar atentos.
- O nosso sistema de autenticação se preocupa com todo mundo que tem o método chamado autenticar. Se meu cliente tiver um método chamado autenticar() que sempre retorna verdadeiro, ele vai conseguir ser autenticável.
- E dessa forma conseguimos ver que o nosso sistema de autenticação se preocupa muito mais com a interface que os objetos expõem, com o que podemos manusear e manipular deles, métodos e propriedades, do que com qual o tipo deles de fato.
- Não interessa para esse sistema de autenticação se eu sou um cliente, se eu sou um diretor, se eu sou um gerente, se eu sou um funcionário, se eu sou uma conta. Se eu tiver o método autenticar(), quer dizer que eu sou autenticável, então eu posso executar aqui.
- Só que se eu não for, se eu não tiver, como não tínhamos no Cliente, vamos tomar um erro e temos que nos proteger disso também, porque eu não quero ficar tomando erro porque eu passei uma interface, uma classe errada para um sistema onde ela não é compatível. Vamos ver como arrumar esse erro daqui a pouco.

## 4.4 Comportamento indefinido
André está criando um sistema de Contas para o banco ByteBank e está tendo alguns comportamentos inesperados quando executa o seguinte código:

    class Conta {
    constructor(titular, numero) {
        this.titular = titular;
        this.numero = numero;
        this._saldo = 0;
    }
    }

    class ContaCorrente extends Conta {
    constructor(titular, numero) {
        super(titular, numero);
    }
    }

    const conta = new ContaCorrente("Andre", 1245);
    console.log(conta.saldo)

Acontece que na hora que ele executa o código o único que aparece no console dele é o texto "undefined". Por que isso acontece?

R: Isso acontece pois a propriedade saldo não está definida dentro do objeto conta e por isso retorna undefined.: Correto, por padrão o JS adiciona como undefined no objeto uma propriedade que tentamos acessar caso ela não exista.

# 5. Interfaces e DuckType