import './index.css'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
// Write your code here
const apiStatusConstants={
  initial:'INITIAL',
  success:'SUCCESS',
  failure:'FAILURE',
  inProgress:'IN_PROGRESS',
}
class GithubPopularRepos extends Component{
  state={apiStatus:apiStatusConstants.initial,
  repositoriesList:[],
  activeLanguageFilterId:languageFiltersData[0].id}

  componentDidMount(){
    this.getRepositories()
  }

  getRepositories=async()=>{
    const {activeLanguageFilterId}=this.state
    this.setState({apiStatus:apiStatusConstants.inProgress})
    const apiUrl=`https://apis.ccbp.in/popular-repos?language=${activeLanguageFilterId}`
    const response = await fetch(apiUrl)
    if(response.ok===true){
      const fetchedData=await response.json()
      const newData=fetchedData.popular_repos.map(eachItem=>({
        id:eachItem.id,
        name:eachItem.name,
        issuesCount:eachItem.issues_count,
        forksCount:eachItem.forks_count,
        starsCount:eachItem.stars_count,
        imageUrl:eachItem.avatar_url,
      }))
      this.setState({repositoriesList:newData,
      apiStatus:apiStatusConstants.success,})
    }
    else{
      this.setState({apiStatus:apiStatusConstants.failure,})
    }
  }

  displayLoadingView=()=>(
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  displaySuccessView=()=>{
    const {repositoriesList}=this.state
    return(
      <ul className="repositories-list">
      {repositoriesList.map(each=>(
        <RepositoryItem key={each.id} repositoryItemDetails={each}/>
      ))}
      </ul>
    )
  }

  displayFailureView=()=>{
    <div className="failure-view-container">
    <img src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png" alt="failure view" className="failure-img"/>
    <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  }

  displayRepositoriesList=()=>{
    const {apiStatus}=this.state
    switch(apiStatus){
      case apiStatusConstants.success:
          return this.displaySuccessView()
      case apiStatusConstants.failure:
          return this.displayFailureView()
      case apiStatusConstants.inProgress:
          return this.displayLoadingView()
      default:
          return null
    }
  }
  
  setActiveLanguageId=newId=>{
    this.setState({activeLanguageFilterId:newId}, this.getRepositories)
  }

  displayLanguageFiltersList=()=>{
    const {activeLanguageFilterId}=this.state
    return(
      <ul className="languages-list">
      {languageFiltersData.map(eachLanguage=>(
        <LanguageFilterItem key={eachLanguage.id} languageFilterDetails={eachLanguage} setActiveLanguageId={this.setActiveLanguageId}
        isActiveLanguage={eachLanguage.id===activeLanguageFilterId}/>
      ))}
      </ul>
    )
  }

  render(){
    return(
      <div className="main-conatiner">
      <div className="sub-container">
      <h1 className="main-heading">Popular</h1>
      {this.displayLanguageFiltersList()}
      {this.displayRepositoriesList()}
      </div>
      </div>
    )
  }
}
export default GithubPopularRepos
