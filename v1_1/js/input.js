// ----------------
// マウス操作
// ----------------

canvas.addEventListener("mousemove", function(event){

    target.x = event.clientX;
    target.y = event.clientY;

});

// ----------------
// タッチ操作
// ----------------

canvas.addEventListener("touchmove", function(event){

    event.preventDefault();

    target.x = event.touches[0].clientX;
    target.y = event.touches[0].clientY;

},{

    passive:false

});
