import { useState, ChangeEvent } from 'react';
import { ITodo } from '../types/todo';

interface TodoListProps {
	todoList: ITodo[];
	onChangeComplete: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
	onUpdateTodo: (id: number, todo: string, isCompleted: boolean) => void;
	onDeleteTodo: (id: number) => void;
}

const TodoList = ({ todoList, onChangeComplete, onUpdateTodo, onDeleteTodo }: TodoListProps) => {
	const [editModeId, setEditModeId] = useState<number>();
	const [editTodo, setEditTodo] = useState<string>();

	const onEditMode = (id: number, todo: string) => {
		setEditModeId(id);
		setEditTodo(todo);
	};

	const onChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEditTodo(value);
	};
	const test = (id: number, todo: string, isCompleted: boolean) => {
		onUpdateTodo(id, todo, isCompleted);
		setEditModeId(undefined);
	};
	return (
		<div>
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
								<input
									data-testid="modify-input"
									value={editTodo}
									checked={item.isCompleted}
									onChange={onChangeTodoInput}
								/>
								<button data-testid="submit-button" onClick={() => test(item.id, item.todo, item.isCompleted)}>
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
								<button data-testid="modify-button" onClick={() => onEditMode(item.id, item.todo)}>
									수정
								</button>
								<button data-testid="delete-button" onClick={() => onDeleteTodo(item.id)}>
									삭제
								</button>
							</>
						)}
					</li>
				))}
		</div>
	);
};

export default TodoList;
