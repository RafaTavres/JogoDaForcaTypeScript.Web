export class JogoDaForca {
    constructor(areaTexto, buttons, txtPalavraParcial, notificacao, imagemForca) {
        this.palavraSecreta = '';
        this.palavras = ['ABACATE', 'ABACAXI', 'ACEROLA', 'AÇAÍ',
            'ARAÇA',
            'ABACATE',
            'BACABA',
            'BACURI',
            'BANANA',
            'CAJÁ',
            'CAJÚ',
            'CARAMBOLA',
            'CUPUAÇU',
            'GRAVIOLA',
            'GOIABA',
            'JABUTICABA',
            'JENIPAPO',
            'MAÇÃ',
            'MANGABA',
            'MANGA',
            'MARACUJÁ',
            'MURICI',
            'PEQUI',
            'PITANGA',
            'PITAYA',
            'SAPOTI',
            'TANGERINA',
            'UMBU',
            'UVA',
            'UVAIA'];
        this.areaTexto = areaTexto;
        this.buttons = buttons;
        this.txtPalavraParcial = txtPalavraParcial;
        this.notificacao = notificacao;
        this.imagemForca = imagemForca;
        this.letrasDescobertas = new Array();
        this.tentativa = 0;
        this.palavraSecreta = this.ObterpalavraSercreta();
        this.IniciarPalavraParcial();
    }
    Chutar() {
        let chute = this.areaTexto.value;
        let letraChute = chute.toUpperCase();
        console.log(chute);
        let palavra = this.palavraSecreta;
        console.log(palavra);
        if (this.letrasDescobertas.includes(letraChute)) {
            this.areaTexto.value = '';
            return;
        }
        if (this.palavraSecreta.includes(letraChute)) {
            for (let index = 0; index < this.palavraSecreta.length; index++) {
                if (this.normalizarString(this.palavraSecreta[index]) === letraChute)
                    this.PopularPalavraParcial(index, this.palavraSecreta[index]);
            }
            this.buttons.forEach(btn => {
                if (btn.textContent == letraChute.toLowerCase()) {
                    let letraMaiuscula = btn.textContent;
                    btn.textContent = letraMaiuscula.toUpperCase();
                    btn.disabled = true;
                    btn.style.color = "green";
                    this.areaTexto.value = '';
                }
            });
        }
        else {
            this.tentativa++;
            if (this.tentativa == 6) {
                this.JogadorPerdeu();
                return;
            }
            this.letrasDescobertas.push(letraChute);
            this.imagemForca.setAttribute('src', `assetes/Forca${this.tentativa + 2}.png`);
            this.imagemForca.style.objectFit = "fill";
            this.buttons.forEach(btn => {
                if (btn.textContent == letraChute.toLowerCase()) {
                    btn.disabled = true;
                    btn.textContent = btn.textContent.toUpperCase();
                    btn.style.color = "gray";
                    this.areaTexto.value = '';
                }
            });
        }
        const palavraChutada = this.ObterPalavraCompleta();
        if (this.palavraSecreta == palavraChutada) {
            this.JogadorVenceu();
            return;
        }
    }
    ObterPalavraCompleta() {
        const PalavraParcial = this.txtPalavraParcial.textContent;
        const letras = PalavraParcial.split(' ');
        let palavra = '';
        letras.forEach(letra => {
            palavra += letra;
        });
        return palavra;
    }
    PopularPalavraParcial(index, value) {
        const PalavraParcial = this.txtPalavraParcial.textContent;
        let palavra = PalavraParcial.split(' ');
        palavra[index] = value;
        this.txtPalavraParcial.textContent = palavra.join(' ');
    }
    normalizarString(string) {
        return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    IniciarPalavraParcial() {
        this.txtPalavraParcial.textContent = Array(this.palavraSecreta.length).fill("_").join(" ");
    }
    JogadorPerdeu() {
        this.buttons.forEach(btn => {
            btn.disabled = true;
            let letraMaiuscula = btn.textContent;
            btn.textContent = letraMaiuscula.toUpperCase();
            btn.style.color = "gray";
            this.areaTexto.value = '';
        });
        const notificacaoDerrota = document.createElement('h3');
        notificacaoDerrota.textContent = this.letrasDescobertas.join(" ") + ' Foram as Letras Usadas, Voce Perdeu Tente Novamente! A Palavra era ' + this.palavraSecreta;
        this.notificacao.appendChild(notificacaoDerrota);
    }
    JogadorVenceu() {
        this.buttons.forEach(btn => {
            btn.disabled = true;
            let letraMaiuscula = btn.textContent;
            btn.textContent = letraMaiuscula.toUpperCase();
            btn.style.color = "gray";
            this.areaTexto.value = '';
        });
        const notificacaoVitoria = document.createElement('h3');
        notificacaoVitoria.textContent = this.palavraSecreta + ' Foram as Letras Usadas, Voce Acertou com ' + this.tentativa + ' tentativas!';
        this.notificacao.appendChild(notificacaoVitoria);
        this.notificacao.style.color = "green";
    }
    ObterpalavraSercreta() {
        let indice = this.GerarNumeroAleatorio();
        let palavraSecreta = this.palavras[indice];
        palavraSecreta = this.normalizarString(palavraSecreta.toUpperCase());
        return palavraSecreta;
    }
    GerarNumeroAleatorio() {
        return Math.floor((Math.random() * 30) + 1);
    }
}
//# sourceMappingURL=JogoDaForca.js.map