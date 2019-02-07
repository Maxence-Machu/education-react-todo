import React, { Component } from 'react'

class TodoItem extends Component {

  render (){
    return (
      <article className={"TodoItem Priority-" + this.props.priority}>
        {/* Ici le titre */}
      </article>
    )
  }
}

export default TodoItem;