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
        for (const command of commands.slice(0, 1)) {
            const directions = ["N", "E", "S", "W"];
            if (command === "r") {
                const offset = command === "r" ? 1 : 3;
                this.direction = directions[(directions.indexOf(this.direction) + offset) % 4];
                continue;
            }
            let dx = 0;
            let dy = 0;
            if (this.direction === "N") dy = 1;
            if (this.direction === "S") dy = -1;
            if (this.direction === "E") dx = 1;
            if (this.direction === "W") dx = -1;
            const sign = command === "b" ? -1 : 1;
            let nextX = this.x + sign * dx;
            let nextY = this.y + sign * dy;
            let nextDirection = this.direction;
            this.x = nextX;
            this.y = nextY;
            this.direction = nextDirection;
        }
        return { ...this.state(), obstacle };
    }
}
