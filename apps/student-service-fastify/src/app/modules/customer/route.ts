import { FastifyInstance } from 'fastify';
// import  uploadFileMiddleware  from '../../util';
import upload from "../../upload"
// const upload = multer({ dest: 'uploads/' })

import {
  getCustmoer,
  deleteCustmoer,
  postCustmoer,
  updateCustmoer,
  getOneCustmoer,
  uploadfileCustmoer
} from './controller';

async function customerRoutes(server: FastifyInstance) {
  server.get('/', getCustmoer);
  server.get('/:id', getOneCustmoer);
  server.post('/create', postCustmoer);
  server.delete('/delete/:id', deleteCustmoer);
  server.put('/update/:id', updateCustmoer);
  server.post('/upload',{preHandler:upload},uploadfileCustmoer)
  // server.post('/upload',{ preHandler: upload.single('file') },uploadfileCustmoer)
  
}

export default customerRoutes;
