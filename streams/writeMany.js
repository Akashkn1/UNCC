const fs = require("fs/promises");

(async () => {
  console.time("writeMany");
  const filehandle = await fs.open("./file.txt", "w");
  const stream = filehandle.createWriteStream()
  for (let i = 0; i < 1000000; i++) {
    const buffer = Buffer.from(` ${i} `, 'ascii')
    // await filehandle.write(` ${i} `);
    stream.write(buffer);
  }
  console.timeEnd("writeMany");
})()

// const fs = require("fs");

// (async () => {
//   console.time("writeMany");
//   fs.open("file.txt", "w", (err, fd) => {
//     for (i = 0; i < 1000000; i++) {
//       const buffer = Buffer.from(` ${i} `, 'utf-8')
//       fs.writeSync(fd, buffer);
//     }
//     console.timeEnd('writeMany')
//   });
// })();
