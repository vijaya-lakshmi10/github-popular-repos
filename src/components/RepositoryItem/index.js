// Write your code here
import './index.css'
const RepositoryItem=props=>{
    const {repositoryItemDetails}=props
    const {name,imageUrl,issuesCount,forksCount,starsCount}=repositoryItemDetails
    return(
        <li className="repository-items-list">
        <img src={imageUrl} alt={name} className="respository-item-img"/>
        <h1 className="name-heading">{name}</h1>
        <div className="row">
        <img src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png" alt="stars" className="images"/>
        <p className="text">{starsCount} stars</p>
        </div>
        <div className="row">
        <img src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png" alt="forks" className="images"/>
        <p className="text">{forksCount} forks</p>
        </div>
        <div className="row">
        <img src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png" alt="open issues" className="images"/>
        <p className="text">{issuesCount} open issues</p>
        </div>
        </li>
    )
}
export default RepositoryItem