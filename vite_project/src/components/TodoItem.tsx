import { useState, ChangeEvent } from 'react';
import { ITodo } from '../types/todo';

interface IProps {
	item: ITodo;
	onChangeComplete: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
	onUpdateTodo: (id: number, todo: string, isCompleted: boolean) => void;
	onDeleteTodo: (id: number) => void;
}

const TodoItem = ({ item, onChangeComplete, onUpdateTodo, onDeleteTodo }: IProps) => {
	const { id, todo, isCompleted } = item;
	const [isEditMode, setIsEditMode] = useState(false);
	const [editTodo, setEditTodo] = useState<string>('');

	const onChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEditTodo(value);
	};
	const onEditMode = () => {
		setIsEditMode(true);
		setEditTodo(todo);
	};
	const onUpdateTodoItem = () => {
		onUpdateTodo(id, editTodo, isCompleted);
		setIsEditMode(false);
	};

	return (
		<>
			<li key={id}>
				{isEditMode ? (
					<>
						<input type="checkbox" value={id} checked={isCompleted} onChange={(e) => onChangeComplete(e, id)} />
						<input data-testid="modify-input" value={editTodo} checked={isCompleted} onChange={onChangeTodoInput} />
						<button data-testid="submit-button" onClick={onUpdateTodoItem}>
							제출
						</button>
						<button data-testid="cancel-button">취소</button>
					</>
				) : (
					<>
						<input type="checkbox" value={id} checked={isCompleted} onChange={(e) => onChangeComplete(e, id)} />
						<span>{todo}</span>
						<button data-testid="modify-button" onClick={onEditMode}>
							수정
						</button>
						<button data-testid="delete-button" onClick={() => onDeleteTodo(id)}>
							삭제
						</button>
					</>
				)}
			</li>
		</>
	);
};

export default TodoItem;
