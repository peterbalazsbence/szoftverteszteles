class Rover {
    constructor(x, y, direction, width, height, obstacles = []) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.width = width;
        this.height = height;
        this.obstacles = new Set(obstacles.map(([ox, oy]) => ox + "," + oy));
    }

    state() {
        return { x: this.x, y: this.y, direction: this.direction };
    }

    execute(commands) {
        let obstacle = null;
        return { ...this.state(), obstacle };
    }
}
