<script setup>
import { onMounted, ref } from "vue";

let chessBoard = ref([]); // 棋盘
let context = ref(null); // canvas
let blackWin = ref([]); // 黑子赢法的统计数组
let whiteWin = ref([]); // 白子赢法的统计数组

let wins = ref([]); // 所有赢法的统计
let count = ref(0); // 所有赢法的数量

let whoReturn = ref(1); // 1.黑子走 2.白子走
let over = ref(false); // 游戏是否结束

// 下棋
const downChess = (e) => {
  if (over.value) {
    // 已结束
    return;
  }
  // 判断点击下棋还是输入下棋
  let x = e.offsetX;
  let y = e.offsetY;
  let i = Math.floor(x / 30);
  let j = Math.floor(y / 30);
  if (chessBoard.value[i][j] == 0) {
    oneStep(i, j, whoReturn.value);
    chessBoard.value[i][j] = whoReturn.value; // 已占位置

    for (let k = 0; k < count.value; k++) {
      // 将可能赢的情况都加1
      if (wins.value[i][j][k]) {
        // 黑子处理
        if (whoReturn.value === 1) {
          blackWin.value[k]++;
          whiteWin.value[k] = 6; //这个位置对方不可能赢了
        }
        // 白子处理
        if (whoReturn.value === 2) {
          whiteWin.value[k]++;
          blackWin.value[k] = 6; //这个位置对方不可能赢了
        }
        if (blackWin.value[k] === 5) {
          window.alert("黑子赢了");
          over.value = true;
        }
        if (whiteWin.value[k] === 5) {
          window.alert("白子赢了");
          over.value = true;
        }
        console.log(whoReturn.value, blackWin.value, whiteWin.value);
      }
    }
    if (!over.value) {
      whoReturn.value = whoReturn.value === 1 ? 2 : 1;
    }
  }
};

// 画棋子
const oneStep = function (i, j, me) {
  let chessWidth = 7;
  context.value.beginPath();
  context.value.arc(15 + i * 30, 15 + j * 30, chessWidth, 0, 2 * Math.PI); // 画圆
  context.value.closePath();
  //渐变
  var gradient = context.value.createRadialGradient(
    15 + i * 30 + 2,
    15 + j * 30 - 2,
    chessWidth,
    15 + i * 30 + 2,
    15 + j * 30 - 2,
    0
  );
  // 判断黑白棋
  if (me === 1) {
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(1, "#636766");
  } else {
    gradient.addColorStop(0, "#d1d1d1");
    gradient.addColorStop(1, "#f9f9f9");
  }
  context.value.fillStyle = gradient;
  context.value.fill();
};

// 初始化赢法数组
const init = () => {
  blackWin.value = [];
  whiteWin.value = [];
  wins.value = [];
  count.value = 0;
  //赢法数组
  for (var i = 0; i < 15; i++) {
    wins.value[i] = [];
    for (var j = 0; j < 15; j++) {
      wins.value[i][j] = [];
    }
  }
  //横线赢法
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
      for (var k = 0; k < 5; k++) {
        wins.value[i][j + k][count.value] = true;
      }
      count.value++;
    }
  }
  //竖线赢法
  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 11; j++) {
      for (var k = 0; k < 5; k++) {
        wins.value[j + k][i][count.value] = true;
      }
      count.value++;
    }
  }
  //正斜线赢法
  for (var i = 0; i < 11; i++) {
    for (var j = 0; j < 11; j++) {
      for (var k = 0; k < 5; k++) {
        wins.value[i + k][j + k][count.value] = true;
      }
      count.value++;
    }
  }
  //反斜线赢法
  for (var i = 0; i < 11; i++) {
    for (var j = 14; j > 3; j--) {
      for (var k = 0; k < 5; k++) {
        wins.value[i + k][j - k][count.value] = true;
      }
      count.value++;
    }
  }
  // 初始化黑白棋赢法汇总
  for (var i = 0; i < count.value; i++) {
    blackWin.value[i] = 0;
    whiteWin.value[i] = 0;
  }
};

// 初始化棋盘
const initBoard = (memoryBoard = []) => {
  chessBoard.value = memoryBoard || [];
  for (let i = 0; i < 15; i++) {
    chessBoard.value[i] = [];
    for (let j = 0; j < 15; j++) {
      chessBoard.value[i][j] = 0;
    }
  }
};

// 初始化基础数据
init();
// 初始化棋盘
initBoard();

onMounted(() => {
  // 初始化棋盘
  let chess = document.getElementById("chess");
  context.value = chess.getContext("2d");
  context.value.strokeStyle = "#767676"; //边框颜色
  for (let i = 0; i < 15; i++) {
    context.value.moveTo(15 + i * 30, 15);
    context.value.lineTo(15 + i * 30, 435);
    context.value.stroke();
    context.value.moveTo(15, 15 + i * 30);
    context.value.lineTo(435, 15 + i * 30);
    context.value.stroke();
  }
});
</script>

<template>
  <canvas id="chess" width="450" height="450" @click="downChess"></canvas>
</template>

<style scoped>
canvas {
  display: block;
  margin: 50px auto;
  cursor: pointer;
}
</style>
