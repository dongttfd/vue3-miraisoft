<template>
  <div class="search-box">
    <div class="search-title">Search</div>
    <div class="input-append">
      <input placeholder="e.g. image.png" type="text" @input="$emit('searchText', $event.target.value)" />
      <span class="material-symbols-outlined">search</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scope>
.search-title {
  margin-bottom: 10px;
}

.input-append {
  position: relative;
  width: 100%;
  border: 1.5px solid #cbd0d3;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-append input {
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  border: none;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
}

.input-append span {
  position: absolute;
  right: 10px;
  top: 50%;
  color: #cbd0d3;
  transform: translateY(-50%);
  pointer-events: none;
}

.input-append input::placeholder {
  color: #cbd0d3;
}
</style>
