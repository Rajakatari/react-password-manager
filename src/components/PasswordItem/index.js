import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isShowPassword, onDeletePassword} = props
  const {id, website, username, password} = passwordDetails
  const profile = website[0]

  const onDeletePasswordDetails = () => {
    onDeletePassword(id)
  }

  return (
    <li className="list-item">
      <p className="profile">{profile}</p>
      <div className="password-details">
        <p>{website}</p>
        <p>{username}</p>
        {isShowPassword ? (
          <p>{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars"
          />
        )}
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onDeletePasswordDetails}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordItem
