import React from 'react';
import Link from 'next/link'
import { NextPage } from 'next';
import Wrapper from '@/components/wrapper/Wrapper';
import { normalizeMeals } from '@/utils';
import $http from 'axios';

interface Props {
	meals: Meal[];
	categorySlug: string;
}

const Category: NextPage<Props> = ({ meals, categorySlug }) => {
	return (<Wrapper>
		<div id="meals">
			<h1 className="title"><Link href="/"><a>Home</a></Link> / Meals ({meals.length})</h1>
			<section className="listing">
				{meals.map((meal, index) => 
					<React.Fragment key={`link-${index}`}>
						<Link href="/[category]/[recipe]" as={`/${categorySlug}/${meal.id}`}>
							<a className="card">
								<div className="thumb">
									<img src={meal.thumb} alt={meal.name} />
								</div>
								<section>
									<h1>{meal.name}</h1>
								</section>
								<footer>
									<span className="view">View Meal</span>
								</footer>
							</a>
						</Link>
					</React.Fragment>)}
			</section>
		</div>
	</Wrapper>);
}

Category.getInitialProps = async({ query }): Promise<any> => {
	let meals: Meal[] = [];
	
	const categorySlug: string|string[]|null = query ? query.category : null;

	if (categorySlug) {
		const { data } = await $http.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySlug}`, {
			transformResponse: normalizeMeals
		});

		if (data) meals = data;
	}

	return {
		meals,
		categorySlug
	}
}


export default Category;