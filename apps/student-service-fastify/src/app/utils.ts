import * as util from "util";
import * as multer from "multer";
import * as path from "path";

const maxSize = 50 * 1024 * 1024;
const publicPath = process.env.PUBLIC_PATH || "./public/images";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, publicPath);
  },
  filename: (req, file, cb) => {
    const ext = MIME_TYPE_MAP[file.mimetype];
    const filename = Date.now() + "." + ext;
    cb(null, filename);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const filetypes = /jpeg|jpg|pdf|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Allow images only of extensions jpeg|jpg|png !");
  }
};

const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter,
}).single("file");

const uploadFileMiddleware = util.promisify(uploadFile);

export default uploadFileMiddleware;
