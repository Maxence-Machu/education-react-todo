import React, { Component } from 'react'

class TodoForm extends Component {
  render(){
    return(
      <form onSubmit={this.props.onFormSubmit} className={'FormContainer'}>
        <input type="text" onChange={this.props.onChangeInput} value={this.props.valueInput} placeholder={"Texte de votre todo"}/>

        <select className={"btn"} name="select-priority" value={this.props.valueSelect} onChange={this.props.onChangeSelect}>
          <option value={1}>Haute</option>
          <option value={2}>Moyenne</option>
          <option value={3}>Basse</option>
        </select>
        <button className={"btn"} type={'submit'}>Ajouter</button>
      </form>
    )
  }
}
export default TodoForm;