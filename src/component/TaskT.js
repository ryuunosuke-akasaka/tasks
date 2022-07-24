import Tasks from "./Tasks"


const TaskT = ({task, onDelete,onToggle}) => {
  return (
    <>{task.map((task) => (
        <Tasks key={task.id} task={task}
        onDelete={onDelete} 
        onToggle={onToggle}
        />
    ))}</>
  )
}

export default TaskT