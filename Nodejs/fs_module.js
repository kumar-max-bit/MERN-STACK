const fs = require("fs");

//create file and write data after 2s
setTimeout(() => {
  fs.writeFile("sample.txt", "second time data insertion ", () => {
    console.log("*********File created Successfully after 2s*********");
  });
}, 2000);

//append file execute after 3s
setTimeout(() => {
  fs.appendFile(
    "sample.txt",
    "\n second time data insertion This is sample file creating by node",
    () => {
      console.log("****data appended  Successfully after 3s******");
    },
  );
}, 3000);

//read file execute after 5s
setTimeout(() => {
  fs.readFile("sample.txt", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("**********read starts after 5s***********");
      console.log(data);
    }
  });
}, 5000);

//unlink execute immediately
fs.unlink("sample.txt", (err) => {
  if (err) console.log(err);
  else console.log("Deleted successfully");
});