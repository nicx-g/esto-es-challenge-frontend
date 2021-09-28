import { useState, useEffect } from 'react'
import { Page, List, ProgressCircular, SearchInput } from 'react-onsenui'
import { Formik, Form, Field } from 'formik'
import Navbar from '../Navbar';
import styles from './project.module.css'
import useProjects from '../../hooks/useProjects'
import ProjectItem from './ProjectItem';

const ProjectList = ({ navigator }) => {

  const { projects, isLoading } = useProjects()
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [limitProjects, setLimitProjects] = useState(6)


  useEffect(() => {
    setFilteredProjects(projects)
  }, [isLoading, projects])

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
              renderRow={(project, index) => (
                <ProjectItem key={index} project={project} navigator={navigator} />
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