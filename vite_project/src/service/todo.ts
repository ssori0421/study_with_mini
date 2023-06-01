import { authInstance } from './axios';

const createTodo = async (body: object) => {
	const { data } = await authInstance.post('/todos', body);
	return data;
};

export { createTodo };
