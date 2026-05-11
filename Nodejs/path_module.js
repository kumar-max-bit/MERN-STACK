const p = require("path");

console.log(
  "DirName :",
  p.dirname(
    "C:\\Users\\Ashok Reddy\\Desktop\\Baba MERN CLASSES\\Node Js\\notes.txt",
  ),
);

console.log(
  "Extension :",
  p.extname(
    "C:\\Users\\Ashok Reddy\\Desktop\\Baba MERN CLASSES\\Node Js\\notes.txt",
  ),
);

console.log(
  p.basename(
    "C:\\Users\\Ashok Reddy\\Desktop\\Baba MERN CLASSES\\Node Js\\notes.txt",
  ),
);