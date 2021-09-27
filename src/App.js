import { Navigator } from "react-onsenui";
import ProjectList from "./Components/ProjectList";

function App() {
  const renderPage = (route, navigator) => (
    <route.component key={route.key} navigator={navigator} />
  );

  return (
    <Navigator
      renderPage={renderPage}
      initialRoute={{ component: ProjectList, key: "projectList" }}
    />
  );
}

export default App;
