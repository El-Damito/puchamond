const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador{
    constructor(id){
        this.id = id
    }

    asignarPuchamon(puchamon) {
        this.puchamon = puchamon
    }

    actualizarposicion(x,y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }

}

class Puchamon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse",(req, res) =>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin","*")

    res.send(id)
})

app.post("/puchamon/:jugadorId",(req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.puchamon || ""
    const puchamon = new Puchamon(nombre)
    const jugadorindex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if (jugadorindex >= 0) {
        jugadores[jugadorindex].asignarPuchamon(puchamon)
    }

    console.log(jugadores)
    console.log(jugadorId);
    res.end()
})

app.post("/puchamon/:jugadorId/posicion", (req, res)=>{
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0
    const jugadorindex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if (jugadorindex >= 0) {
        jugadores[jugadorindex].actualizarposicion(x,y)
    }

    const enemigos = jugadores.filter((jugador)=> jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/puchamon/:jugadorId/ataques",(req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []

    const jugadorindex = jugadores.findIndex((jugador)=> jugadorId === jugador.id)

    if (jugadorindex >= 0) {
        jugadores[jugadorindex].asignarAtaques(ataques)
    }

    res.end()
})

app.get("/puchamon/:jugadorId/ataques",(req,res)=>{
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, ()=> {
    console.log("servidor funcionando y operando a toda verga xD XDDDDDD");
})