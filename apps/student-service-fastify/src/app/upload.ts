import multer from 'fastify-multer'

// process.env.ROOT_PATH =__dirname;
// const ROOT_PATH = process.env.ROOT_PATH 

const ROOT_PATH = __dirname;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, ROOT_PATH);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  console.log('dir', __dirname)

  const upload = multer({
    storage,
  }).single("file");

  export default  upload 