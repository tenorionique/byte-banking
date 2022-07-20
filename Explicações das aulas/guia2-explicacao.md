## 1. Conhecendo o problema do cliente

- Essa é o guia de explicação de cada video e exercicio do curso JavaScript: Interfaces e Heranças em Orientação a Objetos, utilizando o projeto byte-bank, iniciado no curso anterior a esse. 

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

# 2.2 Herança (vídeo)

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

# 2.3Exercicio**
- Qual a sintaxe do JavaScript para herdarmos de uma classe?
- class Carro extends Veiculo
- dessa forma a classe carro herda as propriedades e métodos da classe Veículo

# 2.4 Super e sobrescrita

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




## 3. Classes Abstratas

## 4. Sistema Interno

## 5. Interfaces e DuckType