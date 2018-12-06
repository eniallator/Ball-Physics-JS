class Ball {
    constructor(posX, posY, radius, velX, velY) {
        this.radius = radius
        this.pos = { x: posX, y: posY }
        this.vel = { x: velX, y: velY }
    }

    updatePos() {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }

    collideSides(boundary) {
        if (this.pos.x + this.vel.x < this.radius || this.pos.x + this.vel.x > boundary.x - this.radius) this.vel.x *= -1
        if (this.pos.y + this.vel.y < this.radius || this.pos.y + this.vel.y > boundary.y - this.radius) this.vel.y *= -1
    }

    checkCollision(otherBall) {
        if (
            Math.sqrt(Math.pow(this.pos.x - otherBall.pos.x, 2) + Math.pow(this.pos.y - otherBall.pos.y, 2)) <=
            this.radius + otherBall.radius
        )
            return true
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false)
        ctx.fill()
    }
}
