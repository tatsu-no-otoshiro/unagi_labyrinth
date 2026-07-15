import { CONFIG } from "./config.js";

export class Renderer {

    constructor(game) {

        this.game = game;

        // 波アニメーション用
        this.waveTime = 0;

    }

    draw() {

        const ctx = this.game.ctx;
        const canvas = this.game.canvas;

        const maze = this.game.maze;
        const eel = this.game.eel;

        // 時間更新
        this.waveTime += 0.12;

        // 背景
        ctx.fillStyle = CONFIG.COLORS.BACKGROUND;

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        // 壁
        ctx.fillStyle = CONFIG.COLORS.WALL;

        for (const wall of maze.walls) {

            ctx.fillRect(
                wall.x,
                wall.y,
                maze.tileSize,
                maze.tileSize
            );

        }

        // ゴール
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

        // ==========================
        // 波打ち胴体座標を生成
        // ==========================

        const bodyPoints = [];

        for (let i = 0; i < eel.body.length; i++) {

            const part = eel.body[i];

            let next;

            if (i === 0) {

                next = {
                    x: eel.x,
                    y: eel.y
                };

            } else {

                next = eel.body[i - 1];

            }

            const dx = next.x - part.x;
            const dy = next.y - part.y;

            const len = Math.hypot(dx, dy);

            if (len < 0.001) {

                bodyPoints.push({
                    x: part.x,
                    y: part.y
                });

                continue;

            }

            // 接線
            const tx = dx / len;
            const ty = dy / len;

            // 法線
            const nx = -ty;
            const ny = tx;

            // 頭へ近いほど少し小さく、
            // 尻尾へ向かうほど自然に揺れる
            const t = i / eel.body.length;

            const amplitude =
                2 +
                Math.sin(t * Math.PI) * 3;

            const phase =
                this.waveTime
                - i * 0.65;

            const offset =
                Math.sin(phase) * amplitude;

            bodyPoints.push({

                x: part.x + nx * offset,
                y: part.y + ny * offset

            });

        }

        }

        // ==========================
        // 胴体描画
        // ==========================

        if (bodyPoints.length > 0) {

            // 一本線
            ctx.strokeStyle = CONFIG.COLORS.EEL;
            ctx.lineWidth = CONFIG.BODY_RADIUS * 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.beginPath();

            // 尻尾から頭へ描く
            ctx.moveTo(
                bodyPoints[bodyPoints.length - 1].x,
                bodyPoints[bodyPoints.length - 1].y
            );

            for (let i = bodyPoints.length - 2; i >= 0; i--) {

                ctx.lineTo(
                    bodyPoints[i].x,
                    bodyPoints[i].y
                );

            }

            ctx.lineTo(
                eel.x,
                eel.y
            );

            ctx.stroke();

            // 節を重ねて滑らかに見せる
            ctx.fillStyle = CONFIG.COLORS.EEL;

            for (const part of bodyPoints) {

                ctx.beginPath();

                ctx.arc(
                    part.x,
                    part.y,
                    CONFIG.BODY_RADIUS,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }

        }

        // ==========================
        // 頭
        // ==========================

        ctx.save();

        ctx.translate(
            eel.x,
            eel.y
        );

        ctx.rotate(
            eel.angle
        );

        ctx.fillStyle = CONFIG.COLORS.EEL;

        // 少しふっくらした頭
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
