import { JogoDaForca } from "./JogoDaForca.js";


class TelaDoJogo{
    buttons:NodeListOf<HTMLButtonElement>;

    areaTexto: HTMLInputElement;
    btnDeletar: HTMLButtonElement;
    btnChutar: HTMLButtonElement;
    btnJogarNovamente: HTMLButtonElement;
    txtPalavraParcial: HTMLParagraphElement;
    imagemForca: HTMLImageElement;
    notificacao:HTMLDivElement;
    jogo: JogoDaForca;
    chars: string[];


    constructor() {
             
        this.buttons = document.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>;
        this.areaTexto = document.getElementById('txtFedback') as HTMLInputElement;
        this.btnDeletar = document.getElementById('btnDeletar') as HTMLButtonElement;
        this.txtPalavraParcial = document.getElementById('txtPalavraParcial') as HTMLParagraphElement;
        this.imagemForca = document.getElementById('imagemForca') as HTMLImageElement;
        this.notificacao = document.getElementById('notificacaoDerrota') as HTMLDivElement;
        this.btnJogarNovamente = document.getElementById('btnJogarNovamente') as HTMLButtonElement;
        this.btnChutar = document.getElementById('btnChutar') as HTMLButtonElement;
        
        this.registrarEventos();    
        
    }

    registrarEventos(){
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.botaoClicado(e))
        })

        this.btnDeletar.addEventListener('click', () => { this.chars.pop()
            this.areaTexto.value = this.chars.join('')
        })
        this.btnJogarNovamente.addEventListener('click',() => this.Reiniciar());

        this.btnChutar.addEventListener('click', () => this.Chutar())
    } 
    Chutar(){
        this.jogo = new JogoDaForca(this.areaTexto,this.buttons,this.txtPalavraParcial,this.notificacao,this.imagemForca)
        this.jogo.Chutar();
    }
    botaoClicado(evento : MouseEvent){
        const botaoClicado:HTMLButtonElement = evento.target as HTMLButtonElement;
        const letraClicada: string = botaoClicado.textContent as string;

        const caractereExiste = letraClicada.trim().length > 0;

        if (caractereExiste && letraClicada != letraClicada.toUpperCase()){
            this.areaTexto.value = ' ';
            this.areaTexto.value = letraClicada;
        }
   
    }

    Reiniciar()
    {
        location.reload();
    }
}
window.addEventListener('load', () => new TelaDoJogo());