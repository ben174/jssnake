/*jslint browser: true */
/*global $:false, console:false */


"use strict";
var snake = {
  boardSize: 20,
  board: [],
  dirX: true,
  stepSize: 1,
  headX: 10,
  headY: 10,
  body: [],
  gameSpeed: 500,
  init: function() {
    snake.createBoard();
    snake.drawBoard();
    window.setInterval(snake.step, snake.gameSpeed);
  },
  createBoard: function() {
    snake.board = new Array(snake.boardSize);
    $(snake.board).each(function(i, item) {
      snake.board[i] = new Array(snake.boardSize);
    });
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
  step: function() {
    console.log("X: " + snake.headX + ", Y: " + snake.headY);
    console.log("Travelling: " + (snake.dirX ? "X" : "Y") + " at: " + snake.stepSize);
    var destX = (snake.dirX ? snake.headX + snake.stepSize : snake.headX),
        destY = (snake.dirX ? snake.headY : snake.headY + snake.stepSize);
    console.log("Attempting to jump to: X: " + destX + ", Y: " + destY); 
    if (destX < 0 || destX >= snake.boardSize ||
        destY < 0 || destY >= snake.boardSize) {
      snake.forceDir();
    } else {
      snake.headX = destX;
      snake.headY = destY;
    }


    //TODO: check for self collision

    //TODO: check for apple

    $("td").removeClass("sbody");
    var selector = "tr:eq(" + snake.headY + ")>td:eq(" + snake.headX + ")";
    $(selector).addClass("sbody");
  },
  forceDir: function() {
    // forces the snake to change direction if he hits an edge
    // rotates snake
    console.log("Force direction change!");

    if(snake.dirX) {
      console.log("Switching to Y movement");
      snake.dirX = false;
      snake.stepSize = (snake.headY >= snake.boardSize ? -1 : 1);
      console.log("Switching to: " + snake.stepSize);
      snake.headY += snake.stepSize;
    } else {
      console.log("Switching to X movement");
      snake.dirX = true;
      snake.stepSize = (snake.headX >= snake.boardSize ? -1 : 1);
      console.log("Switching to: " + snake.stepSize);
      snake.headX += snake.stepSize;
    }
  }
};


$(snake.init);


