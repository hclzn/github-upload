const form = document.querySelector('.form');
const resultado = document.querySelector('.resultado');
let cpfInput = '';

form.addEventListener('submit', function(e){
    e.preventDefault();

    cpfInput = e.target.querySelector('#cpf-input');
    const cpf = new ValidaCPF(cpfInput.value);
    
    if (cpf.valida()) {
        resultado.innerHTML = 'CPF válido.';
    } else {
        resultado.innerHTML = 'CPF inválido.';
    }
    
    console.log(cpf.valida());
})

class ValidaCPF{
    constructor(cpfEnviado){
        this.cpfLimpo = cpfEnviado.replace(/\D+/g, '');
    }

    valida() {
        if(typeof this.cpfLimpo === 'undefined') return false;
        if(this.cpfLimpo.length !== 11) return false;
        if(this.isSequencia()) return false;
        
        const cpfParcial = this.cpfLimpo.slice(0,-2);
        const digito1 = this.criaDigito(cpfParcial);
        const digito2 = this.criaDigito(cpfParcial + digito1);
        
        const novoCpf = cpfParcial + digito1 + digito2;
        console.log(novoCpf);
        
        return novoCpf === this.cpfLimpo;
    }

    criaDigito(cpfParcial) {
        const cpfArray = [...cpfParcial];
        let regressivo = cpfArray.length + 1;
        const total = cpfArray.reduce((ac, valor) => {
            ac += (regressivo * Number(valor));
            regressivo--;
            return ac;
        },0);
        
        const digito = 11 - (total % 11);
        return digito > 9 ? '0' : String(digito);
    }

    isSequencia() {
        const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
        return sequencia === this.cpfLimpo;
    }
}
