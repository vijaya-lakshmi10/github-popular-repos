// Write your code here
import './index.css'
const LanguageFilterItem=props=>{
    const {languageFilterDetails,isActiveLanguage,setActiveLanguageId}=props
    const {id,language}=languageFilterDetails
    const isActiveLanguageClassName=isActiveLanguage?'language-btn active-language-btn':'language-btn'
    const onClickActiveLanguage=()=>{
        setActiveLanguageId(id)
    }
    return(
        <li>
        <button className={isActiveLanguageClassName} type="button" onClick={onClickActiveLanguage}>{language}</button>
        </li>
    )
}
export default LanguageFilterItem

