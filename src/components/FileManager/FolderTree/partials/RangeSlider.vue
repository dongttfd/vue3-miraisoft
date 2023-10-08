<template>
  <div class="ranger-slider">
    <div class="ranger-value" :style="{ width: value + '%' }"></div>
    <div class="ranger-base"></div>
  </div>
</template>
<script>
export default {
  props: {
    value: Number,
  },
};
</script>

<style>
.ranger-slider {
  width: 100%;
  height: 8px;
  position: relative;
}

.ranger-value,
.ranger-base {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 5px;
}

.ranger-value {
  z-index: 2;
  background: #3D71F0;
}

.ranger-base {
  width: 100%;
  z-index: 1;
  background: #ebecee;
}
</style>
