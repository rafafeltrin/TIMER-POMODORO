let acao = document.getElementById('acao')
let pausa = document.getElementById('pausa')
let sessoes = document.getElementById('sessoes')
let segundos

var bell = new Audio("audio/bell.mp3")
var volta = new Audio("audio/volta.mp3")
var final = new Audio("audio/final.mp3")


var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')






function pausar(){
    lofi.pause()
    play.style.setProperty('display', 'block', 'important')
    pause.style.setProperty('display', 'none', 'important')
}

function executar(){
    lofi.play()
    play.style.setProperty('display', 'none', 'important')
    pause.style.setProperty('display', 'block', 'important')
}


function iniciar() {

    if (acao.value == 0) {
        document.getElementById('erro_acao').innerHTML = "Adicione os minutos"
        acao.focus()
    } else if (pausa.value == 0) {
        document.getElementById('erro_pausa').innerHTML = "Adicione a pausa"
        pausa.focus()
    } else if (sessoes.value == 0) {
        document.getElementById('erro_sessoes').innerHTML = "Adicione a sessoes"
        sessoes.focus()
    } else {

        lofi.play()
        play.style.setProperty('display', 'none', 'important')
        pause.style.setProperty('display', 'block', 'important')


        //Memória do navegador
        localStorage.setItem('acao', String(acao.value))
        localStorage.setItem('pausa', String(pausa.value))
        localStorage.setItem('sessoes', String(sessoes.value))

        document.getElementById('config').style.setProperty('display', 'none ', 'important')
        document.getElementById('timer').style.setProperty('display', 'block', 'important')

        momentoAcao()
    }

}

var seg_interval
var min_interval

function momentoAcao() {

    let sessoes_valor = localStorage.getItem('sessoes')

    if (sessoes_valor != '1') {
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessoes restantes'
    } else {
        document.getElementById('title_sessao').innerHTML = sessoes_valor + ' sessão restante'
    }

    let title = document.getElementById('title')
    title.innerHTML = 'POMODORO'
    title.style.fontsize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#dc3545', 'important')

    min = Number(localStorage.getItem('acao'))

    min--
    segundos = 59

    document.getElementById('minutes_ok').innerHTML = min
    document.getElementById('seconds_ok').innerHTML = segundos

    min_interval = setInterval(minTimer, 60000)
    seg_interval = setInterval(segTimer, 1000)

    

    function minTimer(){
        min--
        document.getElementById('minutes_ok').innerHTML = min
    }

    function segTimer(){
       

        segundos--
        document.getElementById('seconds_ok').innerHTML = segundos


        if (segundos <= 0) {
            if (min <= 0) {
                clearInterval(min_interval)
                clearInterval(seg_interval)

                bell.play()

                momentoPausa()
            }

            segundos = 60
        }
    }
        
}
        
function Parar(){
        clearInterval(min_interval)
        clearInterval(seg_interval)

        document.getElementById('voltar').style.setProperty('display', 'block', 'important')
        document.getElementById('parar').style.setProperty('display', 'none', 'important')
}

function Voltar(){
    document.getElementById('parar').style.setProperty('display', 'block', 'important')
    document.getElementById('voltar').style.setProperty('display', 'none', 'important')

    min_interval = setInterval(minTimer, 60000)
    seg_interval = setInterval(segTimer, 1000)

    

    function minTimer(){
        min--
        document.getElementById('minutes_ok').innerHTML = min
    }

    function segTimer(){
       

        segundos--
        document.getElementById('seconds_ok').innerHTML = segundos


        if (segundos <= 0) {
            if (min <= 0) {
                clearInterval(min_interval)
                clearInterval(seg_interval)

                bell.play()

                momentoPausa()
            }

            segundos = 60
        }
    }
}

        


function momentoPausa() {
    let title = document.getElementById('title')
    title.innerHTML = 'PAUSA'
    title.style.fontsize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color', '#dc3545', 'important')


    min_pausa = Number(localStorage.getItem('pausa'))

    min_pausa--
    segundos = 59

    document.getElementById('minutes_ok').innerHTML = min_pausa
    document.getElementById('seconds_ok').innerHTML = segundos

    min_interval = setInterval(minTimer, 60000)
    seg_interval = setInterval(segTimer, 1000)


    function minTimer(){
        min_pausa--
        document.getElementById('minutes_ok').innerHTML = min_pausa
    }

    function segTimer() {

        segundos--
        document.getElementById('seconds_ok').innerHTML = segundos

        if (segundos <= 0) {

            if (min_pausa <= 0) {
                ses = Number(localStorage.getItem('sessoes'))
                ses--

                localStorage.setItem('sessoes', String(ses))

                clearInterval(min_interval)
                clearInterval(seg_interval)

                if (ses <= 0) {
                    final.play()
                    localStorage.clear()

                    document.getElementById('config').style.setProperty('display', 'none ', 'important')
                    document.getElementById('timer').style.setProperty('display', 'none', 'important')
                    document.getElementById('fim').style.setProperty('display', 'block', 'important')

                }else{
                    volta.play()
                    momentoAcao()
                }

            }

            segundos = 60
        }
    }
}