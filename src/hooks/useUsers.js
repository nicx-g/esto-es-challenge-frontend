import { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/users";
import { usersData } from "./usersMockData";

const useUsers = () => {
  const { users, setUsers } = useContext(UsersContext);
  const [utils, setUtils] = useState({
    loading: false,
    error: false,
  });

  const getUsers = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(usersData);
      }, 2000);
    });
  };

  useEffect(() => {
    setUtils({ loading: true, error: false });
    getUsers()
      .then((data) => {
        setUsers(data);
        setUtils({ loading: false, error: false });
      })
      .catch((error) => setUtils({ loading: false, error }));
  }, []);

  return {
    users,
    isLoading: utils.loading,
    error: utils.error,
  };
};

export default useUsers;
