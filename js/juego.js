const lienzo = document.getElementById('space')
const ctx = lienzo.getContext('2d')

//Seleccion menu

const menu = document.querySelector('.botones')

//Seleccion gameOver

const gameOver = document.querySelector('.gameOver')

//Seleccion gameWin

const gameWin = document.querySelector('.gameWin')

//Balas
const balas = []

//Aliens

const aliens = []

const aliensG = []

//Dibujos de todo
const vidas = new Image()
vidas.src = './assets/image/vidas.png'
const naveI = new Image()
naveI.src = './assets/image/naveIz.png'
const navef = new Image()
navef.src = './assets/image/nave.png'
const asteroide = new Image()
asteroide.src = './assets/image/asteroide.png'
const alienGi = new Image()
alienGi.src = './assets/image/alien.png'
const bullet = new Image()
bullet.src = './assets/image/bala.png'

//Personaje - Clase
class PlanetExpress {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.img = navef
    this.velocidad = 10
    this.lifes = 4
  }
  //Metodos de planet
  dibujarse() {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
  disparar() {
    const bala = new Bala(this.x + this.w, this.y + this.h / 2)
    balas.push(bala)
  }
  adelante() {
    if (this.x < 900) {
      this.x += this.velocidad
    }
    this.img = navef
  }
  atras() {
    if (this.x > 0) {
      this.x -= this.velocidad
    }
    this.img = naveI
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
    this.img = bullet
  }

  dibujarse() {
    ctx.drawImage(this.img, this.x, this.y, 30, 20)
    this.x += 20
    if (this.x > 1000) {
      balas.shift()
    }
  }
}
//Alien gigante
class AlienG {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.direccion = 'arriba'
    this.lifes = 50
  }

  dibujarse() {
    if (this.y == 0) {
      this.direccion = 'abajo'
    }

    if (this.y + 100 == 500) {
      this.direccion = 'arriba'
    }

    if (this.direccion == 'arriba') {
      this.y -= 5
    } else {
      this.y += 5
    }

    ctx.drawImage(alienGi, this.x, this.y, 200, 100)
  }
}

//Alien
class Alien {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.img = asteroide
  }
  dibujarse() {
    this.x -= 10

    ctx.drawImage(this.img, this.x, this.y, 50, 50)
  }
}

ctx.fillStyle = 'white'
// ctx.fillRect()

//Instancia

const aG = new AlienG(800, 200, 200, 100)

const nave = new PlanetExpress(10, 145, 150, 60)

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

//Funciones para empezar juego

function empezarJuego() {
  setInterval(() => {
    ctx.clearRect(0, 0, 1000, 500)
    nave.dibujarse()
    aG.dibujarse()

    if (nave.lifes === 0) {
      setGameOver()
    }

    //Balas dibujadas
    balas.forEach((bala, indexBala) => {
      bala.x += 2
      bala.dibujarse()

      // Choque
      if (aG.x <= bala.x && aG.y <= bala.y && aG.y + 100 >= bala.y) {
        balas.splice(indexBala, 1)
        aG.lifes--
      }
      if (aG.lifes === 0) {
        nave.lifes += 10 ^ 100000000
        setGameWin()
      }

      //choque de balas con meteoritos!!!!
      aliens.forEach((alien, indexAlien) => {
        if (alien.x <= bala.x && bala.y >= alien.y && bala.y <= alien.y + 40) {
          aliens.splice(indexAlien, 1)
          balas.splice(indexBala, 1)
        }
      })
      //////
      //if(alieng <= bala.x && bala.y >= alieng.y && bala.y <= alieng.y)
    })
    //dibujar aliens
    aliens.forEach((alien, indexAlien) => {
      alien.dibujarse()

      //Colision de la nave vs meteoritos
      if (
        alien.x <= nave.x + 150 &&
        nave.y >= alien.y &&
        nave.x <= alien.x &&
        nave.y <= alien.y + 50
      ) {
        nave.lifes--
        aliens.splice(indexAlien, 1)
      }
    })
    // Pintar da;o
    ctx.font = '20px Arial'
    ctx.fillText(`${aG.lifes} Vida`, 900, 20)

    //Pintar Vidas
    mostrarVidas()
  }, 50)
}

//Seleccionamos el boton y empezamos a jugar

let btn = document.getElementById('jugar')
btn.addEventListener('click', () => {
  empezarJuego()
  crearAliens()

  btn.classList.add('none')
})

//creacion de alien
function crearAliens() {
  setInterval(() => {
    const posicionY = Math.floor(Math.random() * 450)
    const a = new Alien(1000, posicionY)
    aliens.push(a)
  }, 1000)
}

//Mostrar vida de planetExpress

function mostrarVidas() {
  if (nave.lifes === 4) {
    ctx.drawImage(vidas, 10, 0, 40, 30)
    ctx.drawImage(vidas, 40, 0, 40, 30)
    ctx.drawImage(vidas, 70, 0, 40, 30)
    ctx.drawImage(vidas, 100, 0, 40, 30)
  }
  if (nave.lifes === 3) {
    ctx.drawImage(vidas, 10, 0, 40, 30)
    ctx.drawImage(vidas, 40, 0, 40, 30)
    ctx.drawImage(vidas, 70, 0, 40, 30)
  }
  if (nave.lifes === 2) {
    ctx.drawImage(vidas, 10, 0, 40, 30)
    ctx.drawImage(vidas, 40, 0, 40, 30)
  }
  if (nave.lifes === 1) {
    ctx.drawImage(vidas, 10, 0, 40, 30)
  }
}

//Game Over

function setGameOver() {
  //Agregar la clase none al menu y canvas
  lienzo.classList.add('none')
  menu.classList.add('none')
  gameOver.classList.remove('none')
}

//Game Win

function setGameWin() {
  lienzo.classList.add('none')
  menu.classList.add('none')
  gameWin.classList.remove('none')
}
