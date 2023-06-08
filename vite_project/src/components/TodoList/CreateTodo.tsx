import styled from 'styled-components';
import { palette } from '../../../styles/palette';

interface IProps {
	todo: string;
	onChangeTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onCreateTodo: () => void;
}

const CreateTodo = ({ todo, onChangeTodo, onCreateTodo }: IProps) => {
	return (
		<StCreateTodoWrapper>
			<StCreateTodoInput data-testid="new-todo-input" value={todo} onChange={onChangeTodo} />
			<StCreateTodoBtn data-testid="new-todo-add-button" onClick={onCreateTodo}>
				추가하기
			</StCreateTodoBtn>
		</StCreateTodoWrapper>
	);
};

export default CreateTodo;

const StCreateTodoWrapper = styled.div`
	display: flex;
	justify-content: center;
	gap: 10px;
`;

const StCreateTodoInput = styled.input`
	border-bottom: 2px solid ${palette.mainColor};
	margin-bottom: 20px;
`;

const StCreateTodoBtn = styled.button`
	height: 20px;
	width: 50px;
	background-color: ${palette.mainColor};
	border-radius: 4px;
	color: ${palette.white};
	font-size: 12px;
	font-weight: 600;
`;
