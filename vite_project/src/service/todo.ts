import { authInstance } from './axios';

const createTodo = async (body: object) => {
	const { data } = await authInstance.post('/todos', body);
	return data;
};

const getTodo = async () => {
	const { data } = await authInstance.get('/todos');
	return data;
};

const updateTodo = async (id: number, body: object) => {
	const { data } = await authInstance.put(`/todos/${id}`, body);
	return data;
};

const deleteTodo = async (id: number) => {
	await authInstance.delete(`/todos/${id}`);
};

export { createTodo, getTodo, updateTodo, deleteTodo };
