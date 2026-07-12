// ================================
// ウナギの迷宮
// Ver.1.1.0-alpha2 Rebuild
// game.js
// ================================

"use strict";

const Game = {

    version : "1.1.0-alpha2",

    canvas : null,

    ctx : null,

    width : 0,

    height : 0,

    init(){

        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");

        this.resize();

        window.addEventListener("resize", () => {

            this.resize();

        });

        this.loop();

    },

    resize(){

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

    },

    update(){

        // alpha2ではまだ何もしない

    },

    draw(){

        const ctx = this.ctx;

        ctx.fillStyle = "#9ed8ff";
        ctx.fillRect(0,0,this.width,this.height);

    },

    loop(){

        this.update();

        this.draw();

        requestAnimationFrame(() => this.loop());

    }

};

window.addEventListener("load", () => {

    Game.init();

});
