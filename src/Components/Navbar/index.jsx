import { Toolbar, BackButton, ToolbarButton } from 'react-onsenui'
import ProjectForm from '../ProjectForm'

const index = ({ title, navigator, backButton }) => {
  return (
    <Toolbar>
      <div className='left' style={{ margin: "0 10px" }}>
        {title}
      </div>
      {backButton ? <div className='left'>
        <BackButton onClick={() => navigator.popPage()}>Back</BackButton>
      </div> : null}
      {!backButton ?
        <div className="right" style={{ width: "auto" }}>
          <ToolbarButton
            modifier="outline"
            onClick={() => {
              navigator.pushPage({ component: ProjectForm, key: "projectForm" })
            }}
          >+ Add Project</ToolbarButton>
        </div> : null
      }
    </Toolbar>
  )
}

export default index