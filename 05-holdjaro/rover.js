class Rover {
    constructor(x, y, direction, width, height, obstacles = []) {
        if (!Number.isInteger(width) || width < 2 || width % 2 !== 0 ||
            !Number.isInteger(height) || height < 2 ||
            !Number.isInteger(x) || x < 0 || x >= width ||
            !Number.isInteger(y) || y < 0 || y >= height ||
            !["N", "E", "S", "W"].includes(direction) ||
            !Array.isArray(obstacles) || obstacles.some(point =>
                !Array.isArray(point) || point.length !== 2 ||
                !Number.isInteger(point[0]) || point[0] < 0 || point[0] >= width ||
                !Number.isInteger(point[1]) || point[1] < 0 || point[1] >= height)) {
            throw new RangeError("Érvénytelen térkép vagy kezdőállapot.");
        }
        if (obstacles.some(([ox, oy]) => ox === x && oy === y)) {
            throw new RangeError("A kezdőponton akadály van.");
        }
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
        if (typeof commands !== "string" || /[^fblr]/.test(commands)) {
            throw new RangeError("Csak az f, b, l és r parancsok használhatók.");
        }
        let obstacle = null;
        for (const command of commands) {
            const directions = ["N", "E", "S", "W"];
            if (command === "r" || command === "l") {
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
            nextX = (nextX + this.width) % this.width;
            if (nextY < 0 || nextY >= this.height) {
                nextY = nextY < 0 ? 0 : this.height - 1;
                nextX = (nextX + this.width / 2) % this.width;
                nextDirection = this.direction === "N" ? "S" : "N";
            }
            if (this.obstacles.has(nextX + "," + nextY)) {
                obstacle = { x: nextX, y: nextY };
                break;
            }
            this.x = nextX;
            this.y = nextY;
            this.direction = nextDirection;
        }
        return { ...this.state(), obstacle };
    }
}
