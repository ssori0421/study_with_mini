const setAccessToken = (token: object) => {
	localStorage.setItem('access_token', JSON.stringify(token));
};

const getAccessToken = (): string | null => {
	const token = localStorage.getItem('access_token');
	if (token) {
		return JSON.parse(token);
	} else {
		return null;
	}
};

export { setAccessToken, getAccessToken };
