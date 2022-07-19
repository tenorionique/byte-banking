## 1. Guia da aula com explicações sobre o código

**Aula 2 - Adicionando comportamentos**
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

**Aula 3 - Modularizando Código**

    - Video: Modulos Javascript

