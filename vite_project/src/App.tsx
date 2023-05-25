import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ToDo from './pages/ToDo';

function App() {
	return (
		<Routes>
			<Route path="/signup" element={<SignUp />}></Route>
			<Route path="/signin" element={<SignIn />}></Route>
			<Route path="/todo" element={<ToDo />}></Route>
		</Routes>
	);
}

export default App;
