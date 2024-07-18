const config = require("./destinations.json");
const fs = require('fs')

class TrieNode {
    constructor() {
        this.end = false;
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
}


var label_uid;
fs.readFile('label_uid.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    label_uid = JSON.parse(data);
    console.log(label_uid);
  });

