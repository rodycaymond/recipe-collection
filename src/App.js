import './App.css';

import React from 'react';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isAddRecipeFormDisplayed: false,
      listItemName: [],
      instructions: [],
      recipe: '',
      inst: ''
    }
    this.handleRecipeName = this.handleRecipeName.bind(this)
    this.handleRecipeInstructions = this.handleRecipeInstructions.bind(this)
    this.submitRecipe = this.submitRecipe.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(){
    this.setState({
      isAddRecipeFormDisplayed: !this.state.isAddRecipeFormDisplayed
    })
  }
  handleRecipeName(event){
    event.preventDefault();
    this.setState({
      isAddRecipeFormDisplayed: this.state.isAddRecipeFormDisplayed,
      listItemName: this.state.listItemName,
      instructions: this.state.instructions,
      recipe: event.target.value,
      inst: this.state.inst
    })
  }
  handleRecipeInstructions(event){
    event.preventDefault();
    this.setState({
      isAddRecipeFormDisplayed: this.state.isAddRecipeFormDisplayed,
      listItemName: this.state.listItemName,
      instructions: this.state.instructions,
      recipe: this.state.recipe,
      inst: event.target.value
    })
  }

  submitRecipe(event){
    event.preventDefault()
    this.setState({
      isAddRecipeFormDisplayed: this.state.isAddRecipeFormDisplayed,
      listItemName: [...this.state.listItemName, this.state.recipe],
      instructions: [...this.state.instructions, this.state.inst],
      recipe: this.state.recipe,
      inst: this.state.isnt
    })
    console.log(this.state)
  }

  render(){
    const addNewRecipeForm = (
      <form id="recipe-form" onSubmit={this.submitRecipe}>
        <label htmlFor="newRecipeName">Recipe name: </label>
        <input type="text" id="newRecipeName" onChange={this.handleRecipeName} value={this.state.recipe} />
        <label htmlFor="newRecipeInstructions">Instructions:</label>
        <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." onChange={this.handleRecipeInstructions} value={this.state.inst}/>
        <input type="submit"/>
      </form>
    )

    return (
      <div className="App">
        <h1 className="App-header">My Recipes</h1>
        {
          this.state.isAddRecipeFormDisplayed
           ? addNewRecipeForm
          : <button id="add-recipe" onClick={this.handleClick}> Add Recipe</button>
        }
        {
          this.state.listItemName.length > 0 ?
          <RecipeList items={this.state}/>
          : <p>There are no recipes to list.</p>
        }
      </div>
    )
  }
}

function RecipeList(props){
  let listItems = props.items.listItemName.map((item,index)=>{
    return <li key={index}>{item}</li>
  })

  return (
    <ul>
      {listItems}
    </ul>
  )
}

export default App;