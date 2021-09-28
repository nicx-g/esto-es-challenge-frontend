import { useState } from 'react'
import { Page, List, ListItem, Icon, Popover, ProgressCircular } from 'react-onsenui'
import Navbar from '../Navbar';
import styles from './project.module.css'
import useProjects from '../../hooks/useProjects'

const ProjectList = ({ navigator }) => {

  const { projects, isLoading, error } = useProjects()
  const [isOpen, setIsOpen] = useState(false)
  const [target, setTarget] = useState(null)

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
                      setIsOpen(true)
                      setTarget(event.target)
                    }}
                    icon="ellipsis-v"
                  />
                </div>
                <Popover
                  isOpen={isOpen}
                  onCancel={() => setIsOpen(false)}
                  getTarget={() => target}
                >
                  <List>
                    <ListItem>
                      <Icon className="left" icon="edit" />
                      <div className="left">Edit</div>
                    </ListItem>
                    <ListItem>
                      <Icon className="left" icon="trash" />
                      <div className="left">Delete</div>
                    </ListItem>
                  </List>
                </Popover>
              </ListItem>
            )}
          />
        }

      </div>
    </Page >
  )
}
export default ProjectList;