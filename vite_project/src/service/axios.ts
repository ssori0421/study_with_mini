import axios from 'axios';
import { getAccessToken } from '../util/localstorage';

const defaultConfig = {
	baseURL: 'https://www.pre-onboarding-selection-task.shop/',
	Headers: {
		'Content-Type': 'application/json',
	},
};

const instance = axios.create(defaultConfig);

const authInstance = axios.create(defaultConfig);

authInstance.interceptors.request.use((config) => {
	const accessToken = getAccessToken();
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

export { instance, authInstance };
