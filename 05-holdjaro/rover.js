class Rover {
    constructor(x, y, direction, width, height, obstacles = []) {
    }

    state() {
        return { x: this.x, y: this.y, direction: this.direction };
    }

    execute(commands) {
        let obstacle = null;
        return { ...this.state(), obstacle };
    }
}
