import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

import PasswordItem from './components/PasswordItem'

class App extends Component {
  state = {
    websiteInput: '',
    userNameInput: '',
    passwordInput: '',
    passwordList: [],
    isShowPassword: false,
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const updatedList = passwordList.filter(e => id !== e.id)
    this.setState({passwordList: updatedList})
  }

  showPasswordList = () => {
    const {passwordList, isShowPassword} = this.state

    const passwordCount = passwordList.length

    if (passwordCount === 0) {
      return (
        <div className="no-password-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="No Passwords"
            className="no-password-image"
          />
          <p className="no-password">No passwords</p>
        </div>
      )
    }
    return (
      <ul className="list-container">
        {passwordList.map(e => (
          <PasswordItem
            key={e.id}
            passwordDetails={e}
            isShowPassword={isShowPassword}
            onDeletePassword={this.onDeletePassword}
          />
        ))}
      </ul>
    )
  }

  websiteUpdate = event => {
    this.setState({websiteInput: event.target.value})
  }

  usernameUpdate = event => {
    this.setState({userNameInput: event.target.value})
  }

  passwordUpdate = event => {
    this.setState({passwordInput: event.target.value})
  }

  createAndSavePassword = event => {
    event.preventDefault()

    const {
      passwordList,
      websiteInput,
      userNameInput,
      passwordInput,
    } = this.state

    const passwordDetails = {
      id: v4(),
      website: websiteInput,
      username: userNameInput,
      password: passwordInput,
    }

    this.setState({
      websiteInput: '',
      userNameInput: '',
      passwordInput: '',
      passwordList: [...passwordList, passwordDetails],
    })
  }

  filteredList = event => {
    const searchInput = event.target.value

    const {passwordList} = this.state
    const updatedList = passwordList.filter(e =>
      e.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    this.setState({passwordList: updatedList})
  }

  showPasswordToggle = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  render() {
    const {
      passwordList,
      websiteInput,
      userNameInput,
      passwordInput,
    } = this.state
    return (
      <div className="bg-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="upper-part-container">
          <form
            className="form-container"
            onSubmit={this.createAndSavePassword}
          >
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logos-style"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.websiteUpdate}
                value={websiteInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logos-style"
              />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.usernameUpdate}
                value={userNameInput}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logos-style"
              />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.passwordUpdate}
                value={passwordInput}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-background-image"
          />
        </div>
        <div className="lower-part-container">
          <div className="your-passwords-search-input-container">
            <div className="count-container">
              <h1 className="your-password">Your Passwords</h1>
              <p className="password-count">{passwordList.length.toString()}</p>
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-logos-style"
              />
              <input
                type="search"
                className="input"
                placeholder="Search"
                onChange={this.filteredList}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="check-box">
            <input
              type="checkbox"
              id="check"
              onClick={this.showPasswordToggle}
            />
            <label htmlFor="check" className="check-label">
              Show Passwords
            </label>
          </div>
          {this.showPasswordList()}
        </div>
      </div>
    )
  }
}

export default App
