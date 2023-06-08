import { ReactNode } from 'react';
import styled from 'styled-components';
import { palette } from '../../../styles/palette';

interface IProps {
	title: string;
	children: ReactNode;
}

const PageLayout = ({ title, children }: IProps) => {
	return (
		<StPageContainer>
			<StTitle>{title}</StTitle>
			{children}
		</StPageContainer>
	);
};

export default PageLayout;

const StPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 150px;
  gap: 10px;
`;

const StTitle = styled.h2`
	font-size: 20px;
	font-weight: 700;
	color: ${palette.mainColor};
`;
