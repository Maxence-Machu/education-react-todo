import React, { Component } from 'react'

class TodoItem extends Component {


  render (){

    return (
      <article className={"TodoItem Priority-" + this.props.priority + (this.props.checked ? " Checked" : "")}>

        <div className="left">
          <input type="checkbox" onChange={() => this.props.checkTodo(this.props.id)} checked={this.props.checked}/>
        </div>

        <div className="content">
          <p>{this.props.title}</p>
        </div>

        <div className="right">
          <button onClick={() => this.props.deleteTodo(this.props.id)} className={"btn btn-delete"}>X</button>
        </div>
      </article>
    )
  }
}

export default TodoItem;