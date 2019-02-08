import React, { Component } from 'react';
import './App.css';
import TodoItem from './component/TodoItem'
import TodoForm from './component/TodoForm'

class App extends Component {
  constructor (props){
    super(props);

    /*
    L'état par défaut de l'application est initialité
     */
    this.state = {
      // Les dodos sont vides
      todos : [],
      // La valeur du champ input est vide
      valueInput: '',
      // La priorité sélectionnée par défaut est "basse" = 3
      valueSelect: 3
    }
  }

  /*
  Exécuté au chargement de notre application
  Permet de récupérer l'historique des todos (en local / cache)
   */
  componentWillMount(){
    // Récupération dans le LocalStorage des todos (si il y en a)
    let localStorageTodos = localStorage.getItem('todos');
    // Transformation de la chaine de caractères récupérée en objet javascript
    // avec JSON.parse(...)
    localStorageTodos = JSON.parse(localStorageTodos);

    // Si on ne récupère rien, on crée un tableau vide
    if(localStorageTodos == null) {localStorageTodos = []}

    // On modifie l'état de l'application
    this.setState({todos: localStorageTodos})
  }

  /*
  Permet de supprimer un _todo
  Le paramètre est "key" cela correspond à un identifiant unique
   */
  deleteTodo = (key) => {
    let currentTodos = this.state.todos;

    // La fonction filter permet de récupérer les todos qui correspondent à la sélection
    // Elle permet ici de retirer l'object qui a l'ID correspondant
    let toDelete = currentTodos.filter(
      (el) => {
        return el.key !== key
      }
    )

    // On modifie l'état de l'application avec le nouveau tableau
    this.setState({todos: toDelete});

    // On appelle la fonction saveLocalStorage pour sauvegarder dans le local le nouveau tableau de _todos
    this.saveLocalStorage(toDelete)
  }

  /*
  Permet de checker / déchecker un _todo dans le tableau
  Prend en paramètre l'identifiant unique du _todo en question ainsi que la valeur de checked (true / false)
   */
  checkTodo = (key, checked) => {
    let currentTodos = this.state.todos;

    // 1. On boucle dans le tableau
    // 2. Si on trouve un item dont key est égal à key passé en paramètres
    // 3. Alors on modifie sa valeur de key
    for(let i = 0; i < currentTodos.length; i++) {
      if(currentTodos[i].key === key){
        currentTodos[i].checked = checked;
      }
    }

    // On modifie l'état de l'application avec le nouveau tableau
    this.setState({todos: currentTodos});

    // On appelle la fonction saveLocalStorage pour sauvegarder dans le local le nouveau tableau de _todos
    this.saveLocalStorage(currentTodos);
  }

  /*
  Permet de sauvegarder dans le localStorage le tableau de todos
  */
  saveLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  /* Fonction de modificaiton du champ <select>*/
  onChangeSelect = (event) => {
    this.setState({valueSelect: event.target.value})
  }

  /* Fonction de modificaiton du champ <input>*/
  onChangeInput = (event) => {
    this.setState({valueInput: event.target.value})
  }

  /*
  Fonction appelée quand le formulaire est "submit"
   */
  onFormSubmit = (event) => {
    // On crée un nouvel objet _todo avec ses données
    let newTodo = {
      title: this.state.valueInput,
      checked: false,
      priority: this.state.valueSelect,
      // Key est l'identidiant unique de notre _todo
      // Afin d'avoir un identifiant facilement exploitable
      // On utilise Data.now() (date sous form de timestamp)
      // == 1549629762556 par exemple
      key: Date.now()
    }

    // On récupère tous les todos actuellement dans l'état de l'application
    let todos = this.state.todos;
    // On y ajoute celui que l'on a crée plus haut
    todos.push(newTodo);

    // On peut maintenant modifier l'état de l'application
    // avec le nouveau tableau de todos
    // en réinitialisant le champ valueInput
    // en réinitialisant le chanp valueSelect
    this.setState({todos: todos, valueInput: '', valueSelect: 3});

    // On appelle la fonction saveLocalStorage pour sauvegarder dans le local le nouveau tableau de _todos
    this.saveLocalStorage(todos);

    // Permet d'éviter de recharger la page
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <h1 className={"display-4"}>Ma todolist <span role={"img"} aria-label="emoji">🚀</span></h1>
        <h5 className={""}>avec React.js</h5>

        {
          /* Première section avec les todos de priorité 1 (haute) */
        }
        <section className="TodoContainer">
          <h2 className={"text-1"}>Priorité haute</h2>
          {
            this.state.todos.map(el => {
              // Si l'élément a comme priorité 1
              // alors on affiche un <TodoItem/>
              // Sinon rien
              if(el.priority == 1) {
                return <TodoItem
                  key={el.key}
                  id={el.key}
                  deleteTodo={this.deleteTodo}
                  checkTodo={this.checkTodo}
                  title={el.title}
                  checked={el.checked}
                  priority={el.priority}/>
              }
            })
          }
        </section>

        {
          /* Deuxième section avec les todos de priorité 2 (moyenne) */
        }
        <section className="TodoContainer">
          <h2 className={"text-2"}>Priorité moyenne</h2>
          {
            this.state.todos.map(el => {
              // Si l'élément a comme priorité 2
              // alors on affiche un <TodoItem/>
              // Sinon rien
              if(el.priority == 2) {
                return <TodoItem
                  key={el.key}
                  id={el.key}
                  deleteTodo={this.deleteTodo}
                  checkTodo={this.checkTodo}
                  title={el.title}
                  checked={el.checked}
                  priority={el.priority}/>
              }
            })
          }
        </section>

        {
          /* Deuxième section avec les todos de priorité 2 (moyenne) */
        }
        <section className="TodoContainer">
          <h2 className={"text-3"}>Priorité basse</h2>
          {
            this.state.todos.map(el => {
              // Si l'élément a comme priorité 3
              // alors on affiche un <TodoItem/>
              // Sinon rien
              if(el.priority == 3) {
                return <TodoItem
                  key={el.key}
                  id={el.key}
                  deleteTodo={this.deleteTodo}
                  checkTodo={this.checkTodo}
                  title={el.title}
                  checked={el.checked}
                  priority={el.priority}/>
              }
            })
          }
        </section>

        {/*
          Composant séparé pour le formulaire
          Il a besoin des fonctions relatives à ses <select> <input>
          Il a aussi besoin de la fonction qui est exécutée au sumbit du formulaire
          Ainsi que les valeurs valueInput et valueSelect
        */}
        <TodoForm
          onFormSubmit={this.onFormSubmit}
          onChangeInput={this.onChangeInput}
          onChangeSelect={this.onChangeSelect}
          valueInput={this.state.valueInput}
          valueSelect={this.state.valueSelect}
        />
      </div>
    );
  }
}

export default App;
