export class Renderer {

    constructor(game) {

        this.game = game;

    }

    draw() {

        const ctx = this.game.ctx;
        const canvas = this.game.canvas;

        const maze = this.game.maze;
        const eel = this.game.eel;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 壁
        ctx.fillStyle = "#355";

        for (const wall of maze.walls) {

            ctx.fillRect(
                wall.x,
                wall.y,
                maze.tileSize,
                maze.tileSize
            );

        }

        // ゴール
        ctx.fillStyle = "gold";

        ctx.beginPath();

        ctx.arc(
            maze.goal.x,
            maze.goal.y,
            maze.goal.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // ウナギ
        ctx.save();

        ctx.translate(eel.x, eel.y);

        ctx.rotate(eel.angle);

        ctx.fillStyle = "#643";

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            maze.tileSize * 0.45,
            maze.tileSize * 0.18,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}
