interface IProps {
	todo: string;
	onChangeTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onCreateTodo: () => void;
}

const CreateTodo = ({ todo, onChangeTodo, onCreateTodo }: IProps) => {
	return (
		<>
			<input data-testid="new-todo-input" value={todo} onChange={onChangeTodo} />
			<button data-testid="new-todo-add-button" onClick={onCreateTodo}>
				추가
			</button>
		</>
	);
};

export default CreateTodo;
