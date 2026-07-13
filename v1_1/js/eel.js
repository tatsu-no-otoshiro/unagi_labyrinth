export class Eel {

    constructor(game) {

        this.game = game;

        this.x = 0;
        this.y = 0;

        this.angle = 0;

        this.speed = 2.5;

        this.radius = 8;

    }

    reset() {

        const start = this.game.maze.start;

        this.x = start.x;
        this.y = start.y;

        this.angle = 0;

    }

}
