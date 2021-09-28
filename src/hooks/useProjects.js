import { useContext, useState, useEffect } from "react";
import { ProjectsContext } from "../context/project";
import { data as projectMockData } from "./projectMockData";

const useProjects = () => {
  const { projects, setProjects } = useContext(ProjectsContext);
  const [utils, setUtils] = useState({
    loading: false,
    error: false,
  });

  const getProjects = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(projectMockData);
      }, 2000);
    });
  };

  useEffect(() => {
    setUtils({ loading: true, error: false });
    getProjects()
      .then((data) => {
        setProjects(data);
        setUtils({ loading: false, error: false });
      })
      .catch((error) => setUtils({ loading: false, error }));
  }, []);

  return {
    projects,
    isLoading: utils.loading,
    error: utils.error,
  };
};

export default useProjects;
