const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const balls = []

for (let i = 0; i < 5; i++) {
    balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height, 30 + Math.random() * 50))
}

function run() {
    // requestAnimationFrame(run)
}

run()
