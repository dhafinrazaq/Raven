import logo from './RavenLogo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import ProjectList from './components/ProjectList'

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <ProjectList />
    </div>
  );
}

export default App;
