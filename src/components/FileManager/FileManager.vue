<template>
  <div class="wrapper">
    <div class="sidebar">
      <FolderTree :folders="folders" :members="members" @folderSelected="folderSelected = $event"
        @memberSelected="filterByMembers" @searchText="filterByText" />
    </div>
    <div class="main">
      <FileList :folder="folderSelected" />
    </div>
  </div>
</template>
<script>
import { isFile, hasChildren, cloneDeep } from '@/utils/helper';
import data from '@/data.json';
import FolderTree from './FolderTree/FolderTree.vue';
import FileList from './FileList/FileList.vue';

export default {
  components: {
    FileList,
    FolderTree,
  },
  data() {
    return {
      members: [],
      folders: [],
      folderSelected: null,
    };
  },
  mounted() {
    this.initFolder();
    this.members = this.getAllMembers(data);
  },
  methods: {
    initFolder() {
      this.folders = data;
      this.openFirstFolder(this.folders);
      this.folderSelected = this.findActiveFolder(this.folders);
    },
    openFirstFolder(folders) {
      const nodeHasChild = folders.find((node) => hasChildren(node));
      if (nodeHasChild) {
        if (!nodeHasChild.children.every((node) => isFile(node))) {
          nodeHasChild.isOpen = true;
          this.openFirstFolder(nodeHasChild.children);
        } else {
          nodeHasChild.isActive = true;
        }
      }
    },

    findActiveFolder(folders) {
      const nodeIsActive = folders.find((node) => node?.isActive);
      if (nodeIsActive) {
        return nodeIsActive;
      }

      for (const node of folders) {
        if (!hasChildren(node)) {
          continue;
        }

        const nodeActive = this.findActiveFolder(node.children);
        if (nodeActive) {
          return nodeActive;
        }
      }
    },

    filterByText(text) {
      if (!text.length) {
        return (this.folders = data);
      }

      this.folders = this.searchFolderByText(
        cloneDeep(data),
        text.toLowerCase(),
      );
      this.folderSelected = this.findActiveFolder(this.folders);
    },
    searchFolderByText(folders, text) {
      return folders.filter((node) => {
        // by name
        const passText =
          node.name.toLowerCase().includes(text) ||
          // by image information: `photo_by`, `type`
          (isFile(node) &&
            (node.type.toLowerCase().includes(text) ||
              node.photo_by.toLowerCase().includes(text)));

        if (passText) {
          return true;
        }

        if (hasChildren(node)) {
          // by child
          node.children = this.searchFolderByText(node.children, text);

          return node.children.length;
        }

        return false;
      });
    },

    filterByMembers(members) {
      if (!members.length) {
        return (this.folders = data);
      }

      this.folders = this.searchFolderWithMembers(
        cloneDeep(data),
        Array.from(members),
      );
      this.folderSelected = this.findActiveFolder(this.folders);
    },
    searchFolderWithMembers(folders, members) {
      return folders.filter((node) => {
        if (isFile(node)) {
          return members.includes(node.photo_by);
        }

        if (hasChildren(node)) {
          node.children = this.searchFolderWithMembers(node.children, members);
          return node.children.length > 0;
        }
      });
    },

    getAllMembers(folders, initialMembers = []) {
      return folders.reduce((members, folder) => {
        if (folder?.photo_by && !members.includes(folder.photo_by)) {
          members.push(folder.photo_by);
          return members;
        }

        return folder.children && folder.children.length
          ? this.getAllMembers(folder.children, members)
          : members;
      }, initialMembers);
    },
  },
};
</script>
<style>
.wrapper {
  display: flex;
  position: relative;
  top: 0;
  min-height: 100vh;
}
.sidebar {
  width: 25%;
  min-width: 250px;
  max-width: 350px;
  background-color: #fefefe;
  border-right: 1px solid #e6e7e9;
  padding: 10px;
  max-height: calc(100vh - 20px);
  overflow: auto;
}
.sidebar::-webkit-scrollbar-thumb {
  background: #c1cad4;
  border-radius: 5px;
}
.sidebar::-webkit-scrollbar {
  width: 5px;
}
.main {
  flex: 1;
  padding: 30px;
  max-height: calc(100vh - 60px);
  overflow: auto;
}
.dividers-solid {
  margin: 30px 0;
  border: none;
  border-top: 1px solid #cbd0d3;
}
.highlight-color {
  color: #111523;
}
</style>
