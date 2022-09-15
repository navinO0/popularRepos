import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem/index'
import RepositoryItem from '../RepositoryItem/index'
import './index.css'

const apiStatusConstraints = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    reposData: [],
    categoryType: 'ALL',
    apiStatus: apiStatusConstraints.initial,
  }

  componentDidMount() {
    this.getApiData()
  }

  getApiData = async () => {
    const {categoryType} = this.state
    this.setState({apiStatus: apiStatusConstraints.inProgress})
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${categoryType}`

    const response = await fetch(apiUrl)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.popular_repos.map(eachOne => ({
        id: eachOne.id,
        name: eachOne.name,
        issuesCount: eachOne.issues_count,
        forksCount: eachOne.forks_count,
        starsCount: eachOne.stars_count,
        avatarUrl: eachOne.avatar_url,
      }))
      this.setState({
        reposData: updatedData,
        apiStatus: apiStatusConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstraints.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  onClickCategory = category => {
    this.setState({categoryType: category}, this.getApiData)
  }

  renderRepositoriesListView = () => {
    const {reposData} = this.state
    return (
      <ul className="languages-list-container">
        {reposData.map(eachOne => (
          <RepositoryItem key={eachOne.id} eachOne={eachOne} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepositories = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstraints.success:
        return this.renderRepositoriesListView()
      case apiStatusConstraints.failure:
        return this.renderFailureView()
      case apiStatusConstraints.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {categoryType} = this.state

    return (
      <div className="main-container">
        <div className="heading-container">
          <h1 className="popular-heading">Popular</h1>
        </div>
        <ul className="language-filters-containers">
          {languageFiltersData.map(eachOne => (
            <LanguageFilterItem
              key={eachOne.id}
              onClickCategory={this.onClickCategory}
              categoryType={categoryType}
              eachOne={eachOne}
            />
          ))}
        </ul>
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
