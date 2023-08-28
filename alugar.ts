export class Alugar{
    tempo_de_aluguel: number;
    preco_por_hora: number;
    forma_de_pagamento: string;

    constructor(tempo_de_aluguel: number, preco_por_hora: number, forma_de_pagamento: string){
        this.tempo_de_aluguel = tempo_de_aluguel;
        this.preco_por_hora = preco_por_hora;
        this.forma_de_pagamento = forma_de_pagamento;
    }
    
    calcula_preco(): number{
        return this.preco_por_hora*this.tempo_de_aluguel;
    }
}