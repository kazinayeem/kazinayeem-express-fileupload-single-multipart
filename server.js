const express = require("express");
const path = require("path");
const app = express();
const expressfile = require("express-fileupload");

app.use(express.json());
app.use(express.static(__dirname + "/images"));
app.use(express.urlencoded({ extended: true }));
//app.use()
app.use(
  expressfile({
    createParentPath: true,
  })
);

app.post("/", (req, res) => {
  try {
    const file = req.files.image;
    const name = file.name;
    const reg = name.replace("replace");
    console.log(reg);
    return;
    file.mv(`./image/${file.name}`);

    res.send(file);
  } catch (error) {
    res.send(error);
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  
});

app.post("/photo", async (req, res) => {
  try {
    //filenupload
    const file = req.files.photo;
    let data = [];

    const type = typeof file.data;

    if (type === "object") {
      //single file upload

      const file = req.files.photo;
      const base64 = file.data.toString("base64");
      const extpath = path.extname(file.name);
      const filename =
        file.name.replace(extpath, "").toLowerCase().split(" ").join("-") +
        "_" +
        Date.now();

      data.push(filename + extpath);
      file.mv(`${__dirname}/images/${filename + extpath}`);
      const body = { ...req.body, data };
      res.send(body);
    } else {
      for (let i = 0; i < req.files.photo.length; i++) {
        const extpath = path.extname(file[i].name);
        const filename =
          file[i].name.replace(extpath, "").toLowerCase().split(" ").join("-") +
          "_" +
          Date.now();

        const orginalname = filename + extpath;
        data.push(orginalname);

        file[i].mv(`${__dirname}/images/${filename + extpath}`);
      }

      const body = { ...req.body, data };

      res.send(body);
    }
  } catch (error) {
    console.log("error file upload!!");
  }
});
app.listen(2222, () => {
  console.log("listening on port 22");
});

// single file upload
//single file upload

// const file = req.files.photo;
// const base64 = file.data.toString("base64");
// const extpath = path.extname(file.name);
// const filename =
//   file.name.replace(extpath, "").toLowerCase().split(" ").join("-") +
//   "_" +
//   Date.now();

// file.mv(`${__dirname}/images/${filename + extpath}`);
// res.send(file.name);
