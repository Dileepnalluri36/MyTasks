import './index.css'
import {useState} from 'react'

const EachTag = props => {
  const {eachTag, filterTags} = props
  const {optionId, displayText} = eachTag
  const [active, setActive] = useState(false)

  const isActive = active ? 'active-bg' : ''
  const changeStatus = () => {
    setActive(prevState => !prevState)
    filterTags(optionId)
  }

  return (
    <li className={`eachTag_display ${isActive}`}>
      <button onClick={changeStatus} className="tags_button" type="button">
        {displayText}
      </button>
    </li>
  )
}
export default EachTag
