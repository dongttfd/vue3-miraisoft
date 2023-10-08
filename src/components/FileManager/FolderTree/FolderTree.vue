<template>
  <div class="folder-tree">
    <div class="tree-header">
      <button>Import documents</button>
    </div>
    <div class="tree-body">
      <StorageBox :totalSize="total || 0" />
      <hr class="dividers-solid" />
      <SearchBox @searchText="$emit('searchText', $event)" />
      <hr class="dividers-solid" />
      <FolderBox :folders="folders" @folderSelected="$emit('folderSelected', $event)" />
      <hr class="dividers-solid" />
      <MemberBox :members="members" @memberSelected="$emit('memberSelected', $event)" />
    </div>
    <ul>
      <li>

      </li>
    </ul>
  </div>
</template>

<script>
import StorageBox from './partials/StorageBox.vue';
import SearchBox from './partials/SearchBox.vue';
import FolderBox from './partials/FolderBox.vue';
import MemberBox from './partials/MemberBox.vue';

export default {
  components: {
    StorageBox,
    SearchBox,
    FolderBox,
    MemberBox,
  },
  props: {
    folders: Array,
    members: Array,
  },
  computed: {
    total: {
      get() {
        return this.calcTotalSize(this.folders || []) / 1024; // KB
      },
    },
  },
  methods: {
    calcTotalSize(folders) {
      return folders.reduce((total, folder) => {
        if (folder?.size) {
          return (total += Number(folder.size));
        }

        return folder?.children && folder.children.length
          ? (total += this.calcTotalSize(folder.children))
          : total;
      }, 0);
    },
  },
};
</script>

<style scoped>
.tree-header,
.tree-body {
  padding: 20px;
}

.tree-header > button {
  width: 100%;
  padding: 10px;
  background: linear-gradient(#467cfd, #326efd, #467cfd);
  border: 0;
  border-radius: 5px;
  color: #fff;
  box-shadow: 0 2px 16px 0 rgb(0 0 0 / 20%), 0 0px 2px 0 rgb(0 0 0 / 19%);
  font-family: inherit;
  font-weight: 500;
  font-size: inherit;
  cursor: pointer;
}

.tree-body {
  color: #929199;
}

.folder-tree ul {
  list-style-type: none;
  padding: 0;
}

.folder-tree li {
  margin: 0;
  padding: 0;
  cursor: pointer;
}
</style>
