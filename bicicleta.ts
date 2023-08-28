export class Bicicleta{
    modelo: string;
    cor: string;
    codigo: number;
    disponibilidade: boolean;

    constructor(modelo: string, cor: string, codigo: number, disponibilidade: boolean){
        this.modelo = modelo;
        this.cor = cor;
        this.codigo = codigo;
        this.disponibilidade = disponibilidade;
    }

    verifica_disponibilidade(): boolean{
        if(this.disponibilidade == true){
            return true;
        }
        else{
            return false;
        }
    }
    
}