import { useState } from 'react'
import { Page, List, ListItem, Icon, Popover, ProgressCircular, AlertDialog, AlertDialogButton } from 'react-onsenui'
import Index from '../ProjectForm';
import Navbar from '../Navbar';
import styles from './project.module.css'
import useProjects from '../../hooks/useProjects'

const ProjectList = ({ navigator }) => {

  const { projects, isLoading, deleteProject } = useProjects()
  const [isOpen, setIsOpen] = useState({
    menu: false,
    alert: false
  })
  const [target, setTarget] = useState(null)
  const handleDelete = (id) => {
    deleteProject(id)
    setIsOpen({ menu: false, alert: false })
  }

  return (
    <Page renderToolbar={() =>
      <Navbar title="My projects" navigator={navigator} />
    }>
      <div className="container">
        {isLoading ?
          <div className={styles.loading}>
            <ProgressCircular indeterminate />
          </div> :
          <List
            dataSource={projects}
            renderRow={(project) => (
              <ListItem modifier="longdivider">
                <div className={`left ${styles.list__item__card}`}>
                  <div className={styles.list__item__card__title}>
                    {project.name}
                  </div>
                  <div className={styles.list__item__card__subtitle}>
                    creation date: {project.created_at}
                  </div>
                  <div className={styles.list__item__card__user}>
                    <img style={{ maxHeight: "30px", borderRadius: "50%" }} src={project.assigned_to.url_photo} alt="user avatar" />
                    {project.assigned_to.name}
                  </div>
                </div>
                <div className="right">
                  <Icon
                    onClick={(event) => {
                      setIsOpen({ ...isOpen, menu: true })
                      setTarget(event.target)
                    }}
                    icon="ellipsis-v"
                  />
                </div>
                <Popover
                  isOpen={isOpen.menu}
                  onCancel={() => setIsOpen(false)}
                  getTarget={() => target}
                >
                  <List>
                    <ListItem onClick={() => {
                      setIsOpen({ ...isOpen, menu: false })
                      navigator.pushPage({ component: Index, project, key: "projectFormEdit" })
                    }}>
                      <Icon className="left" icon="edit" />
                      <div className="left">Edit, {project.name}</div>
                    </ListItem>
                    <ListItem onClick={() => setIsOpen({ menu: false, alert: true })}>
                      <Icon className="left" icon="trash" />
                      <div className="left">Delete</div>
                    </ListItem>
                  </List>
                </Popover>
                <AlertDialog
                  isOpen={isOpen.alert}
                >
                  <div className={styles.alert__title}>Are you sure you want delete this project?</div>
                  <AlertDialogButton onClick={() => setIsOpen({ ...isOpen, alert: false })}>
                    Cancel
                  </AlertDialogButton>
                  <AlertDialogButton onClick={() => handleDelete(project.id)}>
                    Delete
                  </AlertDialogButton>
                </AlertDialog>
              </ListItem>
            )}
          />
        }

      </div>
    </Page >
  )
}
export default ProjectList;