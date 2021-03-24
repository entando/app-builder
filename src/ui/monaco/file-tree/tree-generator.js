import TreeNode from './tree-node';


/**
 * Generate the directory tree objects based on the passed directory file entries
 *
 * @param {Array<String>} [entries=[]]
 * @param {String} [root="Root"]
 * @returns {}
 */
// eslint-disable-next-line import/prefer-default-export
export function generateDirectoryTree(entries = [], root = 'root') {
  // first sort the entries alphabetically
  entries.sort((a, b) => {
    // eslint-disable-next-line no-param-reassign
    a = a.toLowerCase(); // ignore upper and lowercase
    // eslint-disable-next-line no-param-reassign
    b = b.toLowerCase(); // ignore upper and lowercase

    if (a < b) return -1;

    if (a > b) return 1;

    return 0;
  });


  let currentKey = 1;

  const rootNode = new TreeNode(`${currentKey}`, root, true, null);


  // create the folders
  entries.forEach((pathStr) => {
    const pathArr = pathStr.split('/');

    const pathLen = pathArr.length;

    let current = rootNode;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < pathLen; i++) {
      const name = pathArr[i];

      const index = i;

      // If the child node doesn't exist, create it
      let child = current.children.find(el => el.name === name);

      if (child === undefined && index < (pathLen - 1)) {
        currentKey += 1;
        child = new TreeNode(`${currentKey}`, name, true, current);

        current.children.push(child);
      }

      // make child the current tree node
      current = child;
    }
  });


  // create the files
  entries.forEach((pathStr) => {
    const pathArr = pathStr.split('/');

    const pathLen = pathArr.length;

    let current = rootNode;

    if (pathLen === 1) {
      const name = pathArr[0];

      currentKey += 1;

      const node = new TreeNode(`${currentKey}`, name, false, current);

      current.children.push(node);

      return;
    }


    // Loop through the path to add files
    pathArr.forEach((name, index) => {
      // If the child node doesn't exist, create it
      let child = current.children.find(el => el.name === name);


      if (child === undefined && index === (pathLen - 1)) {
        currentKey += 1;

        child = new TreeNode(`${currentKey}`, name, false, current);

        current.children.push(child);
      } else if (child === undefined) {
        console.log('child is undefined');
      } else {
        // make child the current tree node
        current = child;
      }
    });
  });

  return rootNode;
}

