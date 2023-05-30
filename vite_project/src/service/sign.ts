import { instance } from './axios';

const postSignUp = async (body: object) => {
	await instance.post('/auth/signup', body);
};

const postSignIn = async (body: object) => {
	const { data } = await instance.post('/auth/signin', body);
	console.log(data);
};

export { postSignUp, postSignIn };
