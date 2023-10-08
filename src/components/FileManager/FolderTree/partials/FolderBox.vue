<template>
  <div class="folder-box">
    <BoxTitle :textLeft="'Folders'" :textRight="'New folder'" />
    <div class="folder-render">
      <FolderRender ref="folderRender" :folders="folders" @deactivateAllFolder="deactivateAllFolder"
        @folderSelected="$emit('folderSelected', $event)" />
    </div>
  </div>
</template>

<script>
import { isFile, hasChildren } from '@/utils/helper';
import BoxTitle from '@/components/FileManager/FolderTree/partials/BoxTitle.vue';
import FolderRender from './FolderRender.vue';
export default {
  props: {
    folders: Array,
  },
  components: {
    BoxTitle,
    FolderRender,
  },
  methods: {
    isFile,
    hasChildren,
    deactivateAllFolder() {
      this.deactivate(this.folders);
    },

    deactivate(folders) {
      folders.forEach((node) => {
        if (!this.isFile(node)) {
          node.isActive = false;
        }

        if (this.hasChildren(node)) {
          this.deactivate(node.children);
        }
      });
    },
  },
};
</script>

<style scope>
.folder-box {
  color: #111523;
}

.folder-render > ul {
  list-style: none;
  list-style-type: none;
  margin-block: 0;
  padding-inline-start: 0;
  font-weight: 500;
}

.folder-render {
  max-width: 100%;
  overflow: auto;
}
.folder-render::-webkit-scrollbar-thumb {
  background: #c1cad4;
  border-radius: 5px;
}
.folder-render::-webkit-scrollbar {
  height: 5px;
}
</style>
