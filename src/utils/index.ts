export const normalizeCategories = (data: any): Category[] => {
	try {
		const { categories } = JSON.parse(data);

		return categories.map((c:any): Category => {
			return  {
				id: c.idCategory,
				name: c.strCategory,
				slug: slugify(c.strCategory),
				thumb: c.strCategoryThumb,
				description: c.strCategoryDescription
			}
		});
	} catch(err) {
		throw Error(`Error parsing response data - ${JSON.stringify(err)}`);
	}
}

export const normalizeMeals = (data: any): Meal[] => {
	try {
		const { meals } = JSON.parse(data);

		return meals.map((m:any): Meal => {
			return  {
				id: m.idMeal,
				name: m.strMeal,
				slug: slugify(m.strMeal),
				thumb: m.strMealThumb,
			}
		});
	} catch(err) {
		throw Error(`Error parsing response data - ${JSON.stringify(err)}`);
	}
}

export const normalizeRecipe = (data: any): Recipe[] => {
	try {
		const { meals } = JSON.parse(data);

		return meals.map((r:any): Recipe => {
			const ingredients: any[] = [];

			Object.entries(r).filter(([key, val]) => {
				if (/str(Ingredient|Measure)/.test(key)) {
					if (val) {
						if (key.indexOf('Ingredient') > -1) {
							const idx = parseInt(key.replace('strIngredient',''), 10) - 1;
							if (!ingredients[idx]) ingredients[idx] = {};
							ingredients[idx].ingredient = val;
						} else if (key.indexOf('strMeasure') > -1) {
							const idx = parseInt(key.replace('strMeasure',''), 10) - 1;
							if (!ingredients[idx]) ingredients[idx] = {};
							ingredients[idx].measure = val;
						}
					}
				}
			});

			return  {
				id: r.idMeal,
				name: r.strMeal,
				slug: slugify(r.strMeal),
				category: r.strCategory,
				instructions: r.strInstructions,
				thumb: r.strMealThumb,
				ingredients: ingredients,
				source: r.strSource,
			}
		});
	} catch(err) {
		throw Error(`Error parsing response data - ${JSON.stringify(err)}`);
	}
}

export const slugify = (str: string): string => {
	return str.toString().toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}
