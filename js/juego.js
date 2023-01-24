const lienzo = document.getElementById('space')
const ctx = lienzo.getContext('2d')

//Balas
const balas = []

//Aliens

const aliens = []

//Personaje - Clase
class PlanetExpress {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.velocidad = 10
  }
  //Metodos de planet
  dibujarse() {
    ctx.fillRect(this.x, this.y, this.w, this.h)
  }
  disparar() {
    const bala = new Bala(this.x + this.w, this.y + this.h / 2)
    balas.push(bala)
  }
  adelante() {
    if (this.x < 900) {
      this.x += this.velocidad
    }
  }
  atras() {
    if (this.x > 0) {
      this.x -= this.velocidad
    }
  }
  arriba() {
    if (this.y > 0) {
      this.y -= this.velocidad
    }
  }
  abajo() {
    if (this.y < 440) {
      this.y += this.velocidad
    }
  }
}

//Paquete -Clase

class Bala {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  dibujarse() {
    ctx.fillRect(this.x, this.y, 10, 5)
    this.x += 20
    if (this.x > 1000) {
      balas.shift()
    }
  }
}
//Alien gigante
class Alien {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  dibujarse() {
    this.x -= 10

    ctx.fillRect(this.x, this.y, 30, 50)
  }
}

ctx.fillStyle = 'white'
// ctx.fillRect()

//Instancia

const nave = new PlanetExpress(10, 145, 100, 60)

//Las teclas

document.addEventListener('keydown', (evento) => {
  switch (evento.key) {
    case 'ArrowRight':
      nave.adelante()
      break
    case 'ArrowLeft':
      nave.atras()
      break
    case 'ArrowUp':
      nave.arriba()
      break
    case 'ArrowDown':
      nave.abajo()
      break
    case ' ':
      nave.disparar()
  }
})

//Funcione spara empezar juego

function empezarJuego() {
  setInterval(() => {
    console.log('estamos')
    ctx.clearRect(0, 0, 1000, 500)
    nave.dibujarse()
    //Balas dibujadas
    balas.forEach((bala) => {
      bala.x += 2
      bala.dibujarse()
    })
    //dibujar aliens
    aliens.forEach((alien) => {
      alien.dibujarse()
    })
  }, 50)
}

//Seleccionamos el boton y empezamos a jugar

let btn = document.getElementById('jugar')
btn.addEventListener('click', () => {
  empezarJuego()

  btn.classList.add('none')
})

//creacion de alien

setInterval(() => {
  const posicionY = Math.floor(Math.random() * 500)
  const a = new Alien(1000, posicionY)
  aliens.push(a)
}, 3000)
