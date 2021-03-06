import { Router } from 'express'
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { importCategoryController } from '../modules/cars/useCases/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/listCategories/index';

const categoriesRoutes = Router();

const upload = multer({ dest: './tmp' });

categoriesRoutes.post('/', (req, res) => {
   return createCategoryController.handle(req, res);
});

categoriesRoutes.post('/import', upload.single('file'), (req, res) => {
   console.log("oioioi");
   importCategoryController.handle(req, res);
})

categoriesRoutes.get('/', (req, res) => {
   return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
