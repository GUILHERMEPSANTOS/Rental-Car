import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}


interface ICategoriesRepository {
    create({name, description} : ICreateCategoryDTO): void;
    findByName(name: string): Category;
    list(): Array<Category>;
};

export { ICategoriesRepository,ICreateCategoryDTO };