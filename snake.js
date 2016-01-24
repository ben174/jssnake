/*jslint browser: true */
/*global $:false, console:false */


"use strict";
var snake = {
  boardSize: 20,
  appleCount: 40,
  board: [],
  dirX: true,
  stepSize: 1,
  headX: 10,
  headY: 10,
  body: [],
  score: 0,
  gameSpeed: 150,
  timer: null,
  init: function() {
    snake.createBoard();
    snake.drawBoard();
    snake.layApples();
    $(document).on("keydown", snake.keyDown);
    snake.timer = window.setInterval(snake.step, snake.gameSpeed);
  },
  createBoard: function() {
    snake.board = new Array(snake.boardSize);
    $(snake.board).each(function(i, item) {
      snake.board[i] = new Array(snake.boardSize);
    });
  },
  gameOver: function() {
    $("#status").text("Game Over");
    window.clearInterval(snake.timer);
  },
  keyDown: function(e) {
    // 38 = up, 37 = left, 40 = down, 39 = right
    if(e.keyCode == 38) {
      snake.dirX = false;
      snake.stepSize = -1;
    } else if (e.keyCode == 37) {
      snake.dirX = true;
      snake.stepSize = -1;
    } else if (e.keyCode == 40) {
      snake.dirX = false;
      snake.stepSize = 1;
    } else if (e.keyCode == 39) {
      snake.dirX = true;
      snake.stepSize = 1;
    }
  },
  drawBoard: function() {
    // only on init
    var y = 0,
        x = 0,
        table = null,
        row = null;
    table = $("#board");
    for(y = 0; y < snake.boardSize; y++) {
      row = $("<tr>");
      for(x = 0; x < snake.boardSize; x++) {
        $(row).append("<td>");
      }
      table.append(row);
    }
  },
  layApples: function() {
    var laid=0,
        x=0,
        y=0,
        cell=null;
    for(laid=0;laid<snake.appleCount;){
      x = Math.floor(Math.random() * snake.boardSize);
      y = Math.floor(Math.random() * snake.boardSize);
      cell = snake.getCell(x, y);
      if(!cell.hasClass("apple")) {
        cell.addClass("apple");
        laid+=1;
      }
    }
  },
  getCell: function(x, y) {
      var selector = "tr:eq(" + y + ")>td:eq(" + x + ")";
      return $(selector);
  },
  step: function() {
    console.log("****** STEP *******");
    console.log("X: " + snake.headX + ", Y: " + snake.headY);
    console.log("Travelling: " + (snake.dirX ? "X" : "Y") + " at: " + snake.stepSize);
    var destX = (snake.dirX ? snake.headX + snake.stepSize : snake.headX),
        destY = (snake.dirX ? snake.headY : snake.headY + snake.stepSize);
    console.log("Attempting to jump to: X: " + destX + ", Y: " + destY);
    snake.body.push({ y: snake.headY, x: snake.headX });
    if (destX < 0 || destX >= snake.boardSize ||
        destY < 0 || destY >= snake.boardSize) {
      snake.forceDir();
    } else {
      snake.headX = destX;
      snake.headY = destY;
    }

    $("td").removeClass("head");
    $("td").removeClass("body");
    $(snake.body).each(function() {
      var selector = "tr:eq(" + this.y + ")>td:eq(" + this.x + ")";
      $(selector).addClass("body");
    });
    var destCell = snake.getCell(snake.headX, snake.headY);
    if(destCell.hasClass("body")) {
      snake.gameOver();
      return;
    } else if (destCell.hasClass("apple")) {
      destCell.removeClass("apple");
      snake.eatApple();
    } else {
      snake.body.shift();
    }
    destCell.addClass("head");
  },
  eatApple: function() {
    console.log("Eating apple!");
    snake.score += 1;
    $("#score").text(snake.score);
    snake.checkWin();
  },
  checkWin: function() {
    if($("td.apple").length === 0) {
      window.clearInterval(snake.timer);
      $("#status").text("You Win!");
    }
  },
  forceDir: function() {
    // forces the snake to change direction if he hits an edge
    // rotates snake
    console.log("Force direction change!");

    if(snake.dirX) {
      console.log("Switching to Y movement");
      snake.dirX = false;
      snake.stepSize = (snake.headY >= snake.boardSize-1 ? -1 : 1);
      console.log("Switching to: " + snake.stepSize);
      snake.headY += snake.stepSize;
    } else {
      console.log("Switching to X movement");
      snake.dirX = true;
      snake.stepSize = (snake.headX >= snake.boardSize-1 ? -1 : 1);
      console.log("Switching to: " + snake.stepSize);
      snake.headX += snake.stepSize;
    }
  }
};
$(snake.init);


