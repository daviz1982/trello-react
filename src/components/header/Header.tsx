import React from 'react'
import useUser from '../../hooks/useUser'

export default function Header() {
  const {isLogged, logout} = useUser()

  return (
    <>
      {isLogged ? (
        <nav>
          Howdy, #username# !
          <ul>
            <li>
              <a href='/login' onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      ) : (
        ''
      )}
    </>
  )
}
