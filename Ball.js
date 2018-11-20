class Ball {
    constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x + this.radius / 2, this.y, this.radius, 0, 2 * Math.PI, false)
        ctx.fill()
    }
}
