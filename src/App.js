import { useEffect, useState } from "react";
import "./App.css";

function App() {
	let connected = false;
	let socket;
	let urlPendingRecords = "localhost:8086/ws/pharmacy/records/pending";
	let urlStatistics = "localhost:8086/ws/pharmacy/statistics";

	const [connection, setConnection] = useState(false);
	const [data, setData] = useState([]);
	const [statistics, setStatistics] = useState();

	useEffect(() => {
		let connect = function () {
			if (!connected) {
				let socket1 = new WebSocket("ws://" + urlPendingRecords);
				let socket2 = new WebSocket("ws://" + urlStatistics);

				socket1.onopen = function () {
					console.log("Connected to the web socket");
					setConnection(true);
				};
				socket2.onopen = function () {
					connected = true;
					console.log("Connected to the web socket");
					setConnection(true);
				};

				socket1.onmessage = function (m) {
					let parsedData = JSON.parse(m.data);
					console.log(parsedData);
					setData(parsedData);
				};
				socket2.onmessage = function (m) {
					let parsedData = JSON.parse(m.data);
					console.log(parsedData);
					setStatistics(parsedData);
				};
			}
		};

		connect();
		// connect(urlStatistics);
	}, []);

	let component = <div></div>;
	if (connection === true) {
		component = data.map((item) => (
			<div className='innerContainer card'>
				<div className='list'>
					<h2>{item.id}</h2>
				</div>
				<div className='list'>
					<h2> {item.status}</h2>
				</div>
				<div className='list'>
					<h2>{item.gender ? "male" : "female"}</h2>
				</div>
			</div>
		));
	}

	return (
		<div>
			<nav className='navbar navbar-default navbar-pf' role='navigation'>
				<div className='navbar-header'>
					<a className='navbar-brand' href='/'>
						<p>
							<strong> --- Quarkus Websocket!</strong>
						</p>
					</a>
				</div>
			</nav>
			<div className='container'>
				<h1>Check Console for logs!</h1>
				<div>
					<h2>Hello Pending Cases:</h2>
					<hr />
					{component}
				</div>
			</div>
		</div>
	);
}

export default App;
