<template>
  <div class="box-title">
    <span class="left-text">{{ textLeft }}</span>
    <a class="right-text" href="#">{{ textRight }}</a>
  </div>
</template>

<script>
export default {
  props: {
    textLeft: String,
    textRight: String
  }
};
</script>

<style>
.box-title {
  color: #929199;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-title > a {
  color: inherit;
}
.left-text {
  margin-right: auto;
}
.right-text {
  margin-left: auto;
}
</style>
