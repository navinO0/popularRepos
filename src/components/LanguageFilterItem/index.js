// Write your code here

import './index.css'

const LanguageFilterItem = props => {
  const {eachOne, onClickCategory, categoryType} = props
  const {language} = eachOne

  const clicked = () => {
    onClickCategory(language)
  }

  const isOn = () => {
    if (language === categoryType) {
      return 'clicked'
    }
    return 'not-clicked'
  }

  return (
    <button type="button" onClick={clicked} className={` ${isOn()}`}>
      <p className="language-item">{language}</p>
    </button>
  )
}
export default LanguageFilterItem
