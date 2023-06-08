import { useState } from 'react';
import { email_regex, password_regex } from '../util/regex';
import { useNavigate } from 'react-router-dom';
import { postSignUp } from '../service/sign';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import PageLayout from '../components/Layout/PageLayout';

const SignUp = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

	const Navigate = useNavigate();

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEmail(value);
		const isValidEmail = email_regex.test(value);
		setIsValidEmail(isValidEmail);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPassword(value);
		const isValidPassword = password_regex.test(value);
		setIsValidPassword(isValidPassword);
	};

	const onsubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const body = {
				email: email,
				password: password,
			};
			await postSignUp(body);
			Navigate('/signin');
		} catch (error: any) {
			const errorCode = error.response.status;
			if (errorCode < 500 && errorCode >= 400) {
				const { message } = error.response.data;
				alert(message);
			}
			console.error('회원가입 실패');
		}
	};

	return (
		<PageLayout title={'회원가입'}>
			<StForm onSubmit={onsubmitForm}>
				<StInputName>Email:</StInputName>
				<StSignInput data-testid="email-input" onChange={onChangeEmail} placeholder="이메일을 입력해 주세요." />
				<StSignMessage>@를 포함해서 이메일을 작성해 주세요.</StSignMessage>
				<StInputName>Password:</StInputName>
				<StSignInput
					type="password"
					data-testid="password-input"
					onChange={onChangePassword}
					placeholder="비밀번호를 입력해 주세요."
				/>
				<StSignMessage>비밀번호를 8자 이상 작성해 주세요.</StSignMessage>
				<StButtonWrapper>
					<StButton data-testid="signup-button">회원가입</StButton>
				</StButtonWrapper>
			</StForm>
		</PageLayout>
	);
};

export default SignUp;

const StForm = styled.form`
	width: 380px;
	border: 1px solid ${palette.mainColor};
	border-radius: 10px;
	padding: 10px;
`;

const StInputName = styled.p`
	font-size: 12px;
	font-weight: 500;
	color: ${palette.mainColor};
`;

const StSignInput = styled.input`
	display: block;
	width: 100%;
	border: 1px solid ${palette.mainColor};
	padding: 4px 2px;
`;

const StSignMessage = styled.p`
	color: ${palette.mainColor};
	font-size: 3px;
	font-weight: 400;
	margin-bottom: 10px;
`;

const StButtonWrapper = styled.div`
	text-align: center;
`;

const StButton = styled.button`
	width: 200px;
	height: 30px;
	background-color: ${palette.mainColor};
	color: ${palette.white};
	border-radius: 4px;
`;
