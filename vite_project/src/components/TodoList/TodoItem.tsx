import { useState,  } from 'react';
import { ITodo } from '../../types/todo';

interface IProps {
	item: ITodo;
	onUpdateTodo: (id: number, todo: string, isCompleted: boolean) => void;
	onDeleteTodo: (id: number) => void;
}

const TodoItem = ({ item, , onUpdateTodo, onDeleteTodo }: IProps) => {
	const { id, todo, isCompleted } = item;
	const [isEditMode, setIsEditMode] = useState(false);
	const [editTodo, setEditTodo] = useState<string>(todo);
	const [checkBox, setCheckBox] = useState<boolean>(isCompleted);

	const onChangeTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEditTodo(value);
	};
	const onEditMode = () => {
		setIsEditMode(true);
	};
	const onUpdateTodoItem = async () => {
		try {
			await onUpdateTodo(id, editTodo, isCompleted);
			setIsEditMode(false);
		} catch (error) {
			console.error(error);
		}
	};
	const onUpdateCheckBox = async () => {
		try {
			await onUpdateTodo(id, editTodo, !checkBox);
			setCheckBox((_checkBox) => !_checkBox);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			<li key={id}>
				<input type="checkbox" value={id} checked={checkBox} onChange={onUpdateCheckBox} />
				{isEditMode ? (
					<>
						<input data-testid="modify-input" value={editTodo} onChange={onChangeTodoInput} />
						<button data-testid="submit-button" onClick={onUpdateTodoItem}>
							제출
						</button>
						<button data-testid="cancel-button">취소</button>
					</>
				) : (
					<>
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
