// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachOne} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = eachOne
  return (
    <li className="list-item-container">
      <img src={avatarUrl} alt="name" className="laguage-card-img" />
      <h1 className="language-name">{name}</h1>
      <div className="details-container">
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="language-category-img"
          />
          <p className="count-item">{starsCount}</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="language-category-img"
          />
          <p className="count-item">{forksCount}</p>
        </div>
        <div className="stars-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="language-category-img"
          />
          <p className="count-item">{issuesCount}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
