import { useCallback, useEffect, useState } from 'react';
import { createTodo, getTodo, deleteTodo, updateTodo } from '../service/todo';
import { ITodo } from '../types/todo';
import CreateTodo from '../components/TodoList/CreateTodo';
import TodoList from '../components/TodoList/TodoList';
import PageLayout from '../components/Layout/PageLayout';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

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
		<PageLayout title={'투두 리스트'}>
			<StTodoListWrapper>
				<CreateTodo todo={todo} onChangeTodo={onChangeTodo} onCreateTodo={onCreateTodo} />
				<TodoList todoList={todoList} onUpdateTodo={onUpdateTodo} onDeleteTodo={onDeleteTodo} />
			</StTodoListWrapper>
		</PageLayout>
	);
};

export default ToDo;

const StTodoListWrapper = styled.form`
	width: 380px;
	border: 1px solid ${palette.mainColor};
	border-radius: 10px;
	padding: 10px;
`;
