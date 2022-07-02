import fs from 'fs';
import { parse } from 'csv-parse';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
    file: Express.Multer.File;
}

interface IImportCategory {
    name: string,
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }

    loadCategories({ file }: IRequest): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
            const parseFile = parse();

            stream.pipe(parseFile)

            parseFile.on('data', async (line) => {
                const [name, description] = line;
                categories.push({
                    name
                    , description
                });
            }).on('end', () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on('error', (err) => {
                reject(err);
            })
        });
    }

    async execute({ file }: IRequest): Promise<void> {
        const categories = await this.loadCategories({ file });

        categories.map(async (category) => {
            const { name, description } = category;

            const AlreadyExistsCategory = this.categoriesRepository.findByName(name);

            if (!AlreadyExistsCategory) {
                this.categoriesRepository.create({ name, description });
            }
        })
    }

}

export { ImportCategoryUseCase };