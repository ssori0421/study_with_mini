import { ITodo } from '../../types/todo';

import TodoItem from './TodoItem';

interface IProps {
	todoList: ITodo[];
	onUpdateTodo: (id: number, todo: string, isCompleted: boolean) => void;
	onDeleteTodo: (id: number) => void;
}

const TodoList = ({ todoList, onUpdateTodo, onDeleteTodo }: IProps) => {
	return (
		<ul>
			{todoList &&
				todoList.map((item) => (
					<TodoItem
						item={item}
	
						onUpdateTodo={onUpdateTodo}
						onDeleteTodo={onDeleteTodo}
					/>
				))}
		</ul>
	);
};

export default TodoList;
