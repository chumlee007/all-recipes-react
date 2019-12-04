import 'normalize.css';
import './wrapper.scss';
import React from 'react';
import Head from 'next/head';

const Wrapper = ({ children }) => {
	return (<>
		<Head>
			<title>Anthony's Recipes</title>
			<meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui" />
		</Head>
		<main role="main" id="app">
			{children}
		</main>
	</>);
}

export default Wrapper;