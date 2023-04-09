import './index.css'

const EachTask = props => {
  const {eachTask} = props
  const {taskText, tags} = eachTask
  return (
    <li className="task_item_container">
      <p className="task_item_heading">{taskText}</p>

      <p className="tag_item_button"> {tags}</p>
    </li>
  )
}
export default EachTask
