import './App.css';
import Calendar from './Calendar';

function App() {
	return (
		<div className="App">
			<Calendar date={new Date('04/26/1998')} />
		</div>
	);
}

export default App;
