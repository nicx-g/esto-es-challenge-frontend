import { useState } from 'react'
import { ListItem, Popover, Icon, AlertDialog, AlertDialogButton, List } from 'react-onsenui'
import useProjects from '../../hooks/useProjects'
import styles from './project.module.css'
import Index from '../ProjectForm'

const ProjectItem = ({ project, navigator }) => {
  const { deleteProject } = useProjects();
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
    <ListItem modifier="longdivider">
      <div className={`left ${styles.list__item__card}`}>
        <div className={styles.list__item__card__title}>
          {project.name}
        </div>
        <div className={styles.list__item__card__date}>
          creation date: {project.created_at}
        </div>
        <div className={styles.list__item__card__subtitle}>
          Project Manager:
        </div>
        <div className={styles.list__item__card__user}>
          <img style={{ maxHeight: "30px", borderRadius: "50%" }} src={project.project_manager.url_photo} alt="user avatar" />
          {project.project_manager.name}
        </div>
        <div className={styles.list__item__card__subtitle}>
          Assigned to:
        </div>
        <div className={styles.list__item__card__user}>
          <img style={{ maxHeight: "30px", borderRadius: "50%" }} src={project.assigned_to.url_photo} alt="user avatar" />
          {project.assigned_to.name}
        </div>
        <div className={styles.list__item__card__status}>
          <span>Status:</span>
          <p>{project.status}</p>
        </div>
      </div>
      <div className="right">
        <button
          className={styles.popover__button}
          onClick={(event) => {
            setIsOpen({ ...isOpen, menu: true })
            setTarget(event.target)
          }}
        >
          <Icon icon="ellipsis-v" />
        </button>
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
            <div className="left">Edit</div>
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
  )
}

export default ProjectItem