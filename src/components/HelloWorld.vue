<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(6);
</script>

<template>
  <div class="cmd-board">
    <p>{{ `D:\\WorkSpace\\plantmate-srm>npm run serve` }}</p>
    <p class="lh0 mt10">
      {{ `> plantmate-srm@5.0.0 serve D:\\WorkSpace\\plantmate-srm` }}
    </p>
    <p class="lh0">{{ `> cross-env --max_old_space_size=4096 vite` }}</p>
    <p class="txindent mt2lines">
      <span class="main">{{ `  vite v2.5.3 ` }}</span>
      <span class="notify">{{ `server running at:` }}</span>
    </p>
    <p class="lh0 txindent mt10">{{ `  > Local: http://localhost:3000/` }}</p>
    <p class="lh0 txindent">{{ `  > Network: use \`--host\` to expose` }}</p>
    <p class="main txindent mt10">{{ `  ready in 8359ms.` }}</p>

    <!-- <p class="blink mt2lines animate__fadeIn"></p> -->
  </div>
</template>

<style scoped>
.cmd-board {
  text-align: left;
  font-size: 16px;
  font-family: serif;
  user-select: none;
}

.cmd-board p {
  margin: 0;
}
.lh0 {
  line-height: 16px;
}

.cmd-board .mt10 {
  margin-top: 10px;
}

.cmd-board .mt2lines {
  margin-top: 28px;
}

.txindent {
  text-indent: 16px;
}

.blink {
  width: 8px;
  height: 4px;
  background: #f3f3f3;
}

.animate__fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
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
