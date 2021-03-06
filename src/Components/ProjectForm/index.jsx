import { useState } from "react"
import { Page, Input, Select, AlertDialog, AlertDialogButton } from "react-onsenui"
import Navbar from '../Navbar'
import { Form, Formik, Field } from 'formik'
import styles from './proyectForm.module.css'
import useUsers from '../../hooks/useUsers'
import useProjects from '../../hooks/useProjects'

const Index = ({ navigator, project }) => {
  const { users } = useUsers();
  const { createProject, updateProject } = useProjects();
  const [isOpen, setIsOpen] = useState(false)

  const validate = (values) => {
    let errors = {};
    if (!values.name) errors.name = "Required"
    if (!values.description) errors.description = "Required"
    if (!values.manager_id) errors.manager_id = "Required"
    if (!values.developer_id) errors.developer_id = "Required"
    return errors;
  }

  return (
    <Page renderToolbar={() =>
      <Navbar title={`${project ? "Edit project" : "Add Project"}`} navigator={navigator} backButton={true} />
    }>
      <Formik
        enableReinitialize
        validate={validate}
        initialValues={{
          name: project?.name ?? "",
          description: project?.description ?? '',
          manager_id: project?.project_manager?.id ?? 0,
          developer_id: project?.assigned_to?.id ?? 0,
          status: project?.status ?? "enabled"
        }}
        onSubmit={(values, actions) => {
          let resp;
          if (project) {
            resp = updateProject(project?.id, values)
          } else {
            resp = createProject(values)
          }
          if (resp.success) {
            setIsOpen(true)
            actions.resetForm({ name: "", description: "", developer_id: "", manager_id: "", status: "" })
          }
        }}
      >
        <Form className={styles.form}>
          <Field name="name">
            {({ field, form }) => (
              <div className={styles.form__group}>
                <label htmlFor={field.name}>Project Name</label>
                <Input
                  {...field}
                  id={field.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.name && form.touched.name ? <div className={styles.form__error}>{form.errors.name}</div> : null}
              </div>
            )}
          </Field>
          <Field name="description">
            {({ form, field }) => (
              <div className={styles.form__group}>
                <label htmlFor={field.name}>Project Description</label>
                <Input
                  {...field}
                  id={field.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                />
                {form.errors.description && form.touched.description ? <div className={styles.form__error}>{form.errors.description}</div> : null}
              </div>
            )
            }
          </Field>
          <Field name="manager_id">
            {({ field, form }) => (
              <div className={styles.form__group}>
                <label htmlFor={field.name}>Project Manager</label>
                <Select id={field.name} {...field}>
                  <option value={0}>Select a person</option>
                  {users.map((user) => (
                    user.role === "project_manager" ? <option value={user.id}>{user.name}</option> : null
                  ))}
                </Select>
                {form.errors.manager_id && form.touched.manager_id ? <div className={styles.form__error}>{form.errors.manager_id}</div> : null}
              </div>
            )}
          </Field>
          <Field name="developer_id">
            {({ field, form }) => (
              <div className={styles.form__group}>
                <label htmlFor={field.name}>Assigned to</label>
                <Select id={field.name} {...field}>
                  <option value={0}>Select a person</option>
                  {users.map((user) => (
                    user.role === "developer" ? <option value={user.id}>{user.name}</option> : null
                  ))}
                </Select>
                {form.errors.developer_id && form.touched.developer_id ? <div className={styles.form__error}>{form.errors.developer_id}</div> : null}
              </div>
            )}
          </Field>
          <Field name="status">
            {({ field, form }) => (
              <div className={styles.form__group}>
                <label htmlFor={field.name}>Status</label>
                <Select id={field.name} {...field}>
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </Select>
              </div>
            )}
          </Field>

          <button type="submit" className={styles.form__button}>
            {project ? "Edit project" : "Create project"}
          </button>

          <AlertDialog
            isOpen={isOpen}
          >
            <div className={styles.alert__title}>{project ? "Project was edited" : "Project was created"}</div>
            <AlertDialogButton
              onClick={() => setIsOpen(false)}
            >ok</AlertDialogButton>
          </AlertDialog>


        </Form>
      </Formik>
    </Page>
  )
}

export default Index;