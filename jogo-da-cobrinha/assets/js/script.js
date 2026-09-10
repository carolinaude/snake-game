const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const size = 30

const snake = [


    { x: 210, y: 240 },
    { x: 210, y: 240 }


]

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)


}

const food = {
    x: randomNumber(0, canvas.width / size) * size,
    y: randomNumber(0, canvas.height / size) * size,

    color: 'blue'


}

const drawFood = () => {


    ctx.fillStyle = food.color
    ctx.fillRect(food.x, food.y, size, size)

}

let direction, loopId
let score = 0
let gameOver = false
let gameStarted = false

const drawScore = () => {

    ctx.fillStyle = 'white'
    ctx.font = '20px Poppins'
    ctx.textAlign = 'left'
    ctx.fillText(`Pontuação: ${score}`, 10, 25)
}

const drawSnake = () => {

    snake.forEach((element, index) => {


        if (index == snake.length - 1) {
            ctx.fillStyle = 'pink'

        } else {
            ctx.fillStyle = 'yellow'


        }

        ctx.fillRect(element.x, element.y, size, size)

    })

}
const moveSnake = () => {

    if (!direction) return
    const head = snake[snake.length - 1]

    let newHead
    if (direction == 'right') newHead = { x: head.x + size, y: head.y }
    if (direction == 'left') newHead = { x: head.x - size, y: head.y }
    if (direction == 'down') newHead = { x: head.x, y: head.y + size }
    if (direction == 'up') newHead = { x: head.x, y: head.y - size }

   
    if (
        newHead.x < 0 ||
        newHead.x >= canvas.width ||
        newHead.y < 0 ||
        newHead.y >= canvas.height
    ) {
        gameOver = true
        return
    }
    snake.push(newHead)

    if (newHead.x == food.x && newHead.y == food.y) {
        score++
        food.x = randomNumber(0, canvas.width / size) * size
        food.y = randomNumber(0, canvas.height / size) * size

    } else {
        snake.shift()
    }

    const hitBody = snake.some((element, index) => {

        if (index == snake.length - 1) return false
        return element.x == newHead.x && element.y == newHead.y
    })

    if (hitBody) {
        gameOver = true
        return
    }

}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'white'
    for (let i = 0; i < canvas.width; i += 30) {


        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 600)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

const drawGameOver = () => {


    ctx.fillStyle = 'red'
    ctx.font = '40px Poppins'
    ctx.textAlign = 'center'
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2)
    ctx.fillStyle = 'white'
    ctx.font = '20px Poppins'
    ctx.fillText(`Pontuação: ${score}`, canvas.width / 2, canvas.height / 2 + 40)

    ctx.font = '16px Poppins'

    ctx.fillText(
        'Pressione ENTER para jogar novamente',
        canvas.width / 2,
        canvas.height / 2 + 80
    )


}

const restartGame = () => {


    snake.length = 0


    snake.push(
        { x: 210, y: 240 },
        { x: 210, y: 270 }
    )

    score = 0
    direction = undefined
    gameOver = false

    food.x = randomNumber(0, canvas.width / size) * size
    food.y = randomNumber(0, canvas.height / size) * size


    gameLoop()
}

const drawStartMenu = () => {

    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'

    ctx.font = '45px Poppins'
    ctx.fillText('SNAKE GAME', canvas.width / 2, 230)

    ctx.font = '22px Poppins'
    ctx.fillText('Use as setas para jogar', canvas.width / 2, 300)

    ctx.font = '20px Poppins'
    ctx.fillText('Pressione ENTER para iniciar', canvas.width / 2, 360)

}

const gameLoop = () => {


    clearTimeout(loopId)
    ctx.clearRect(0, 0, 600, 600)


     if (!gameStarted) {

        drawStartMenu()

        return

    }

    if (gameOver) {


        drawGrid()
        drawSnake()
        drawGameOver()

        return

    }
    drawFood()
    drawGrid()
    drawScore()
    moveSnake()
    drawSnake()


    loopId = setTimeout(() => {

        gameLoop()
    }, 200)
}

gameLoop()

document.addEventListener('keydown', ({ key }) => {

    if (key == 'ArrowRight' && direction != 'left') {
        direction = 'right'
    }


    if (key == 'ArrowLeft' && direction != 'right') {
        direction = 'left'
    }


    if (key == 'ArrowDown' && direction != 'up') {
        direction = 'down'
    }

    if (key == 'ArrowUp' && direction != 'down') {
        direction = 'up'
    }

      if (key == 'Enter' && !gameStarted) {
        gameStarted = true
        gameLoop()

    }
    if (key == 'Enter' && gameOver) {
        restartGame()


    }


})
