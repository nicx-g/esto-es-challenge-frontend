import { Page, Input } from "react-onsenui"
import Navbar from '../Navbar'

const index = ({ navigator }) => {
  return (
    <Page renderToolbar={() =>
      <Navbar title="Add Project" navigator={navigator} backButton={true} />
    }>
      <Input />
    </Page>
  )
}

export default index;