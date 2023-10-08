<template>
  <ul>
    <template v-for="folder in folders" :key="folder.name">
      <li v-if="!isFile(folder)"
        :class="{ 'open': folder?.isOpen && hasChildrenFolder(folder), 'active': folder?.isActive }">
        <div class="folder-wrapper" @click="chooseFolder(folder)">
          <span class="material-symbols-outlined">folder_open</span>
          <span class="folder-name">{{ folder.name }}</span>
          <span class="badge">{{ this.totalFiles(folder) }}</span>
        </div>
        <template v-if="hasChildren(folder)">
          <FolderRender :folders="folder.children" @deactivateAllFolder="$emit('deactivateAllFolder')"
            @folderSelected="$emit('folderSelected', $event)" />
        </template>
      </li>
    </template>
  </ul>
</template>

<script>
import { isFile, hasChildren } from '@/utils/helper';
import FolderRender from './FolderRender.vue';

export default {
  components: {
    FolderRender,
  },
  props: {
    folders: Array,
  },
  methods: {
    totalFiles(folder) {
      if (this.isFile(folder)) {
        return 1;
      }

      return this.hasChildren(folder)
        ? folder.children.reduce(
            (totalFile, _folder) => (totalFile += this.totalFiles(_folder)),
            0,
          )
        : 0;
    },

    isFile,
    hasChildren,
    hasChildrenFolder(folder) {
      return (
        this.hasChildren(folder) &&
        folder.children.some((node) => !this.isFile(node))
      );
    },

    chooseFolder(folder) {
      this.toggleOpenClose(folder);

      if (!folder.isActive) {
        this.activateFolder(folder);
      }

      this.$emit('folderSelected', folder);
    },
    toggleOpenClose(folder) {
      folder.isOpen = !folder?.isOpen;
    },
    activateFolder(folder) {
      this.$emit('deactivateAllFolder');
      folder.isActive = true;
    },
  },
};
</script>

<style scoped>
ul ul {
  padding-inline-start: 30px;
}
li {
  list-style: none;
  list-style-type: none;
}

.folder-wrapper {
  height: 40px;
  min-width: 200px;
  max-width: 300px;
  padding-left: 10px;
  display: inline-flex;
  align-items: center;
  border: 1px solid #fff;
}
.folder-wrapper:hover {
  cursor: pointer;
  border-color: #2164fd;
}
.folder-wrapper::before {
  content: '\25B6';
  color: #929199;
  margin-right: 10px;
}
.folder-wrapper .material-symbols-outlined {
  margin-right: 10px;
  color: #929199;
}
.folder-wrapper .folder-name {
  margin-right: 5px;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.folder-wrapper .badge {
  margin-left: auto;
  margin-right: 10px;
  padding: 3px 5px;
  font-size: 10px;
  background: #c1c8cc;
  color: #111523;
  font-weight: 600;
  border-radius: 2px;
}

li > ul {
  display: none;
}
li.open > ul {
  display: block;
}
li.open > .folder-wrapper::before {
  transform: rotate(-90deg);
}
li.open > .folder-wrapper .material-symbols-outlined,
li.open > .folder-wrapper::before {
  color: #111523;
}

li.active > .folder-wrapper {
  background: #eaf0fe;
  color: #2164fd;
}
li.active > .folder-wrapper::before,
li.active > .folder-wrapper .material-symbols-outlined {
  color: #2164fd;
}
li.active > .folder-wrapper .badge {
  background: #2164fd;
  color: #fff;
}
</style>
