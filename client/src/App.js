import logo from "./RavenLogo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./components/AppNavbar";
import ProjectList from "./components/ProjectList";
import ProjectModal from "./components/ProjectModal";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <Container>
          <ProjectModal></ProjectModal>
          <ProjectList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
