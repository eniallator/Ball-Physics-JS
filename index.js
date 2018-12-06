const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const boundary = { x: canvas.offsetWidth, y: canvas.offsetHeight }
const velMult = 5
const velMin = 2
const balls = []

const maxSpawnAttempts = 100
let spawnAttempts = 0

for (let i = 0; i < 5; i++) {
    let ball
    const radius = 30 + Math.random() * 50

    const vel = {
        x: velMult * Math.random() - velMult / 2,
        y: velMult * Math.random() - velMult / 2
    }
    vel.x = vel.x + velMin * (vel.x / Math.abs(vel.x))
    vel.y = vel.y + velMin * (vel.y / Math.abs(vel.y))

    do {
        if (spawnAttempts > maxSpawnAttempts) {
            console.log('max spawn attempts reached')
            break
        }
        spawnAttempts++

        ball = new Ball(
            radius + Math.random() * (boundary.x - 2 * radius),
            radius + Math.random() * (boundary.y - 2 * radius),
            radius,
            vel.x,
            vel.y
        )
    } while (balls.some(other => ball.checkCollision(other)))

    if (spawnAttempts > maxSpawnAttempts) break
    balls.push(ball)
}

function run() {
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, boundary.x, boundary.y)

    for (let i in balls) {
        const ball = balls[i]
        if (balls.some((other, j) => Number(i) !== j && ball.checkCollision(other))) ctx.fillStyle = 'red'
        else ctx.fillStyle = 'black'

        ball.draw(ctx)

        ball.collideSides(boundary)
        ball.updatePos()
    }

    requestAnimationFrame(run)
}

run()
