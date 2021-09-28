import { Navigator } from "react-onsenui";
import ProjectList from "./Components/ProjectList";
import ProjectProvider from "./context/project";

function App() {
  const renderPage = (route, navigator) => (
    <route.component key={route.key} navigator={navigator} />
  );

  return (
    <ProjectProvider>
      <Navigator
        renderPage={renderPage}
        initialRoute={{ component: ProjectList, key: "projectList" }}
      />
    </ProjectProvider>
  );
}

export default App;
