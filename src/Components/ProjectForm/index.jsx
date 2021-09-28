import { Page, Input, Select, Button } from "react-onsenui"
import Navbar from '../Navbar'
import { Form, Formik, Field } from 'formik'
import styles from './proyectForm.module.css'

const index = ({ navigator }) => {

  const usersData = [
    {
      name: "Ignacio truffa",
      url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=mp&r=x",
      role: "developer"
    },
    {
      name: "Ignacio truffa",
      url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=mp&r=x",
      role: "developer"
    },
    {
      name: "Ignacio truffa",
      url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=mp&r=x",
      role: "developer"
    },
    {
      name: "Walt Cosani",
      url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=identicon&r=x",
      role: "project_manager"
    },
    {
      name: "Walt Cosani",
      url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=identicon&r=x",
      role: "project_manager"
    },
    {
      name: "Walt Cosani",
      url_photo: "https://gravatar.com/avatar/2821a57d2412a33775155644a612a9a5?s=400&d=identicon&r=x",
      role: "project_manager"
    },
  ]

  const validate = (values) => {
    let errors = {};
    if (!values.name) errors.name = "Required"
    if (!values.description) errors.description = "Required"
    if (!values.manager) errors.manager = "Required"
    if (!values.developer) errors.developer = "Required"
    return errors;
  }

  return (
    <Page renderToolbar={() =>
      <Navbar title="Add Project" navigator={navigator} backButton={true} />
    }>
      <Formik
        validate={validate}
        initialValues={{
          name: "",
          description: '',
          manager: "",
          developer: "",
          status: "enabled"
        }}
        onSubmit={(values) => {
          console.log(values)
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
          <Field name="manager">
            {({ field, form }) => (
              <div className={styles.form__group}>
                <label htmlFor={field.name}>Project Manager</label>
                <Select id={field.name} {...field}>
                  <option value="">Select a person</option>
                  {usersData.map((user) => (
                    user.role === "project_manager" ? <option value={user.name}>{user.name}</option> : null
                  ))}
                </Select>
                {form.errors.manager && form.touched.manager ? <div className={styles.form__error}>{form.errors.manager}</div> : null}
              </div>
            )}
          </Field>
          <Field name="developer">
            {({ field, form }) => (
              <div className={styles.form__group}>
                <label htmlFor={field.name}>Assigned to</label>
                <Select id={field.name} {...field}>
                  <option value="">Select a person</option>
                  {usersData.map((user) => (
                    user.role === "developer" ? <option value={user.name}>{user.name}</option> : null
                  ))}
                </Select>
                {form.errors.developer && form.touched.developer ? <div className={styles.form__error}>{form.errors.developer}</div> : null}
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


          <button className={styles.form__button}>
            Create project
          </button>
        </Form>
      </Formik>
    </Page>
  )
}

export default index;