// ----------------
// 迷路データ
// ----------------

const maze = [

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

// ----------------
// マップ情報
// ----------------

let tileSize = 32;

let offsetX = 0;
let offsetY = 0;

const walls = [];

const goal = {

    x:0,
    y:0,
    r:10

};

// ----------------
// 迷路生成
// ----------------

function buildMaze(){

    walls.length = 0;

    tileSize = Math.floor(

        Math.min(

            (canvas.width - 40) / 15,
            (canvas.height - 40) / 15

        )

    );

    offsetX = (canvas.width - tileSize * 15) / 2;
    offsetY = (canvas.height - tileSize * 15) / 2;

    for(let y = 0; y < 15; y++){

        for(let x = 0; x < 15; x++){

            const cell = maze[y][x];

            const px = offsetX + x * tileSize;
            const py = offsetY + y * tileSize;

            if(cell === "#"){

                walls.push({

                    x:px,
                    y:py

                });

            }

            if(cell === "S"){

                eel.x = px + tileSize / 2;
                eel.y = py + tileSize / 2;

                target.x = eel.x;
                target.y = eel.y;

            }

            if(cell === "G"){

                goal.x = px + tileSize / 2;
                goal.y = py + tileSize / 2;

            }

        }

    }

}

// ----------------
// 壁判定
// ----------------

function hitWall(){

    for(const wall of walls){

        if(

            eel.x + eel.r > wall.x &&
            eel.x - eel.r < wall.x + tileSize &&
            eel.y + eel.r > wall.y &&
            eel.y - eel.r < wall.y + tileSize

        ){

            return true;

        }

    }

    return false;

}
