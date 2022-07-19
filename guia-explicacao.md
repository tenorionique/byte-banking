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



