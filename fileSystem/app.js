const fs = require("fs/promises");

(async () => {
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const COPY_FILE = "copy a file";
  const RENAME_FILE = "rename the file";
  const ADD_FILE = "add to the file";

  const createFile = async (path) => {
    try {
      // we want to check whether or not we already have that file
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();

      // we already have that file...
      return console.log(`The file ${path} already exists.`);
    } catch (e) {
      // we don't have the file, now we should create it
      const newFileHandle = await fs.open(path, "w");
      console.log("A new file was successfully created.");
      newFileHandle.close();
    }
  };
  const deleteFile = async (path) => {
    console.log(`deleting file ${path}`);
    
  };
  const renameFile=(oldPath, newPath)=>{
    console.log(`renaming file from ${oldPath} to ${newPath}`)
  }
  const copyFile = (oldpath, newPath)=>{
    console.log(`copying file from ${oldpath} to ${newPath}`)
  }
  const addToFile=(path, content)=>{
console.log(`adding ${content} to file:${path}`)
  }

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
    if (command.includes(DELETE_FILE)) {
      const path = command.substring(DELETE_FILE.length + 1);
      deleteFile(path);
    }
    if (command.includes(COPY_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldPath = command.substring(COPY_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);
      copyFile(oldPath, newPath)
    }
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);
      renameFile(oldPath, newPath)
    }
    if (command.includes(ADD_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_FILE.length + 1, _idx);
      const content = command.substring(_idx + " this content: ".length);
      addToFile(filePath, content)
    }
  });
  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
