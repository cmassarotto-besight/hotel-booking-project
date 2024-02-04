import './App.css';
import MapSearchComponent from './components/MapSearchComponent';
import TopAppBar from './components/TopAppBar';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <TopAppBar />
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<MapSearchComponent />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
