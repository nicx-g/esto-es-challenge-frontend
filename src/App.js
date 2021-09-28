import { Navigator } from "react-onsenui";
import ProjectList from "./Components/ProjectList";
import ProjectProvider from "./context/project";
import UsersProvider from "./context/users";

function App() {
  const renderPage = (route, navigator) => (
    <route.component key={route.key} navigator={navigator} />
  );

  return (
    <UsersProvider>
      <ProjectProvider>
        <Navigator
          renderPage={renderPage}
          initialRoute={{ component: ProjectList, key: "projectList" }}
        />
      </ProjectProvider>
    </UsersProvider>
  );
}

export default App;
