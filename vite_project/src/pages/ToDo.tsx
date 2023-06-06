import { useCallback, useEffect, useState } from 'react';
import { createTodo, getTodo, deleteTodo, updateTodo } from '../service/todo';
import { ITodo } from '../types/todo';

const ToDo = () => {
	const [todo, setTodo] = useState<string>('');
	const [todoList, setTodoList] = useState<ITodo[]>();
	const [editModeId, setEditModeId] = useState<number>();
	const [editTodo, setEditTodo] = useState<string>(todo);

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

	const onEditMode = (id: number) => {
		setEditModeId(id);
	};

	const onChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEditTodo(value);
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
			{todoList &&
				todoList.map((item) => (
					<li key={item.id}>
						{editModeId === item.id ? (
							<>
								<input
									type="checkbox"
									value={item.id}
									checked={item.isCompleted}
									onChange={(e) => onChangeComplete(e, item.id)}
								/>
								<input data-testid="modify-input" checked={item.isCompleted} onChange={onChangeTodoInput} />
								<button data-testid="submit-button" onClick={() => onUpdateTodo(item.id, item.todo, item.isCompleted)}>
									제출
								</button>
								<button data-testid="cancel-button">취소</button>
							</>
						) : (
							<>
								<input
									type="checkbox"
									value={item.id}
									checked={item.isCompleted}
									onChange={(e) => onChangeComplete(e, item.id)}
								/>
								<span>{item.todo}</span>
								<button data-testid="modify-button" onClick={() => onEditMode(item.id)}>
									수정
								</button>
								<button data-testid="delete-button" onClick={() => onDeleteTodo(item.id)}>
									삭제
								</button>
							</>
						)}
					</li>
				))}
		</>
	);
};

export default ToDo;
