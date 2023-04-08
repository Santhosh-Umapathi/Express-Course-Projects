const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
app.set("view engine", "ejs");
const port = process.env.port || 5000;
//Constants
const { API_ROUTE } = require("./constants");
//Data
const {
  MOCK_FB_DATA,
  MOCK_LN_DATA,
  MOCK_IN_DATA,
  MOCK_COURSE_DATA,
} = require("./data");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
  // cloud_name: processs.env.CLOUD_NAME
  // cloud_name: "dk92l1yoc",
  // api_key: "769888332458168",
  // api_secret: "7Kh-q81hHRdyDNiBxISrouGEFCo",
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res, next) => {
  res.send("API v1");
});

app.get(`${API_ROUTE}/facebook`, (req, res, next) => {
  res.status(200).json(MOCK_FB_DATA);
});

app.get(`${API_ROUTE}/instagram`, (req, res, next) => {
  res.status(200).json(MOCK_IN_DATA);
});

app.get(`${API_ROUTE}/linkedin`, (req, res, next) => {
  res.status(200).json(MOCK_LN_DATA);
});

app.post(`${API_ROUTE}/course`, (req, res, next) => {
  const course = req.body;

  MOCK_COURSE_DATA.push(course);

  res.status(200).json(MOCK_COURSE_DATA);
});

app.get(`${API_ROUTE}/coursequery`, (req, res, next) => {
  const location = req.query.location;
  const device = req.query.device;

  res.status(200).json({ location, device });
});

app.post(`${API_ROUTE}/courseupload`, (req, res, next) => {
  const file = req.files.uploadFile;

  let path = __dirname + "/images/" + Date.now() + ".png"; //current directory name

  file.mv(path, (err) => {
    console.log("🚀 --- file.mv --- err", err);
    res.send(true);
  });
});

app.get(`${API_ROUTE}/form`, (req, res, next) => {
  console.log("request", req.body, req.query);
  res.send(req.query);
});

app.post(`${API_ROUTE}/post`, async (req, res, next) => {
  // case - multiple images
  if (req.files) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      let result = await cloudinary.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        {
          folder: "users",
        }
      );

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }
  // case for single image
  // let file = req.files.samplefile;
  // result = await cloudinary.uploader.upload(file.tempFilePath, {
  //   folder: "users",
  // });

  let details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray,
  };
  console.log(details);

  res.send(details);
});

app.get(`${API_ROUTE}/getform`, (req, res, next) => {
  res.render("getForm");
});

app.get(`${API_ROUTE}/postform`, (req, res, next) => {
  res.render("postForm");
});

app.get(`${API_ROUTE}/:id`, (req, res, next) => {
  const param = req.params.id;
  res.status(200).json(param);
});

app.get(`/*`, (req, res, next) => {
  res.status(400).send("Route not supported");
});

app.listen(port, () => console.log("Listening to port:", port));
