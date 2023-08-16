<script setup>
import { ref, watch, defineEmits } from "vue";
import { sendWSPush } from "../utils/socket.js";

const emit = defineEmits(["ChangeColor", "sendInstruct"]);
const textWord = ref("");
const inputRef = ref(null);

let textWidth = function (text) {
  text = text.replace(/\s/g, "s");
  const preHTML = document.createElement("div");
  preHTML.innerText = text;
  preHTML.style.position = "absolute";
  preHTML.style.visibility = "hidden";
  preHTML.style.overflow = "hidden";
  preHTML.style.fontSize = "14px";
  preHTML.style.maxWidth = "100%";
  preHTML.style.padding = "0";
  document.querySelector("body").append(preHTML);
  let { width } = preHTML.getBoundingClientRect();
  //   preHTML.remove();
  return width;
};

watch(textWord, (val) => {
  // const width = Math.floor(textWidth(val));
  // inputRef.value.style.width = width > 0 ? `${width}px` : "60px";
});

// 匹配棋盘正则
const matchCode = /^[a-oA-O](([1-9])|(1[0-5]))$/;

// 发送socket信息
function send() {
  if (!textWord.value) return;
  textWord.value = textWord.value.trim();
  const instruct = textWord.value.toUpperCase();
  if (instruct === "S") {
    sendWSPush({ key: "startGame", value: "1" });
    textWord.value = "";
  } else if (instruct === "E") {
    emit("ChangeColor");
    textWord.value = "";
  } else if (matchCode.test(instruct)) {
    const xLine = instruct.match(/[\d]{1,2}/)[0];
    const yLine = instruct.match(/\S/)[0];
    sendWSPush({ key: "playChess", value: [yLine, xLine] });
    textWord.value = "";
  } else {
    emit("sendInstruct", "Unrecognized instructions");
  }
}
</script>

<template>
  <div class="blink">
    <input
      @keypress.enter="send"
      autofocus
      ref="inputRef"
      type="text"
      v-model="textWord"
      placeholder="输入指令"
    />
    <button @click="send" class="btn">Send</button>
  </div>
</template>

<style scoped>
.btn {
  border: none;
  outline: none;
}
.btn:active {
  color: var(--notify-color);
}
.blink {
  padding-left: 16px;
  /* width: 8px;
  height: 4px;
  background: #f3f3f3; */
}
.blink input {
  animation: none;
  font-size: 14px;
  width: 60px;
  max-width: 100%;
  background: transparent;
  border: none;
  color: var(--normal-color);
  outline: none;
  box-sizing: border-box;
  padding: 0;
}

.blink:after {
  /* content: ""; */
  display: inline-block;
  width: 8px;
  height: 4px;
  background: #f3f3f3;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.animate__fadeIn {
  /* -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite; */
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
