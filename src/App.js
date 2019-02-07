import React, { Component } from 'react';
import './App.css';
import TodoItem from './component/TodoItem'

class App extends Component {
  /*
  TODO Global
  1: Travailler le formulaire pour ajouter un t*do à la liste des TODOS
  2: Travailler le composant TodoItem pour qu'il affiche le titre du t*do
  3: Modifier le CSS pour avoir 3 thèmes de t*do en fonction de leur priorité
  4: Ajouter le champ Description (<textarea>) à la création d'un t*do

  BONUS
    5: Permettre de supprimer un t*do
    6: Permettre de checker un t*do
    7: Créer 3 listes de t*do différentes en fonction de la priorité
   */

  constructor (props){
    super(props);

    this.state = {
      todos : [
        {
          title: "Mon premier todo",
          checked: false,
          priority: 3,
          key: 0
        },{
          title: "Mon deuxième todo",
          checked: false,
          priority: 1,
          key: 1
        }
      ],
      textinput: '',
      priority: ''
    }
  }

  /*
  TODO:
  Fonctions à créer:
    onSubmitTodo()
    onSelectChange()
  */

  render() {
    return (
      <div className="App">
        <h1>Ma todolist en React <span role={"img"}>🚀</span></h1>
        <section className="TodoContainer">

          {
            this.state.todos.map(el => {
              return <TodoItem
                        title={el.title}
                        checked={el.checked}
                        priority={el.priority}/>
            })
          }
        </section>

        <div>
          <form onSubmit={'?'}>
            <input type="text" onChange={'?'} value={'?'} placeholder={"Texte de votre todo"}/>

            {/*TODO: Ajouter un select avec la priorité */}
            {/*TODO: Ajouter un bouton*/}
          </form>
        </div>
      </div>
    );
  }
}

export default App;
