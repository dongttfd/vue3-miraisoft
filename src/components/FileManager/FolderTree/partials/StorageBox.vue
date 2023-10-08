<template>
  <div class="storage-information">
    <BoxTitle :textLeft="'Storage'" :textRight="'Change plan'" />
    <RangeSlider :value="percentage" />
    <div class="storage-total highlight-color">
      <span class="total-text">{{ formatNumber(percentage) }}%</span> used of 2GB
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import BoxTitle from '@/components/FileManager/FolderTree/partials/BoxTitle.vue';
import RangeSlider from './RangeSlider.vue';

export default {
  components: {
    BoxTitle,
    RangeSlider,
  },
  props: {
    totalSize: Number,
  },
  setup(props) {
    return {
      percentage: computed(() => {
        const rate = (props.totalSize / 2097152) * 100;
        return rate > 100 ? 100 : rate;
      }),
    };
  },
  methods: {
    formatNumber(number) {
      return Math.ceil(number);
    },
  },
};
</script>
<style scoped>
.storage-total {
  margin-top: 10px;
  font-weight: 600;
}
.storage-total .total-text {
  color: #3d71f0;
}
</style>
