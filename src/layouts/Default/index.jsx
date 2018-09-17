import './style'
import { h } from 'preact'
import Header from '~/components/Header'

const DefaultLayout = ({ children, header = <Header />, ...props }) => (
  <div class="DefaultLayout">
    {header}

    <div class="container is-fluid">
      <div {...props}>
        { children }
      </div>
    </div>
  </div>
)

export default DefaultLayout
