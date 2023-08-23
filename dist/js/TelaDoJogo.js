import { JogoDaForca } from "./JogoDaForca.js";
class TelaDoJogo {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.areaTexto = document.getElementById('txtFedback');
        this.btnDeletar = document.getElementById('btnDeletar');
        this.txtPalavraParcial = document.getElementById('txtPalavraParcial');
        this.imagemForca = document.getElementById('imagemForca');
        this.notificacao = document.getElementById('notificacaoDerrota');
        this.btnJogarNovamente = document.getElementById('btnJogarNovamente');
        this.btnChutar = document.getElementById('btnChutar');
        this.jogo = new JogoDaForca(this.areaTexto, this.buttons, this.txtPalavraParcial, this.notificacao, this.imagemForca);
        this.jogo.IniciarJogo();
        this.registrarEventos();
    }
    registrarEventos() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.botaoClicado(e));
        });
        this.btnDeletar.addEventListener('click', () => {
            this.chars.pop();
            this.areaTexto.value = this.chars.join('');
        });
        this.btnJogarNovamente.addEventListener('click', () => this.Reiniciar());
        this.btnChutar.addEventListener('click', () => this.Chutar());
    }
    Chutar() {
        this.jogo.Chutar();
    }
    botaoClicado(evento) {
        const botaoClicado = evento.target;
        const letraClicada = botaoClicado.textContent;
        const caractereExiste = letraClicada.trim().length > 0;
        if (caractereExiste && letraClicada != letraClicada.toUpperCase()) {
            this.areaTexto.value = ' ';
            this.areaTexto.value = letraClicada;
        }
    }
    Reiniciar() {
        location.reload();
    }
}
window.addEventListener('load', () => new TelaDoJogo());
//# sourceMappingURL=TelaDoJogo.js.map