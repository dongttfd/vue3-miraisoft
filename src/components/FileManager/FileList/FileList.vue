<template>
  <table class="file-list">
    <thead>
      <tr>
        <th class="checkbox-column"><input type="checkbox" v-model="isSelectAllFile" @change="selectAllFile()"></th>
        <th class="image-column">Select all</th>
        <th class="name-column">Name</th>
        <th>Dimension</th>
        <th>Size</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="file in files" :key="file.name">
        <td><input type="checkbox" v-model="fileSelectees" :value="file.id" @change="checkAllFile"></td>
        <td class="td-image">
          <img :src="file.url" />
        </td>
        <td class="image-name">
          <a target="_blank" :href="file.url">
            {{ file.name }}
          </a>
        </td>
        <td>
          {{ file.dimmension }}
        </td>
        <td>
          {{ toKilobyte(file.size) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { formatNumber, isFile, hasChildren, arraySame } from '@/utils/helper';

export default {
  props: {
    folder: Object,
  },
  data() {
    return {
      fileSelectees: [],
      isSelectAllFile: false,
    };
  },
  computed: {
    files: {
      get() {
        return this.getFileFromFolder(this.folder ?? null);
      },
    },
  },

  methods: {
    isFile,
    hasChildren,
    getFileFromFolder(folder) {
      if (!this.hasChildren(folder)) {
        return [];
      }

      return folder.children.filter((node) => this.isFile(node));
    },

    toKilobyte(size) {
      return formatNumber(Number(size) / 1024);
    },

    selectAllFile() {
      this.fileSelectees = this.isSelectAllFile
        ? this.files.map((file) => file.id)
        : [];
    },

    checkAllFile() {
      this.isSelectAllFile = arraySame(
        Array.from(this.fileSelectees),
        this.files.map((file) => file.id),
      );
    },
  },
};
</script>

<style scoped>
.file-list {
  width: 100%;
  border-collapse: collapse;
}
.file-list th {
  padding: 10px;
  text-align: left;
  color: #817d92;
  font-weight: 400;
}
.file-list th.checkbox-column {
  width: 15px;
}
.file-list th.image-column {
  width: 33%;
}

.file-list td {
  padding: 10px;
  color: #0e1234;
  font-weight: 500;
}
.file-list td.td-image {
  height: 100px;
}
.file-list td.image-name > a {
  color: inherit;
  text-decoration: none;
}
.file-list td img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.file-list tbody tr:hover {
  background: #f9fafc;
}
.file-list tbody tr:hover td.image-name > a {
  text-decoration: underline;
}
</style>
