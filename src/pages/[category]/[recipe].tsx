import './recipe.scss';

import React from 'react';
import Link from 'next/link'
import { NextPage } from 'next';
import Wrapper from '@/components/wrapper/Wrapper';
import { normalizeRecipe } from '@/utils';
import $http from 'axios';

interface Props {
	name: string;
	image: string;
	instructions: string;
	ingredients: any[];
	source: string;
	categorySlug: string;
}

const Recipe: NextPage<Props> = ({ name, image, instructions, ingredients, source, categorySlug}) => {
	return (<Wrapper>
		<div id="recipe">
			<h1 className="title">
				<Link href="/"><a>Home</a></Link> / <Link href="/[category]" as={`/${categorySlug}`}><a>Meals</a></Link> / {name}
			</h1>
			<div className="recipe">
				{image && (<div className="image">
					<img src={image} alt={name} />
				</div>)}
				<h2>Instructions</h2>
				<p>{instructions}</p>
				<h2>Ingredients</h2>
				<table>
					<thead>
						<tr>
							<th>Ingredient</th>
							<th>Measure</th>
						</tr>
					</thead>
					<tbody>
						{ingredients.map((ingredient, index) =>
							<React.Fragment key={`ingredient-${index}`}>
							{(ingredient.ingredient && ingredient.measure) && <tr>
								<td>{ingredient.ingredient}</td>
								<td>{ingredient.measure}</td>
							</tr>}
						</React.Fragment>)}
					</tbody>
				</table>
				<h2>Source</h2>
				<a href={source} target="_black" rel="noopener">{source}</a>
			</div>
		</div>
	</Wrapper>);
}

Recipe.getInitialProps = async({ query }): Promise<any> => {
	const recipeId: string|string[]|null = query ? query.recipe : null;
	const categorySlug: string|string[]|null = query ? query.category : null;

	let recipe = null;
	let name: string = '';
	let image: string = '';
	let instructions: string = '';
	let ingredients: any[] = [];
	let source: string = '';
	
	if (recipeId) {
		const { data } = await $http.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`, {
			transformResponse: normalizeRecipe
		});

		recipe = data[0];

		if (recipe) {
			name = recipe.name;
			image = recipe.thumb;
			instructions = recipe.instructions;
			ingredients = recipe.ingredients;
			source = recipe.source;
		}
	}

	return {
		name,
		image,
		instructions,
		ingredients,
		source,
		categorySlug,
	}
}

export default Recipe;