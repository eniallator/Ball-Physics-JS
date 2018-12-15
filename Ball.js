class Ball {
    constructor(posX, posY, radius, velX, velY) {
        this.radius = radius
        this.pos = { x: posX, y: posY }
        this.vel = { x: velX, y: velY }
        this.collisionMultiplier = 2.5
    }

    updatePos() {
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
    }

    collideSides(boundary) {
        if (this.pos.x + this.vel.x < this.radius || this.pos.x + this.vel.x > boundary.x - this.radius) this.vel.x *= -1
        if (this.pos.y + this.vel.y < this.radius || this.pos.y + this.vel.y > boundary.y - this.radius) this.vel.y *= -1
    }

    AABBFirstCollision(other) {
        if (
            this.pos.x - this.radius < other.pos.x + other.radius &&
            other.pos.x - other.radius <= this.pos.x + this.radius &&
            this.pos.y - this.radius < other.pos.y + other.radius &&
            other.pos.y - other.radius <= this.pos.y + this.radius
        )
            return true
    }

    checkCollision(other) {
        if (
            this.AABBFirstCollision(other) &&
            Math.sqrt(Math.pow(this.pos.x - other.pos.x, 2) + Math.pow(this.pos.y - other.pos.y, 2)) <= this.radius + other.radius
        )
            return true
    }

    collideBall(other) {
        if (!this.checkCollision(other)) return

        const diffVec = {
            x: this.pos.x - other.pos.x,
            y: this.pos.y - other.pos.y
        }

        const normVec = {
            x: diffVec.x / (Math.abs(diffVec.x) + Math.abs(diffVec.y)),
            y: diffVec.y / (Math.abs(diffVec.x) + Math.abs(diffVec.y))
        }

        const totalRadius = this.radius + other.radius

        this.vel.x += Math.pow(other.radius / totalRadius, 1.3) * normVec.x * this.collisionMultiplier
        this.vel.y += Math.pow(other.radius / totalRadius, 1.3) * normVec.y * this.collisionMultiplier

        other.vel.x -= Math.pow(this.radius / totalRadius, 1.3) * normVec.x * other.collisionMultiplier
        other.vel.y -= Math.pow(this.radius / totalRadius, 1.3) * normVec.y * other.collisionMultiplier
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false)
        ctx.fill()
    }
}
