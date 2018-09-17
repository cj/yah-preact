import { h } from 'preact'
import { Link } from 'preact-router/match'

const activeClassName = 'is-active'

const Header = () => (
  <header class="Header">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="container is-fluid">
        <div class="navbar-brand">
          <Link class="navbar-item" href="/">{'Young Actor\'s House'}</Link>
        </div>

        <div class="navbar-menu">
          <div class="navbar-end">
            <Link class="navbar-item" activeClassName={activeClassName} href="/">Home</Link>
            <Link class="navbar-item" activeClassName={activeClassName} href="/profile">Me</Link>
            <Link class="navbar-item" activeClassName={activeClassName} href="/profile/john">John</Link>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
