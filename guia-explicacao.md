## 1. Guia da aula com explicações sobre o código

## 2. **Aula 2 - Adicionando comportamentos**
- Video Atributos Privados:
O saldo não deveria ser acessado fora de sua classe. Ao ser instanciado você consegue acessar o .saldo e alterar seu valor, mas isso é perigoso pois pode gerar erros. 
Dessa forma existe uma convenção em JavaScript de indicar que um atributo é privado, colocando um _ antes de seu nome, porém isso não impede de que o atributo seja acessado fora da classe.
Apenas sera muito rude se você programador fizer isso.
O professor deixou um link
*Proposta de campos privados: https://github.com/tc39/proposal-class-fields#private-fields utilizando o # antes do nome. Se fizermos isso, ao dar um console.log, não conseguimos nem ver que saldo existe, aí complica também. 

- Exercicio: O que aprendemos sobre métodos/funções?
   - Função e método são termos sinônimos e que nós ajudam a criar um vocabulário mais rico dentro do nosso sistema: Usamos métodos para dar nomes aos comportamentos que nossa classe possui e isso facilita a comunicação dentro da equipe

   - Um método pode receber qualquer quantidade de parâmetros. Um método pode ter nenhum, um ou mais parâmetros. Essa é a maneira de passarmos informações para podermos reutilizar métodos em diferentes cenários

   - Um método define o comportamento ou a maneira de fazer algo. Esse é o objetivo de métodos, definir o que um objeto saber fazer. O comportamento é implementado dentro do método.

- Exercicio: Encapsulamento: 
    - Criamos métodos para proteger atributos e informações sensíveis de nossas classes. Porém se não fizermos nada essas informações ainda estão expostas e podem ser alteradas manualmente.
    Sobre a proteção de atributos, marque as alternativas corretas:
       - Por padrão no JS utilizamos o "_" para indicar que um atributo é privado e não deveria ser alterado. Apesar de ainda ser possível alterar essa propriedade isso é considerado uma má prática e estamos quebrando o encapsulamento da classe.

       - Atualmente no Js nenhum atributo ou método é realmente privado. Sim, o JS é uma linguagem de escopo aberto e por isso é possível visualizar qualquer atributo ou propriedade de nossa classe.

- Vídeo: Métodos com retorno:
    - Clausula de retorn dentro do método
    - Se eu não der um return dentro do método (colocamos agora um no sacar), quando tentar acessar ele e atribuir a uma variável, ao dar um console.log receberemos um undefined
    - early return - quando coloco um return no meu método, ele para a execução de tudo que esta abaixo dele, por isso se temos uma verificação de if, o return vem dentro ou abaixo. Mas quando temos muitas condições aninhadas podemos usar a tecnica de early return para facilitar a legibilidade do código

        
    depositar(valor) {
        if( valor > 0) {
            this._saldo += valor;
        }
    }

estava assim, então o prof mudou para verificar se o saldo era menor e igual a zero e deu um return dentro do escopo de if sem nenhuma outra instrução, indicando que deve parar de executar e sair de dentro do if
ai já cai no this._saldo += valor, que é a execução de depositar que ele quer. Em codigos cheios de if isso vai ajudar bastante:

    depositar(valor) {
        if( valor <= 0) {
           return;
        }

        this._saldo += valor;
    }

É comum ver sem a chaves do if também, pois é um comando de uma linha dentro dele *editei no código*

## 3.  **Aula 3 - Modularizando Código**

   **- Video: Modulos Javascript:**
        - Boa prática: separar cada classe por arquivo. 
        - Nome de arquivo começando com letra maiuscula indica que é uma classe. 
        - Compartilhamento de código entre arquivos: modulos
        - exportar a classe: export
        - importar a classe no arquivo que a esta utilizando.
        - colocar a extensão do arquivo .js no import pra ele funcionar. 
        - Não estava funcionando apenas rodar no terminal como um node ./index.js pois ele não estava interpretando o module, ou seja, o meu index.js é só um script mas pra ele rodar no node agora e ler os modulos classe, precisa ser um module também. Então fez um npm init para iniciar um pacote - package.json e deu um   "type": "module" (linha 15 do arquivo)

    - Exercicio: Organizando código:    
        A organização de um projeto de programação é algo muito importante para que conforme o sistema crescer encontrarmos mais facilmente as classes e lugares que queremos alterar.
        Para que serve a criação de módulos no JavaScript?
        Criamos módulos para compartilhar código entre os diferentes arquivos do meu sistema, ajudando na organização dele.  Dentro do JS cada arquivo é considerado um módulo e podemos escolher o que queremos exportar ou não a partir dele.

   **- Video: Composição de classes:** 
        - vinculou ContaCorrente com Cliente, colocou como atributo de ContaCorrente a classe Cliente, e no index.js instanciou uma conta Corrente nova, e atribuiu um novo cliente a ela: 
            const conta2 = new ContaCorrente();
            conta2.cliente = cliente2
            conta2.agencia = 1002
        - novo metodo em ContaCorrente: transferir()
        - passando por parametro para esse metodo uma outra conta instanciada (ou seja um objeto), sendo possivel acessar o metodo dela para realizar a transferencia. Uma forma bem simples de utilizar as classes e objetos. 
    
    **- Video: Tipo de valor e tipo de referência:** 
        - tomar cuidado, toda vez que passamos um parametro que representa um objeto dentro de um método, a instancia conta corrente para dentro do transferir, se eu fizer alguma alteração dentro do método transferir dentro desse metodo que ele recebeu, vai realmente mudar o objeto original dentro do index
        - Ex: 
            transferir(valor, conta) {
                conta.cidade= "São Paulo"
                const valorSacado = this.sacar(valor);
                conta.depositar(valorSacado)
            }
        - vou adicionar dinamicamente um atributo ao objeto conta! Ou seja, alterou o objeto. 

        Agora se eu fizer isso: na classe
            transferir(valor, conta) {
                conta.cidade= "São Paulo"
                const valorSacado = this.sacar(valor);
                conta.depositar(valorSacado)
                valor = 20;
            }

        E no index fizer isso:
        let valor = 200
        contaCorrenteRicardo.transferir(valor, conta2)
        - não passamos a quantidade que vai transferir como um numero, escrevemos uma variavel e colocamos essa quantidade 200 lá dentro (o valor da variavel valor kk), fez isso pra passar valor e conta como variaveis e demonstrar o exemplo:
        - se eu der um console.log em valor, e em conta2:
        - vejo que valor não foi alterado, continua 200
        -mas a conta2 foi alterada dinamicamente com a cidade 'são paulo'
        -por que?
        - valor é tipo primitivo da linguagel, então sempre que a gente passa isso como parametro para dentro de um metodo, estamos passando uma cópia dele.
        Dentro do método estou trabalhando com uma cópia, faço qualquer alteração em valor dentro do escopo do método, que não vai refletir do lado de fora
        - ao contrario de conta2, que é um objeto, logo não estou passando uma copia da conta2 pra dentro do método, estou passando ela de verdade - falamos que estamos passando uma referencia para esse parametro conta

## 4.  **Aula 4 - Acessando Atributos privados**

    **Video - Null e undefined**

    -Tomar cuidado ao passar objeto como referencia para outros métodos
    - pois toda vez que passamos um objeto para um parametro de um método, estamos passando uma referencia e isso te a ver com a maneira que o computador trabalha com a mémoria
    -toda vez que fazemos a instanciação de um novo objeto de uma classe, falamos para o computador reservar um pedaço de memória que caiba esse molde com essas informações que eu quero colocar aqui.

    Toda vez que instanciamos uma nova ContaCorrente, estamos reservando um espaço na memória para as informações contidas nessa classe, que são agência, cliente e saldo. Da mesma forma, quando instanciamos um Cliente estamos reservando um espaço para as informações "nome" e "cpf".
    Com esse espaço reservado na memória, o que temos armazenado, por exemplo, em contaCorrenteRicardo, não é o objeto em si, mas sim uma referência ao objeto criado (ao espaço de memória onde as informações podem ser manipuladas). Costumamos chamar de objetos ou instâncias as variáveis que criamos, como cliente1, cliente1, contaCorrenteRicardo e conta2, mas, estritamente falando, se tratam de referências.

    Isso tem algumas implicações. Por exemplo, se cliente2 = new Cliente() nos devolve uma referência para um endereço de memória, sabemos que em conta2.cliente = cliente2 estamos passando essa mesma referência de memória. Isso também significa que podemos substituir essa chamada pela instanciação direta de um novo Cliente.

    const conta2 = new ContaCorrente();
    conta2.cliente = new Cliente();
    conta2.agencia = 102;

    Com isso, teremos acesso a conta2.cliente.nome - ou seja, ao tributo nome do objeto atribuído ao atributo cliente do nosso objeto conta2

    podemos ver as alterações feitas no código:
    conta2.cliente = new Cliente();
    conta2.cliente.nome = "Alice";
    conta2.cliente.cpf = 88822233309

    e apagamos
    //const cliente2 = new Cliente();

    //cliente2.nome = "Alice";
    //cliente2.cpf = 88822233309;

    Assim aprendemos que, trabalhando com referências, é possível acessarmos diversos níveis de profundidade. Mas o que acontece se comentarmos a linha em que criamos a instância de Cliente? //conta2.cliente = new Cliente();
    o executarmos, receberemos:
    conta2.cliente.nome = "Alice"; ^ TypeError: Cannot set property 'nome' of undefined
    Esse erro indica que é impossível definir a propriedade nome de algo indefinido.

    Inclusive, se pararmos de tentar acessá-lo comentando as linhas em que fazíamos as atribuições indevidas, veremos que o objeto conta2 realmente recebeu o valor padrão undefined no atributo cliente, que não foi inicializado.
    No terminal recebemos um: ContaCorrente { agencia: 102, cliente: undefined, _saldo: 0 }
    Também obteremos o mesmo resultado se explicitamente atribuirmos o valor null à propriedade conta2.cliente.
    const conta2 = new ContaCorrente();
    conta2.cliente = null;
    //conta2.cliente.nome = "Alice";
    //conta2.cliente.cpf = 88822233309;
    conta2.agencia = 102;

    ContaCorrente { agencia: 102, cliente: null, _saldo: 0 }
    Ambos os casos significam a mesma coisa, com a diferença do null estar explícito no nosso código (ou seja, é intencional). Se tentarmos acessar uma propriedade de um valor nulo, também receberemos um erro.

    **Resumindo** null a gente que coloca, o undefined a gente toma quando faz algo de errado sem intenção

**Video - Getters e Setters - Encapsulamento**

    - Fizemos anteriormente que é possivel passar um objeto diretamente para uma propriedade de outro objeto, ja que ele é uma referencia a uma instancia de uma classe. 
    Também aprendemos que é possível passar qualquer valor para essa propriedade, como null ou mesmo 0
    **É uma boa prática mantermos a inicialização do objeto em uma variável, já que iremos popular seus atributos - por exemplo de cliente2 - antes de utilizá-lo como atributo de outro objeto.** 

    Ou seja, voltamos:
    const cliente2 = new Cliente();
    cliente2.nome = "Alice";
    cliente2.cpf = 88822233309;

    Como proteger um atributo para ninguem mexer nele erroneamente e eu tomar um undefined algum dia?
    colocar ele como privado! _nomedoatributo. Vamos fazer isso com o atributo cliente.

     Pensando nisso, o JavaScript possui uma sintaxe especial para casos em que temos um atributo privado e precisaremos dar acesso a ele de maneira controlada, os chamados métodos assessores.

     - Para conseguir acessar um atributo privado e mostrar sua informação preciso ter escrito um getter, um método acessor de outra forma o console me retornaria um undefined

     - Para conseguir setar algum valor para um atributo privado, preciso ter escrito um setter, um método acessor. 

     *Para um getter a palavra reservada é um get e o nome do método acessor sera o nome do atributo sem o _ na frente
     Para um setter a palavra reservada é um set e o nome do método acessor sera o nome do atributo sem o _ na frente*

     O assessor set, diferente de um método, possui uma característica especial, permitindo que façamos a atribuição de valores normalmente com uma igualdade, sem utilizarmos a sintaxe dos outros métodos (nesse caso, algo como conta2.cliente()).

     Como queremos proteger nosso atributo privado, podemos incluir uma condicional definindo que a atribuição de novoValor só será feita se ele for uma instância de cliente, algo que conseguimos verificar usando o operador instanceof. Nesse ponto precisaremos fazer a importação da classe Cliente como aprendemos nas aulas anteriores.

      set cliente(novoValor) {
        if (novoValor instanceof Cliente) {
            this._cliente = novoValor;
        }
    
    se no index.js eu colocar conta2.cliente = 0;
    recebo:
    ContaCorrente { agencia: 102, _cliente: undefined, _saldo: 0 }
    Ou seja, a verificação não passou e o valor 0 não foi atribuído, recebendo um valor padrão. Se passarmos uma instância de Cliente, como cliente1, tudo ocorrerá como deveria.

    Os assessores são muito poderosos, pois nos concedem acesso a propriedades privadas ao mesmo tempo em que nos permitem definir uma regra de proteção dentro deles. Já se for necessário pegar o valor de _cliente, precisaremos de um novo assessor, dessa vez do tipo get. Ele também será semelhante a um método, mas nesse caso simplesmente retornaremos o valor de this._cliente.

     Já no caso do atributo _saldo, que também é privado, podemos manipulá-lo por meio dos métodos sacar() e depositar(), mas ainda não temos algo que nos retorne seu valor atual para o exibirmos em uma interface gráfica. Nessa situação, precisaremos somente do assessor do tipo get, que criaremos da mesma forma que o anterior, simplesmente retornando this._saldo.

      get saldo() {
        return this._saldo;
    }

    Após essa alteração, conseguiremos receber o valor de conta2.saldo com um console.log().
    Entretanto, se tentarmos fazer uma atribuição direta, receberemos um erro informando que não é possível atribuir um valor à propriedade saldo, já que ela só possui um método assessor de leitura (tipo get).

    Dessa forma temos um encapsulamento melhor da nossa classe, protegendo os atributos mais sensíveis e permitindo acesso somente quando assim o desejamos.

## 5. **Aula 5 - Construtores e estáticos**

- **Video - Construtores**

        Definição: Construtores são utilizados para inicializar os atributos.

    - Na classe Cliente, temos o atributo de CPF, e como cpf é unico pra cada pessoa e não muda, precisamos fazer uma tratativa nesse atributo para ele não ser alterado. 
    - colocou ele como privado e fez um assessor get para consultar o cpf
    - mas só quero atribuir esse cpf quando eu CRIAR um novo cliente, e em nenhum outro momento do clico de vida de objeto quero alterar o cpf.  Então vamos utilizar o construtor: constructor() uma função especial
    -     constructor(nome, cpf){
        this.nome = nome;
        this._cpf = cpf;
    }

    - voltando ao index, na hora de criar o meu cliente repare que tem um new Cliente(), e esse () é a chamada de uma função, e justamente chama o nosso construct da nossa classe (antes de ter o construct, acontecia que gerava um construtor implicito que não fazia "nada" só reservava um espaço na memoria) e precisavamos atribuir valor para os atributos 
    - Passamos o nome e o cpf por parametro dentro do new Cliente("Ricardo",11122233309)
    E eliminamos essas duas linhas 
    cliente1.nome = "Ricardo";
    cliente1.cpf = 11122233309;

    - gerenciamento de estado: Assim conseguimos com que nossa propriedade seja atribuída somente em tempo de construtor, e que não seja mais possível alterá-la enquanto tal objeto existir. Essa é mais uma forma de controlarmos os estados da nossa aplicação. Todos os atributos que temos em nossas classe são chamados também de "estado da classe", e é comum nos referirmos às suas regras de alteração como "gerenciamento de estado" - ou seja, as técnicas que utilizamos para lidar com esses atributos.

    - Agora em ContaCorrente criamos um construtor:
            
        constructor(cliente, agencia) {
            this.agencia = agencia;
            this.cliente = cliente;
        }

     repare que esta utilizando o metodo assessor (get cliente) dentro do constructor, pois esta fazendo aquela verificação do if (dentro do set tem um if(novoValor instanceof Cliente) pra garantir que os clientes criados sejam objetos instancias da classe Cliente)
    -Resumindo: no meu constructor posso usuar os métodos assessores que tem dentro da classe

    - Note que temos bem menos linhas de código, tornando-o mais conciso e legível. Claro, não devemos acreditar que um código menor sempre é bom, mas sim analisar as possibilidades de torná-lo mais sucinto. Existem casos nos quais manter nomes mais extensos e descritivos de variáveis ou códigos com etapas mais explícitas também pode ser vantajoso.

