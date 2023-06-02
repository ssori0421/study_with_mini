import { useState } from 'react';
import { createTodo, getTodo } from '../service/todo';

const ToDo = () => {
	const [todo, setTodo] = useState('');
	const [todoList, setTodoList] = useState('');

	const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTodo(value);
	};

	const onCreateTodo = async () => {
		const body = { todo: todo };
		await createTodo(body);
		const getTodoList = await getTodo();
		setTodoList(getTodoList);
		console.log('todoList', todoList);
	};

	return (
		<>
			<input data-testid="new-todo-input" onChange={onChangeTodo} />
			<button data-testid="new-todo-add-button" onClick={onCreateTodo}>
				추가
			</button>

			<li>
				<label>
					<input type="checkbox" />
					<span>TODO 1</span>
				</label>
			</li>

			<li>
				<label>
					<input type="checkbox" />
					<span>TODO 2</span>
				</label>
			</li>
		</>
	);
};

export default ToDo;
