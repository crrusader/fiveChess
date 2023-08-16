<script setup>
import { onMounted, ref, defineExpose } from "vue";
import { createSocket, sendWSPush } from "../utils/socket.js";

const chessRef = ref(null);
const tipRef = ref(null);

let chessBoard = ref([]); // 棋盘
let context = ref(null); // canvas
let blackWin = ref([]); // 黑子赢法的统计数组
let whiteWin = ref([]); // 白子赢法的统计数组

let wins = ref([]); // 所有赢法的统计
let count = ref(0); // 所有赢法的数量

let whoReturn = ref(1); // 1.黑子走 2.白子走
let over = ref(false); // 游戏是否结束

let defineClass = ref(""); // 棋盘样式class

// 下棋
const downChess = (e) => {
  if (over.value) {
    // 已结束
    return;
  }
  // 判断点击下棋还是输入下棋
  let x = e.offsetX;
  let y = e.offsetY;
  let i = Math.floor(x / 20);
  let j = Math.floor(y / 20);
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
      }
    }
    if (!over.value) {
      whoReturn.value = whoReturn.value === 1 ? 2 : 1;
    }
  }
};

// 画棋子
const oneStep = function (i, j, me) {
  let chessWidth = 6;
  context.value.beginPath();
  // context.value.rect(
  //   10 + i * 20 - chessWidth,
  //   10 + j * 20 - chessWidth,
  //   2 * chessWidth,
  //   2 * chessWidth
  // ); // 画方
  context.value.arc(10 + i * 20, 10 + j * 20, chessWidth, 0, 2 * Math.PI); // 画圆
  context.value.closePath();
  //渐变
  var gradient = context.value.createRadialGradient(
    10 + i * 20 + 2,
    10 + j * 20 - 2,
    chessWidth,
    10 + i * 20 + 2,
    10 + j * 20 - 2,
    0
  );
  // 判断黑白棋
  // if (me === 1) {
  //   gradient.addColorStop(0, "#0a0a0a");
  //   gradient.addColorStop(1, "#636766");
  // } else {
  //   gradient.addColorStop(0, "#d1d1d1");
  //   gradient.addColorStop(1, "#f9f9f9");
  // }
  // if (me === 1) {
  //   gradient.addColorStop(0, "#13a10e");
  //   gradient.addColorStop(1, "#0c0c0c");
  // } else {
  //   gradient.addColorStop(0, "#767676");
  //   gradient.addColorStop(1, "#61d6d6");
  // }
  if (me === 1) {
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(1, "#636766");
  } else {
    gradient.addColorStop(0, "#767676");
    gradient.addColorStop(1, "#61d6d6");
  }
  context.value.fillStyle = gradient;
  context.value.fill();
};

// TODO:
// 修改棋子颜色 换肤
let num = 0;
const ChangeColor = () => {
  let randomClass = ["primary", "notify", "main", "normal", "ignore", ""];
  defineClass.value = randomClass[num];
  num++;
  if (num >= randomClass.length) {
    num = 0;
  }
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

// 回显指令
const sendInstruct = (msg = "") => {
  tipRef.value.innerHTML = msg;
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
  context.value.lineWidth = 1; //边框颜色
  for (let i = 0; i < 15; i++) {
    context.value.moveTo(10 + i * 20, 10);
    context.value.lineTo(10 + i * 20, 290);
    context.value.stroke();
    context.value.moveTo(10, 10 + i * 20);
    context.value.lineTo(290, 10 + i * 20);
    context.value.stroke();
  }
  createSocket("ws://10.10.56.85:4000");
  window.addEventListener("onmessageWS", function (e) {
    tipRef.value.innerHTML = e.detail;
  });

  window.addEventListener("ongameMapWs", function (e) {
    chessRef.value.innerHTML = e.detail;
  });
});

defineExpose({
  ChangeColor,
  sendInstruct,
});
</script>

<template>
  <marquee class="tips" ref="tipRef"></marquee>
  <canvas id="chess" width="300" height="300" @click="downChess"></canvas>
  <div style="position: relative; padding-top: 10px" :class="defineClass">
    <pre ref="chessRef" class="chess"></pre>
    <pre class="line">
      <div v-for="(item) in 15">{{item}}</div>
    </pre>
  </div>
</template>

<style scoped>
canvas {
  /* display: inline; */
  /* margin: 50px auto; */
  cursor: pointer;
  float: left;
  position: relative;
  z-index: 1;
  visibility: hidden;
  pointer-events: none;
  width: 0;
  height: 0;
}
.tips {
  color: var(--notify-color);
  font-family: serif;
  width: 241px;
}
.chess {
  position: relative;
  z-index: 1;
  float: left;
  line-height: 10px;
  letter-spacing: 2px;
}

/* .chess:after {
  content: "123456789101112131415";
  position: absolute;
  top: 0;
  left: 10px;
} */
.chess:before {
  content: "ABCDEFGHIJKLMNO";
  position: absolute;
  top: 10px;
  left: 0px;
  width: 0;
}

.line {
  position: absolute;
  left: 10px;
  top: 0;
  padding: 0;
  display: flex;
  z-index: 1;
  background: transparent;
  letter-spacing: 1.8px;
}
.line > div {
  line-height: 10.3px;
}
.line > div:nth-child(n + 10) {
  writing-mode: tb;
  line-height: 10.3px;
}

.primary .chess {
  color: var(--primary-color);
}
.primary .line {
  color: var(--primary-color);
}
.notify .chess {
  color: var(--notify-color);
}
.notify .line {
  color: var(--notify-color);
}
.main .chess {
  color: var(--main-color);
}
.main .line {
  color: var(--main-color);
}
.normal .chess {
  color: var(--normal-color);
}
.normal .line {
  color: var(--normal-color);
}
.ignore .chess {
  color: var(--ignore-color);
}
.ignore .line {
  color: var(--ignore-color);
}
</style>
