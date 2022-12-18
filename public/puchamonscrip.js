const seccionataquees = document.getElementById('deataques')
const ocultaelreinicio = document.getElementById('Reiniciar')
const BotonMascotaJugador = document.getElementById('botonSeleccion')
const reiniciar = document.getElementById('botonreiniciar')
const seccionmascotas = document.getElementById('seccionunadepuchamones')
const spanpuchamonjugador1 = document.getElementById('puchamon-jugador')
const spanmascotaenemigo = document.getElementById('puchamon-enemigo')
const spanvidasjugador = document.getElementById('vidas-jugador')
const spanvidasenemigo = document.getElementById('vidas-enemigo')
const seccionmensajes = document.getElementById('resultados')
const ataquejugadorm = document.getElementById('ataquejugador-m')
const ataqueenemigom = document.getElementById('ataqueenemigo-m') 
const contenedortargetas = document.getElementById('targetaspuchamon')
const contenedorataques = document.getElementById('contenedorataques')
const seccionvermapa = document.getElementById('vermapa')
const canvas = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let puchamones = []
let puchamonesenemigos = []
let ataquespuchamonenemigo
let ataqueenemigo = []
let opciondepuchamones
let ataquejugador = []
let inputMotapod
let inputStarbienpinshependejo
let inputPendertuga
let inputPitochu 
let inputBaculao 
let indexataquejugador
let indexataqueenemigo
let victoriasjugador = 0
let victoriasenemigo = 0
let amam1 
let amam2 
let amam3 
let botonesataque = []
let mascotajugador1
let mascotadejugadorobjeto
let ataquespuchamones
let vidasjugador = 3
let vidasenemigo = 3
let lienzo = mapa.getContext('2d')
let intervalo 
let mapaBackground = new Image()
let alturaquebuscamos 
let anchodemapa = window.innerWidth - 20
const anchomaximodemapa = 350
mapaBackground.src = './dolordecabeza/fondodemapa.png'

if(anchodemapa>anchomaximodemapa){
    anchodemapa = anchomaximodemapa - 20
}
alturaquebuscamos = anchodemapa * 600 / 800
mapa.width = anchodemapa
mapa.height = alturaquebuscamos
class Puchamon {
    constructor(nombre, foto, vida, fotomapa, id=null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0,mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotomapa
        this.velocidadx = 0
        this.velocidady = 0
    }
    pintarpuchamon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}
let Motapod = new Puchamon('Motapod', './dolordecabeza/motapodsinfondo.png',4,'./dolordecabeza/motapodsinfondo.png')
let Pendertuga = new Puchamon('Pendertuga', './dolordecabeza/pendertugasinfondo.png',4, './dolordecabeza/pendertugasinfondo.png')
let Pitochu = new Puchamon('Pitochu', './dolordecabeza/pitochusinfondo.png',4, './dolordecabeza/pitochusinfondo.png')
let Baculao = new Puchamon('Baculao', './dolordecabeza/baculaosinfondo.png',4, './dolordecabeza/baculaosinfondo.png')
//let Starbienpishependejo = new Puchamon('Estarbien \n pinshependejo','./dolordecabeza/starbienpishependejo.png',4,'./dolordecabeza/starbienpishependejo.png')
//const Starbienpishependejo_ATAQUES = [
//    { nombre:'botonAtaque1',id:'botonAtaque1'},
//    { nombre:'Ataque2b',id:'botonAtaque2'},
//    { nombre:'botonAtaque3',id:'botonAtaque3'},
//    { nombre:'botonAtaque3',id:'botonAtaque3'}
//]
const MOTAPOD_ATAQUES = [
    { nombre:'El Pisapapeles',id:'botonAtaque1'},
    { nombre:'Endurecerce',id:'botonAtaque2'},
    { nombre:'De desperdicio \n del espacio',id:'botonAtaque3'},

]
const PENDERTUGA_ATAQUES = [
    { nombre:'Hembolia cerebral',id:'botonAtaque1'},
    { nombre:'Derrame cerebral',id:'botonAtaque2'},
    { nombre:'tumor incinerante',id:'botonAtaque3'},
    { nombre:'Escondete en el caparazon',id:'botonAtaque3'}
]
const PITOCHU_ATAQUES = [
    { nombre:'Mordida en el huevo izquierdo',id:'botonAtaque1'},
    { nombre:'Mordida en el huevo derecho',id:'botonAtaque2'},
    { nombre:'Electroviolada',id:'botonAtaque2'},
    { nombre:'Pitotrueno especial ;)',id:'botonAtaque3'}
]
const BACULAO_ATAQUES= [
    { nombre:'tpjmldbpavqdnecpsec',id:'botonAtaque1'},
    { nombre:'tiro radiactivo',id:'botonAtaque2'},
    { nombre:'colataso suave',id:'botonAtaque1'},
    { nombre:'colatazo de agua',id:'botonAtaque3'}
]
Motapod.ataques.push(...MOTAPOD_ATAQUES)
Pendertuga.ataques.push(...PENDERTUGA_ATAQUES)
Pitochu.ataques.push(...PITOCHU_ATAQUES)
Baculao.ataques.push(...BACULAO_ATAQUES)
//Starbienpishependejo.ataques.push(...Starbienpishependejo_ATAQUES)

puchamones.push(Motapod,Pendertuga,Pitochu,Baculao)
//Starbienpishependejo 
function iniciarJuego() {
    seccionataquees.style.display = 'none'
    ocultaelreinicio.style.display = 'none'
    seccionvermapa.style.display = 'none'
    puchamones.forEach((puchamon) => {
        opciondepuchamones = `
        <input type="radio"name=puchamon id=${puchamon.nombre} />
        <label class="targetadepuchamon" for=${puchamon.nombre}>
            <p>${puchamon.nombre}</p>
            <img src=${puchamon.foto} alt=${puchamon.nombre}>
        </label>
        `
    contenedortargetas.innerHTML += opciondepuchamones
    inputMotapod= document.getElementById('Motapod')
    inputPendertuga= document.getElementById('Pendertuga')
    inputPitochu= document.getElementById('Pitochu')
    inputBaculao= document.getElementById('Baculao')
    //inputStarbienpinshependejo= document.getElementById('Starbienpinshependejo')
    })
    BotonMascotaJugador.addEventListener('click',Selecionoelpuchamon)
    reiniciar.addEventListener('click',reiniciandolaversh)
    unirsealjuego()
}

function unirsealjuego(){
    fetch("http://192.168.3.10:8080/unirse")
        .then(function (res){
            if (res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })

}

function Selecionoelpuchamon(){

    

    if (inputMotapod.checked){
        spanpuchamonjugador1.innerHTML = inputMotapod.id
        mascotajugador1 = inputMotapod.id
    } else if (inputPendertuga.checked) {
        spanpuchamonjugador1.innerHTML = inputPendertuga.id
        mascotajugador1 = inputPendertuga.id
    } else if (inputPitochu.checked) {
        spanpuchamonjugador1.innerHTML = inputPitochu.id
        mascotajugador1 = inputPitochu.id
    } else if (inputBaculao.checked) {
        spanpuchamonjugador1.innerHTML = inputBaculao.id
        mascotajugador1 = inputBaculao.id
    } else {
        alert("'El jugador es retrasado, dice motapood', (SELECCIONA UN PUCHAMON ANTES DE INICIAR)")
        return
    }
    seccionmascotas.style.display = 'none'
        ///else if (inputStarbienpinshependejo.checked) {
        /// spanpuchamonjugador1.innerHTML = inputStarbienpinshependejo.id
        /// mascotajugador1 = inputStarbienpinshependejo.id 
        
    

    seleccionaUnpuchamon(mascotajugador1)

    extraerataques(mascotajugador1) 
    seccionvermapa.style.display = 'flex'
    iniciarmapa() 
}

function seleccionaUnpuchamon(mascotajugador1){
    fetch(`http://192.168.3.10:8080/puchamon/${jugadorId}`, {
        method:"post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            puchamon: mascotajugador1
        })
    })
}

function extraerataques(mascotajugador1) {
    let ataques
    for (let i = 0; i < puchamones.length; i++) {
        if (mascotajugador1 === puchamones[i].nombre) {
            ataques = puchamones[i].ataques
        }
        
    }
    mostrarataques(ataques)
}
function mostrarataques(ataques) {
    ataques.forEach((ataque) => {
        ataquespuchamones = `
        <button id=${ataque.id} class="ataqueboton BAtaque">${ataque.nombre}</button>
        `
        contenedorataques.innerHTML += ataquespuchamones
    })
     amam1 = document.getElementById('botonAtaque1')
     amam2 = document.getElementById('botonAtaque2')
     amam3 = document.getElementById('botonAtaque3')
     botonesataque = document.querySelectorAll('.BAtaque')
}
function secuenciaataques() {
    botonesataque.forEach((boton) => {
        boton.addEventListener('click',(e) => {
            if (e.target.textContent === 'botonAtaque1') {
                ataquejugador.push('Ataque1')
                console.log(ataquejugador)
                boton.style.backround = '#122f58'
                boton.disabled = true
            } else if (e.target.textContent === 'botonAtaque2') {
                ataquejugador.push('Ataque2')
                console.log(ataquejugador)
                boton.style.backround = '#122f58'
                boton.disabled = true
            } else {
                ataquejugador.push('Ataque3')
                console.log(ataquejugador)
                boton.style.backround = '#122f58'
                boton.disabled = true
            }
            if (ataquejugador.length === 5){
                enviarataques()
            }
            
        })
    })
}

function enviarataques() {
    fetch(`http://192.168.3.10:8080/puchamon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataquejugador
        })
    })

    intervalo = setInterval(obtenerataques,50)
}

function obtenerataques() {
    fetch(`http://192.168.3.10:8080/puchamon/${enemigoId}/ataques`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({ataques}){
                        if (ataques.length === 5){
                            ataqueenemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function Elijenelpuchamonmalo(enemigo) {
    spanmascotaenemigo.innerHTML = enemigo.nombre
    ataquespuchamonenemigo = enemigo.ataques
    secuenciaataques()
}
function ataquealeatorioenemigo() {
    console.log('El ataque enemigo:'+ ataquespuchamonenemigo );
    let ataquealeatorio = aleatorio(0,ataquespuchamonenemigo.length - 1)
    if(ataquealeatorio == 0 || ataquealeatorio == 1){
        ataqueenemigo.push('Ataque1')
    } else if (ataquealeatorio == 3 || ataquealeatorio == 4) {
        ataqueenemigo.push('Ataque2')
    } else {
        ataqueenemigo.push('Ataque3')
    }
    console.log(ataqueenemigo)
    iniciarpelea()
}
function iniciarpelea(){
    if (ataquejugador.length === 5){
        combate()
    }
    
}
function indexambosoponentes(jugador,enemigo){
    indexataquejugador = ataquejugador[jugador]
    indexataqueenemigo = ataqueenemigo[enemigo]
}
function combate() {
    clearInterval(intervalo) 
    for (let index = 0;index<ataquejugador.length;index++ ) {
        if (ataquejugador[index] === ataqueenemigo[index]) {
            indexambosoponentes(index,index) 
            crearmensaje("Empate")
        } else if (ataquejugador[index] === 'Ataque1' && ataqueenemigo[index] === 'Ataque2') {
            indexambosoponentes(index,index)
            crearmensaje('Ganaste')
            victoriasjugador++
            spanvidasjugador.innerHTML = victoriasjugador
        } else if (ataquejugador[index] === 'Ataque3' && ataqueenemigo[index] === 'Ataque1') {
            indexambosoponentes(index,index)
            crearmensaje('Ganaste')
            victoriasjugador++
            spanvidasjugador.innerHTML = victoriasjugador
        } else if (ataquejugador[index] === 'Ataque2' && ataqueenemigo[index] === 'Ataque3') {
            indexambosoponentes(index,index)
            crearmensaje('Ganaste')
            victoriasjugador++
            spanvidasjugador.innerHTML = victoriasjugador
        } else {
            indexambosoponentes(index,index)
            crearmensaje('Perdiste')
            victoriasenemigo++
            spanvidasenemigo.innerHTML = victoriasenemigo
        }        
    }
    
    revisandoperdedor()
}
function revisandoperdedor() {
    if (victoriasjugador===victoriasenemigo){
        findegame("Empate")
    } else if (victoriasjugador>victoriasenemigo){
        findegame("Ganaste")
    } else {
        findegame("Perdiste")
    }
}
function crearmensaje(resultado2) {
    let nuevoataquejugador = document.createElement('p')
    let nuevoataqueenemigo = document.createElement('p')
    seccionmensajes.innerHTML = resultado2
    nuevoataquejugador.innerHTML = indexataquejugador
    nuevoataqueenemigo.innerHTML = indexataqueenemigo
    ataquejugadorm.appendChild(nuevoataquejugador)
    ataqueenemigom.appendChild(nuevoataqueenemigo)
}
function findegame(resultadofinal) {
    seccionmensajes.innerHTML = resultadofinal
    ocultaelreinicio.style.display = 'block'
}
function reiniciandolaversh() {
    location.reload()
}
function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1 ) + min)
}

function pintarcanvas(){
    mascotadejugadorobjeto.x = mascotadejugadorobjeto.x + mascotadejugadorobjeto.velocidadx
    mascotadejugadorobjeto.y = mascotadejugadorobjeto.y + mascotadejugadorobjeto.velocidady
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotadejugadorobjeto.pintarpuchamon()

    enviarposicion(mascotadejugadorobjeto.x,mascotadejugadorobjeto.y)

    puchamonesenemigos.forEach(function (puchamon){
        puchamon.pintarpuchamon()
        revisarcolicion(puchamon)
    })
}

function enviarposicion(x, y){
    fetch(`http://192.168.3.10:8080/puchamon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({enemigos}){
                    console.log(enemigos)                    
                    puchamonesenemigos = enemigos.map(function (enemigo) {
                        let puchamonenemigo = null
                        const puchamonnombre = enemigo.puchamon.nombre || ""
                        if (puchamonnombre === 'Motapod'){
                            puchamonenemigo = new Puchamon('Motapod', './dolordecabeza/motapodsinfondo.png', 4,'./dolordecabeza/motapodsinfondo.png',enemigo.id)
                        } else if (puchamonnombre === "Pendertuga") {
                            puchamonenemigo = new Puchamon('Pendertuga', './dolordecabeza/pendertugasinfondo.png', 4, './dolordecabeza/pendertugasinfondo.png',enemigo.id)
                        } else if (puchamonnombre === "Pitochu") {
                            puchamonenemigo = new Puchamon('Pitochu', './dolordecabeza/pitochusinfondo.png', 4, './dolordecabeza/pitochusinfondo.png',enemigo.id)
                        } else if (puchamonnombre === "Baculao") {
                            puchamonenemigo = new Puchamon('Baculao', './dolordecabeza/baculaosinfondo.png', 4, './dolordecabeza/baculaosinfondo.png',enemigo.id)
                        }
                        puchamonenemigo.x = enemigo.x
                        puchamonenemigo.y = enemigo.y
                        return puchamonenemigo
                    })

                })
        }
    })
}

function moverDerecha() {
    mascotadejugadorobjeto.velocidadx = 5
}
function moverIzquierda() {
    mascotadejugadorobjeto.velocidadx = -5
}
function moverAbajo() {
    mascotadejugadorobjeto.velocidady = 5
}
function moverArriba() {
    mascotadejugadorobjeto.velocidady = -5
}
function detenermovimiento() {
    mascotadejugadorobjeto.velocidadx = 0
    mascotadejugadorobjeto.velocidady = 0
}
function sepresionounmovimiento(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
    
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarmapa(){
    
    mascotadejugadorobjeto = obtenerobjetomascota(mascotajugador1)
    intervalo = setInterval(pintarcanvas,50)
 
    window.addEventListener('keydown', sepresionounmovimiento)
    window.addEventListener('keyup', detenermovimiento)
}

function obtenerobjetomascota() {
    for (let i = 0; i < puchamones.length; i++) {
        if (mascotajugador1 === puchamones[i].nombre) {
            return puchamones[i]
        }
        
    }
}

function revisarcolicion(enemigo){
    const arribaenemigo = enemigo.y
    const abajoenemigo = enemigo.y + enemigo.alto
    const derechaenemigo = enemigo.x + enemigo.ancho
    const izquierdaenemigo = enemigo.x 

    const arribamascota = mascotadejugadorobjeto.y
    const abajomascota = mascotadejugadorobjeto.y + mascotadejugadorobjeto.alto
    const derechamascota = mascotadejugadorobjeto.x + mascotadejugadorobjeto.ancho
    const izquierdamascota = mascotadejugadorobjeto.x 
    if(
        abajomascota < arribaenemigo || arribamascota > abajoenemigo || derechamascota < izquierdaenemigo || izquierdamascota > derechaenemigo
    ){
        return
    }
    detenermovimiento()
    clearInterval(intervalo)
    console.log("se detecto una coalicion");
    enemigoId = enemigo.id
    seccionataquees.style.display = 'flex'
    seccionvermapa.style.display = 'none'
    Elijenelpuchamonmalo(enemigo)
}

window.addEventListener('load',iniciarJuego)