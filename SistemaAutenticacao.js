/*Ser autenticavel significa ter a propriedade "senha" 

ducky type
*/
export class SistemaAutenticacao {
    static login(autenticavel, senha) {
        if(SistemaAutenticacao.ehAutenticavel(autenticavel)) {
            return autenticavel.autenticar(senha);
        }
        return false; //se não passar na verificação da classe ter o metodo autenticalvel, então retorna false para não logar. 
    }

    static ehAutenticavel(autenticavel) {
        return "autenticar" in autenticavel && 
        autenticavel.autenticar instanceof Function
    }
}