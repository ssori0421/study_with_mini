import { instance } from './axios';
import { setAccessToken } from '../util/localstorage';

const postSignUp = async (body: object) => {
	await instance.post('/auth/signup', body);
};

const postSignIn = async (body: object) => {
	const { data } = await instance.post('/auth/signin', body);
	console.log('data', data);
	setAccessToken(data.access_token);
};

export { postSignUp, postSignIn };
