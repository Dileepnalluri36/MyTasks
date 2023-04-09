/* eslint-disable no-alert */
import './index.css'
import {v4 as uuidv4} from 'uuid'
import {Component} from 'react'
import EachTag from '../EachTag'
import EachTask from '../EachTask'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskText: '',
    tags: tagsList[0].displayText,
    tasksList: [],
    filterTags: [],
  }

  updateTaskText = event => {
    this.setState({taskText: event.target.value})
  }

  updateTagsText = event => {
    this.setState({tags: event.target.value})
  }

  addNewTask = event => {
    const {taskText, tags} = this.state
    event.preventDefault()
    if (taskText.length === 0) {
      alert('Please enter some task')
    } else {
      const newTask = {
        id: uuidv4(),
        taskText,
        tags,
      }
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        taskText: '',
        tags: tagsList[0].displayText,
      }))
    }
  }

  filterTags = optionId => {
    const {filterTags} = this.state
    const isAvailable = filterTags.includes(optionId)
    if (!isAvailable) {
      this.setState(prevState => ({
        filterTags: [...prevState.filterTags, optionId],
      }))
    } else {
      const updatedTags = filterTags.filter(eachTag => eachTag !== optionId)
      this.setState({filterTags: updatedTags})
    }
  }

  render() {
    const {taskText, tags, baseIndex, tasksList, filterTags} = this.state
    const filteredTasksList = tasksList.filter(eachTag =>
      filterTags.includes(eachTag.tags.toUpperCase()),
    )

    return (
      <div className="main_container">
        <div className="task_container">
          <h1 className="main_heading">Create a task!</h1>
          <form onSubmit={this.addNewTask} className="form_container">
            <div className="label_div">
              <label htmlFor="task">Task</label>
              <input
                value={taskText}
                onChange={this.updateTaskText}
                className="text_box"
                placeholder="Enter the task here"
                type="text"
                id="task"
              />
            </div>
            <div className="label_div">
              <label htmlFor="tags">Tags</label>
              <select
                value={tags}
                onChange={this.updateTagsText}
                className="tags_list"
                id="tags"
              >
                {tagsList.map((eachTag, index) => (
                  <option
                    defaultValue={index === {baseIndex}}
                    key={eachTag.optionId}
                    value={eachTag.displayText}
                    id={eachTag.optionId}
                  >
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button className="add_task_button" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="display_tasks_container">
          <h1 className="tags_heading">Tags</h1>
          <ul className="display_tags_list">
            {tagsList.map(eachTag => (
              <EachTag
                filterTags={this.filterTags}
                key={eachTag.optionId}
                eachTag={eachTag}
              />
            ))}
          </ul>
          <h1 className="tags_heading">Tasks</h1>
          <ul className="display_tasks_list">
            {filterTags.length === 0 && tasksList.length === 0 && (
              <p className="NoTasks">No Tasks Added Yet</p>
            )}
            {filterTags.length !== 0 && filteredTasksList.length === 0 && (
              <p className="NoTasks">No Tasks Added Yet</p>
            )}

            {filterTags.length === 0
              ? tasksList.map(eachTask => (
                  <EachTask key={eachTask.id} eachTask={eachTask} />
                ))
              : filteredTasksList.map(eachTask => (
                  <EachTask key={eachTask.id} eachTask={eachTask} />
                ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default MyTasks
