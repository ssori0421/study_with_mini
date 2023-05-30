import axios from 'axios';

const defaultConfig = {
	baseURL: 'https://www.pre-onboarding-selection-task.shop/',
	Headers: {
		'Content-Type': 'application/json',
	},
};

const instance = axios.create(defaultConfig);

export { instance };
