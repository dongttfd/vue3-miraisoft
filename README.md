# FOLDER TREE WITH VUEJS (Vue3)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
### Testing
Replace data from `src/data.json`

*NOTE*:
- **Search feature**: I search like with all lower case, eg: keyword=DOC, i convert all result and keyword to lower case and get folders from data if match: `DOM, DOm, Dom, dom, dOM, dOm` 
- **Folder tree**: I build folder tree that can contain both files and subfolders, so the total number of files here will include total both files in the current folder and total files in subfolders. **That is feature, is not bug** 
- **Other test**: Your sample data from excel had changed, Change `src/data.json` if you want test other cases.
