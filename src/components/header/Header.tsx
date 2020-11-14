import React from 'react'
import useUser from '../../hooks/useUser'

export default function Header() {
  const { isLogged, logout } = useUser()

  return (
    <>
      {isLogged ? (
        <header className="row no-gutters">
          <div className="col-8">
          <h1>T-react</h1>
          </div>
          <nav className="col-4 justify-content-end">
            <ul className="list-inline">
              <li>
                <a href='/login' onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </header>
      ) : (
        ''
      )}
    </>
  )
}
