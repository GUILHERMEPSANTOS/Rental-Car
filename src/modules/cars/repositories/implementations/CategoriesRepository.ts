import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository {

    private categories: Category[] = [];

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }

    public static getIntance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }

        return CategoriesRepository.INSTANCE;

    }

    public create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }

    public list(): Category[] {
        return this.categories;
    }

    public findByName(name: string): Category {
        const category = this.categories.find(
            category => category.name === name
        );
        return category;
    }
}

export { CategoriesRepository }