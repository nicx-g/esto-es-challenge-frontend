import { useState } from 'react'
import { Page, List, ListItem, Icon, Popover } from 'react-onsenui'
import Navbar from '../Navbar';
import styles from './project.module.css'

const ProjectList = ({ navigator }) => {
  const data = [
    {
      name: "Landing page",
      created_at: "09/09/2020 10:30am",
      assigned_to: { name: "Ignacio truffa", url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=mp&r=x" },
      project_manager: { name: "Walt Cosani", url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=identicon&r=x" },
      status: "enabled"
    },
    {
      name: "E-commerce shop",
      created_at: "09/09/2020 10:30am",
      assigned_to: { name: "Ignacio truffa", url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=mp&r=x" },
      project_manager: { name: "Walt Cosani", url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=identicon&r=x" },
      status: "enabled"
    },
    {
      name: "CRM Linkroom",
      created_at: "09/09/2020 10:30am",
      assigned_to: { name: "Ignacio truffa", url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=mp&r=x" },
      project_manager: { name: "Walt Cosani", url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=identicon&r=x" },
      status: "enabled"
    },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const [target, setTarget] = useState(null)

  return (
    <Page renderToolbar={() =>
      <Navbar title="My projects" navigator={navigator} />
    }>
      <div className="container">
        <List
          dataSource={data}
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
                  <img style={{ maxHeight: "40px", borderRadius: "50%" }} src={project.assigned_to.url_photo} alt="user avatar" />
                  {project.assigned_to.name}
                </div>
              </div>
              <div className="right">
                <Icon
                  ref={(icon) => setTarget(icon)}
                  onClick={() => {
                    setIsOpen(true)
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
      </div>
    </Page >
  )
}
export default ProjectList;