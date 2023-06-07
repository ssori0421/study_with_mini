import { useCallback, useEffect, useState } from 'react';
import { createTodo, getTodo, deleteTodo, updateTodo } from '../service/todo';
import { ITodo } from '../types/todo';
import TodoList from '../components/TodoList';

const ToDo = () => {
	const [todo, setTodo] = useState<string>('');
	const [todoList, setTodoList] = useState<ITodo[]>([]);

	const getTodoList = useCallback(async () => {
		const data = await getTodo();
		setTodoList(data);
	}, []);

	useEffect(() => {
		getTodoList();
	}, [getTodoList]);

	const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setTodo(value);
	};

	const onChangeComplete = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const { checked } = e.target;
		const currentTodoList = todoList?.map((item: ITodo) => {
			if (item.id === id) {
				return { ...item, isCompleted: checked };
			}
			return item;
		});
		setTodoList(currentTodoList);
	};

	const onCreateTodo = async () => {
		try {
			const body = { todo: todo };
			const item = await createTodo(body);
			if (todoList) {
				setTodoList([...todoList, item]);
			}
			setTodo('');
		} catch (error) {
			console.error(error);
		}
	};

	const onUpdateTodo = async (id: number, todo: string, isCompleted: boolean) => {
		const body = { todo: todo, isCompleted: isCompleted };
		try {
			await updateTodo(id, body);
			const updateTodoList = todoList?.map((item: ITodo) => {
				if (item.id == id) {
					return { ...item, todo, isCompleted };
				}
				return item;
			});
			setTodoList(updateTodoList);
		} catch (error) {
			console.error(error);
		}
	};

	const onDeleteTodo = async (id: number) => {
		console.log(id);
		try {
			await deleteTodo(id);
			const filteredTodoList = todoList?.filter((item: ITodo) => item.id !== id);
			setTodoList(filteredTodoList);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<input data-testid="new-todo-input" value={todo} onChange={onChangeTodo} />
			<button data-testid="new-todo-add-button" onClick={onCreateTodo}>
				추가
			</button>
			<TodoList
				todoList={todoList}
				onChangeComplete={onChangeComplete}
				onUpdateTodo={onUpdateTodo}
				onDeleteTodo={onDeleteTodo}
			/>
		</>
	);
};

export default ToDo;
