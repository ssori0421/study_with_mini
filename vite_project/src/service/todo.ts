import { authInstance } from './axios';

const createTodo = async (body: object) => {
	const { data } = await authInstance.post('/todos', body);
	return data;
};

const getTodo = async () => {
	const { data } = await authInstance.get('/todos');
	return data;
};

export { createTodo, getTodo };
