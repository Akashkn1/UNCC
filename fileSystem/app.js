const fs = require("fs");

(async () => {
  const createFile = (path) => {
    try {
      const existFileHandler = fs.open(path, "r");
      existFileHandler.close();
      console.log(`file ${path} already exist`);
    } catch (e) {
      const newFile = fs.open(path, "w");
      newFile.close();
      console.log(`a new file created`);
    }
  };
  const CREATE_FILE = "create a file";

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    //to get the size
    const size = (await commandFileHandler.stat()).size;
    //allocate buffer
    const buff = Buffer.alloc(size);
    // positon to start filling buffer
    const offset = 0;
    //length of the ontent to read
    const length = buff.byteLength;
    //position to start reading
    const position = 0;
    // to read the file
    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");

    if (command.includes(CREATE_FILE)) {
      const path = command.substring(CREATE_FILE.length + 1);
      createFile(path);
    }
  });
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
