import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleLogin } from '../services/handle-login'
import { useDispatch, useSelector } from 'react-redux'
import {
  isLoadingSelector,
  loginIsDisabledSelector,
  loadingClassSelector,
  hasErrorSelector,
  errorDisplaySelector,
} from '../utils/selector'
import { errorDisplayToggle } from '../features/error'
import { store } from '../utils/store'
import LoadingSpinner from '../component/loading-spinner'
import ErrorBox from '../component/error-box'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoading = useSelector(isLoadingSelector)
  const loginIsDisabled = useSelector(loginIsDisabledSelector)
  const loadingClass = useSelector(loadingClassSelector)
  const hasError = useSelector(hasErrorSelector)
  const errorDisplay = useSelector(errorDisplaySelector)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  return (
    <main className="main bg-dark">
      <section className="login-block-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form
          onSubmit={async (e) => {
            await dispatch(handleLogin(e, email, password, rememberMe))
            const storeHasError = store.getState().error.hasError
            console.log('!storeHasError', !storeHasError)
            !storeHasError && navigate('../profile')
          }}
        >
          <div className="input-wrapper">
            <label htmlFor="email">Username</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              // minLength={3}
              // required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              // minLength={3}
              // required
            />
          </div>
          <div className="input-remember">
            <input
              checked={rememberMe}
              onChange={(e) =>
                rememberMe ? setRememberMe(false) : setRememberMe(true)
              }
              type="checkbox"
              id="remember-me"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            disabled={loginIsDisabled}
            type="submit"
            className={`form-button ${loadingClass}`}
          >
            {isLoading ? <LoadingSpinner /> : 'Sign In'}
          </button>
          {hasError === 'login' && !errorDisplay && (
            <button
              onClick={() => dispatch(errorDisplayToggle(true))}
              type="button"
              className="error-button open-error-button-login"
            >
              <i className="fa fa-warning"></i>
            </button>
          )}
        </form>
      </section>
      {hasError === 'login' && errorDisplay && <ErrorBox />}
    </main>
  )
}
