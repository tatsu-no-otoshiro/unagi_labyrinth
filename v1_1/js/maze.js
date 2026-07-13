export class Maze {

    constructor(game) {

        this.game = game;

        this.map = [
            "###############",
            "#S      #     #",
            "# ##### # ### #",
            "# #     #   # #",
            "# # ####### # #",
            "# #       # # #",
            "# ####### # # #",
            "#       # #   #",
            "####### # ### #",
            "#     # #     #",
            "# ### # ##### #",
            "# #   #     # #",
            "# # ####### # #",
            "#         #  G#",
            "###############"
        ];

        this.tileSize = 32;
        this.offsetX = 0;
        this.offsetY = 0;

        this.walls = [];

        this.start = {
            x: 0,
            y: 0
        };

        this.goal = {
            x: 0,
            y: 0,
            radius: 10
        };

    }

    build() {

        this.walls = [];

        const canvas = this.game.canvas;

        this.tileSize = Math.floor(
            Math.min(
                (canvas.width - 40) / 15,
                (canvas.height - 40) / 15
            )
        );

        this.offsetX = (canvas.width - this.tileSize * 15) / 2;
        this.offsetY = (canvas.height - this.tileSize * 15) / 2;

        for (let y = 0; y < 15; y++) {

            for (let x = 0; x < 15; x++) {

                const ch = this.map[y][x];

                const px = this.offsetX + x * this.tileSize;
                const py = this.offsetY + y * this.tileSize;

                if (ch === "#") {

                    this.walls.push({
                        x: px,
                        y: py
                    });

                }

                if (ch === "S") {

                    this.start.x = px + this.tileSize / 2;
                    this.start.y = py + this.tileSize / 2;

                }

                if (ch === "G") {

                    this.goal.x = px + this.tileSize / 2;
                    this.goal.y = py + this.tileSize / 2;

                }

            }

        }

    }

}
