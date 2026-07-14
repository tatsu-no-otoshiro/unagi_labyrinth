import { CONFIG } from "./config.js";

export class Renderer {

    constructor(game) {

        this.game = game;

    }

    draw() {

        const ctx = this.game.ctx;
        const canvas = this.game.canvas;

        const maze = this.game.maze;
        const eel = this.game.eel;

        // ----------------------------
        // 背景
        // ----------------------------

        ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // ----------------------------
        // 壁
        // ----------------------------

        ctx.fillStyle = CONFIG.COLORS.WALL;

        for (const wall of maze.walls) {

            ctx.fillRect(
                wall.x,
                wall.y,
                maze.tileSize,
                maze.tileSize
            );

        }

        // ----------------------------
        // ゴール
        // ----------------------------

        ctx.fillStyle = CONFIG.COLORS.GOAL;

        ctx.beginPath();

        ctx.arc(
            maze.goal.x,
            maze.goal.y,
            maze.goal.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // ----------------------------
        // ウナギの胴体
        // ----------------------------

        if (eel.body.length > 0) {

            ctx.strokeStyle = CONFIG.COLORS.EEL;
            ctx.lineWidth = CONFIG.BODY_RADIUS * 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.beginPath();

            // しっぽ
            ctx.moveTo(
                eel.body[eel.body.length - 1].x,
                eel.body[eel.body.length - 1].y
            );

            // 胴体
            for (let i = eel.body.length - 2; i >= 0; i--) {

                ctx.lineTo(
                    eel.body[i].x,
                    eel.body[i].y
                );

            }

            // 頭の付け根
            ctx.lineTo(
                eel.x,
                eel.y
            );

            ctx.stroke();

        }

        // ----------------------------
        // 頭
        // ----------------------------

        ctx.save();

        ctx.translate(
            eel.x,
            eel.y
        );

        ctx.rotate(
            eel.angle
        );

        ctx.fillStyle = CONFIG.COLORS.EEL;

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
