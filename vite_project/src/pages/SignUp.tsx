import { useState } from 'react';
import { email_regex, password_regex } from '../util/regex';
import { useNavigate } from 'react-router-dom';

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
		if (!isValidEmail) {
			console.error('@를 포함해서 이메일을 작성해주세요');
		}
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPassword(value);
		const isValidPassword = password_regex.test(value);
		setIsValidPassword(isValidPassword);
		if (!isValidPassword) {
			console.error('8자 이상 작성 해주세요.');
		}
	};

	const isFormValid = isValidEmail && isValidPassword;

	const onsubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isFormValid) {
			Navigate('/signin');
		} else {
			console.error('아이디와 비밀번호를 올바르게 입력 해주세요.');
		}
	};

	return (
		<form onSubmit={onsubmitForm}>
			<div>signup</div>
			<input data-testid="email-input" onChange={onChangeEmail} />
			<input data-testid="password-input" onChange={onChangePassword} />
			<button data-testid="signup-button">회원가입</button>
		</form>
	);
};

export default SignUp;
