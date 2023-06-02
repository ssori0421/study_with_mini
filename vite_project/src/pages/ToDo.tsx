import { useCallback, useEffect, useState } from 'react';
import { createTodo, getTodo } from '../service/todo';
import { ITodo } from '../types/todo';

const ToDo = () => {
	const [todo, setTodo] = useState<string>('');
	const [todoList, setTodoList] = useState<ITodo[]>();

	const getTodoList = useCallback(async () => {
		const data = await getTodo();
		setTodoList(data);
	}, []);

	useEffect(() => {
		getTodoList();
	}, []);

	const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTodo(value);
	};

	const onCreateTodo = async () => {
		try {
			const body = { todo: todo };
			const item = await createTodo(body);
			if (todoList) {
				setTodoList([...todoList, item]);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<input data-testid="new-todo-input" onChange={onChangeTodo} />
			<button data-testid="new-todo-add-button" onClick={onCreateTodo}>
				추가
			</button>
			{todoList &&
				todoList.map((item) => (
					<li>
						<label>
							<input type="checkbox" />
							<span>{item.todo}</span>
						</label>
					</li>
				))}
		</>
	);
};

export default ToDo;
