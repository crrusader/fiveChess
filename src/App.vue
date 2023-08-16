<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Chess from "./components/Chess.vue";
import CodeHtml from "./components/Code.vue";
import InputTag from "./components/Input.vue";

import { ref } from "vue";
const chessRef = ref(null);
function ChangeColor() {
  chessRef.value.ChangeColor();
}
function sendInstruct(e) {
  chessRef.value.sendInstruct(e);
}
</script>

<template>
  <HelloWorld msg="....." />
  <!-- 指令输入处 -->
  <InputTag @ChangeColor="ChangeColor" @sendInstruct="sendInstruct" />
  <!-- 棋盘 -->
  <Chess ref="chessRef" />
  <!-- 代码code -->
  <CodeHtml />

  <!-- <button>start</button> -->
</template>


<style scoped>
</style>
