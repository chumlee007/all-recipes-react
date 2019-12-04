import React from 'react';
import Link from 'next/link'
import { NextPage } from 'next';
import Wrapper from '@/components/wrapper/Wrapper';
import { normalizeCategories } from '@/utils';
import $http from 'axios';

interface Props {
	categories: Category[];
}

const Index: NextPage<Props> = ({ categories }) => {
	return (<Wrapper>
		<div id="index">
			<h1 className="title">Categories ({categories.length})</h1>
			<section className="listing">
				{categories.map((cat, index) => 
					<React.Fragment key={`link-${index}`}>
						<Link href="[category]" as={`/${cat.slug}`}>
							<a className="card">
								<div className="thumb">
									<img src={cat.thumb} alt={cat.name} />
								</div>
								<section>
									<h1>{cat.name}</h1>
								</section>
								<footer>
									<span className="view">View Category</span>
								</footer>
							</a>
						</Link>
					</React.Fragment>)}
			</section>
		</div>
	</Wrapper>);
}

Index.getInitialProps = async(): Promise<any> => {
	let categories: Category[] = [];

	const { data } = await $http.get('https://www.themealdb.com/api/json/v1/1/categories.php', {
		transformResponse: normalizeCategories
	});

	if (data) categories = data;

	return { categories }
}

export default Index;