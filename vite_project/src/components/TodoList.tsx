import { ChangeEvent } from 'react';
import { ITodo } from '../types/todo';
import TodoItem from './TodoItem';

interface IProps {
	todoList: ITodo[];
	onChangeComplete: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
	onUpdateTodo: (id: number, todo: string, isCompleted: boolean) => void;
	onDeleteTodo: (id: number) => void;
}

const TodoList = ({ todoList, onChangeComplete, onUpdateTodo, onDeleteTodo }: IProps) => {
	return (
		<ul>
			{todoList &&
				todoList.map((item) => (
					<TodoItem
						item={item}
						onChangeComplete={onChangeComplete}
						onUpdateTodo={onUpdateTodo}
						onDeleteTodo={onDeleteTodo}
					/>
				))}
		</ul>
	);
};

export default TodoList;
