<script setup>
import { ref, watch } from "vue";

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
  const width = Math.floor(textWidth(val));
  inputRef.value.style.width = width > 0 ? `${width}px` : "60px";
});

function enterKey(val) {
  if (["e", "E"].includes(textWord)) {
    emit("ChangeColor");
  }
}
</script>

<template>
  <div class="blink">
    <input
      @keypress.enter="enterKey"
      autofocus
      ref="inputRef"
      type="text"
      v-model="textWord"
      placeholder="输入指令"
    />
  </div>
</template>

<style scoped>
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
