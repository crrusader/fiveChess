<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import Chess from "./components/Chess.vue";
import CodeHtml from "./components/Code.vue";
import InputTag from "./components/Input.vue";

import { ref } from "vue";
const chessRef = ref(null);
</script>

<template>
  <HelloWorld msg="....." />
  <!-- 指令输入处 -->
  <InputTag @ChangeColor="chessRef.ChangeColor()" />
  <!-- 棋盘 -->
  <Chess ref="chessRef" />
  <!-- 代码code -->
  <CodeHtml />

  <!-- <button>start</button> -->
</template>


<style scoped>
</style>
