import { useState, useEffect } from 'react'
import { Page, List, ListItem, Icon, Popover, ProgressCircular, AlertDialog, AlertDialogButton, SearchInput } from 'react-onsenui'
import { Formik, Form, Field } from 'formik'
import Index from '../ProjectForm';
import Navbar from '../Navbar';
import styles from './project.module.css'
import useProjects from '../../hooks/useProjects'

const ProjectList = ({ navigator }) => {

  const { projects, isLoading, deleteProject } = useProjects()
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [limitProjects, setLimitProjects] = useState(6)
  const [isOpen, setIsOpen] = useState({
    menu: false,
    alert: false
  })
  const [target, setTarget] = useState(null)
  const handleDelete = (id) => {
    deleteProject(id)
    setIsOpen({ menu: false, alert: false })
  }

  useEffect(() => {
    setFilteredProjects(projects)
  }, [isLoading])

  return (
    <Page
      renderToolbar={() =>
        <Navbar title="My projects" navigator={navigator} />
      }
      contentStyle={{ padding: "20px", overflowY: "scroll" }}
      onInfiniteScroll={(done) => {
        setLimitProjects(limitProjects + 6)
        done()
      }}
    >
      {isLoading ?
        <div className={styles.loading}>
          <ProgressCircular indeterminate />
        </div> :
        <div className="container">
          <Formik
            initialValues={
              {
                search: ""
              }
            }
            onSubmit={(values) => {
              const { search } = values
              console.log(search)
              if (search) {
                const projectsFiltered = projects.filter(item =>
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.description.toLowerCase().includes(search.toLowerCase())
                )
                setFilteredProjects(projectsFiltered)
              } else {
                setFilteredProjects(projects)
              }
            }}
          >
            <Form>
              <Field name="search">
                {({ field, form }) => (
                  <SearchInput
                    placeholder="Find some project here"
                    className={styles.searchbar}
                    id={field.name}
                    {...field}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                  />
                )}
              </Field>
            </Form>
          </Formik>
          {filteredProjects.slice(0, limitProjects).length !== 0 ?
            <List
              dataSource={filteredProjects.slice(0, limitProjects)}
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
              )}
            />
            : <div className={styles.empty_projects}>There're not projects here :( let's create one!</div>
          }

        </div>
      }

    </Page >
  )
}
export default ProjectList;