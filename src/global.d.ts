interface Category {
	id: number;
	name: string;
	slug: string;
	thumb: string;
	description: string;
}

interface Meal {
	id: number;
	name: string;
	slug: string;
	thumb: string;
}

interface Recipe {
	id: number;
	name: string;
	slug: string;
	category: string;
	instructions: string;
	thumb: string;
	ingredients: string[];
	source: string;
}

interface State {
	categories: Category[];
	categoriesByMeal: any|null,
	recipes: any|null,
}

interface Store {
	state: State;
	setCategories: (categories: Category[]) => void;
	addCategory: (slug: string, meals: Meal[]) => void;
	addRecipe: (id: string|number, recipe: Recipe) => void;
}
