<template>
  <div class="member-selector">
    <BoxTitle :textLeft="'Members'" :textRight="'Select all'" />
    <div class="member-list">
      <div class="input-group">
        <input type="checkbox" id="all-input" v-model="isSelectAll" @change="selectAllMember()" />
        <label for="all-input">All</label>
      </div>
      <div v-for="member in members" class="input-group" :key="member">
        <input type="checkbox" v-model="memberSelectees" :id="`${member}-input`" :value="member"
          @change="$emit('memberSelected', memberSelectees); checkAllMember()" />
        <label :for="`${member}-input`">{{ member }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { arraySame } from '@/utils/helper';
import BoxTitle from '@/components/FileManager/FolderTree/partials/BoxTitle.vue';

export default {
  props: {
    members: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    BoxTitle,
  },
  data() {
    return {
      memberSelectees: [],
      isSelectAll: false,
    };
  },
  methods: {
    selectAllMember() {
      this.memberSelectees = this.isSelectAll ? this.members : [];
      this.$emit('memberSelected', this.memberSelectees);
    },

    checkAllMember() {
      this.isSelectAll = arraySame(this.members, this.memberSelectees);
    },
  },
};
</script>

<style>
.input-group {
  margin-bottom: 10px;
  color: #111523;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.input-group input {
  margin-left: 0;
}
.input-group label {
  margin-left: 10px;
}
</style>
