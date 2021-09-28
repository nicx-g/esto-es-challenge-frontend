import { useContext, useState, useEffect } from "react";
import { ProjectsContext } from "../context/project";
import { data as projectMockData } from "./projectMockData";
import useUsers from "./useUsers";

const useProjects = () => {
  const { users } = useUsers();
  const { projects, setProjects } = useContext(ProjectsContext);
  const [utils, setUtils] = useState({
    loading: false,
    error: false,
  });

  const getProjects = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (localStorage.projects) {
          resolve(JSON.parse(localStorage.getItem("projects")));
        } else {
          resolve(projectMockData);
        }
      }, 2000);
    });
  };

  const createProject = (data) => {
    const { name, description, manager_id, developer_id, status } = data;
    const project_manager = users.find(
      (user) => user.id === parseInt(manager_id)
    );
    const assigned_to = users.find(
      (user) => user.id === parseInt(developer_id)
    );
    const newProject = {
      id: projects.length + 1,
      created_at: new Date().toLocaleString(),
      name,
      description,
      project_manager,
      assigned_to,
      status,
    };
    const newProjects = [...projects, newProject];
    setProjects(newProjects);
    localStorage.setItem("projects", JSON.stringify(newProjects));
    return { status: 200, success: true };
  };

  const updateProject = (id, data) => {};

  const deleteProject = (id) => {
    const newProjects = projects.filter((project) => project.id !== id);
    setProjects(newProjects);
  };

  useEffect(() => {
    setUtils({ loading: true, error: false });
    getProjects()
      .then((data) => {
        setProjects(data);
        localStorage.setItem("projects", JSON.stringify(data));
        setUtils({ loading: false, error: false });
      })
      .catch((error) => setUtils({ loading: false, error }));
    return () => {
      setUtils({ loading: false, error: false });
    };
  }, [setProjects]);

  return {
    projects,
    isLoading: utils.loading,
    error: utils.error,
    createProject,
    deleteProject,
  };
};

export default useProjects;
