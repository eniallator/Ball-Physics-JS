const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const boundary = { x: canvas.offsetWidth, y: canvas.offsetHeight }
const velMult = 5
const velMin = 2
const balls = []

for (let i = 0; i < 5; i++) {
    const radius = 30 + Math.random() * 50
    const vel = {
        x: velMult * Math.random() - velMult / 2,
        y: velMult * Math.random() - velMult / 2
    }
    balls.push(
        new Ball(
            radius + Math.random() * (boundary.x - 2 * radius),
            radius + Math.random() * (boundary.y - 2 * radius),
            radius,
            vel.x + velMin * (vel.x / Math.abs(vel.x)),
            vel.y + velMin * (vel.y / Math.abs(vel.y))
        )
    )
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
