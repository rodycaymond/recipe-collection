import './App.css';

import React from 'react';
import { useState } from 'react';

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
  let listItems = [];
  for (let i=0; i<props.items.listItemName.length; i++){
    let obj = {};
    obj.name = props.items.listItemName[i];
    obj.instructions = props.items.instructions[i];
    listItems.push(obj);
  }
  console.log(listItems)
  let finalList = listItems.map((item,index)=>{
    return <Recipe style={{border: '2px solid black', margin: '5px 0px'}} info={item} />
  })

  return (
    <ul >
      {finalList}
    </ul>
  )
}

function Recipe(props){
   const [styleSettings, setStyle] = useState({display: 'none'});
   const [input, setInput] = useState({display: 'none'})
   const [recipeName, setRecipeName] = useState(props.info.name);
   const [instName, setInstName] = useState(props.info.instructions);

   function handleEdit(){
    setInput({display: 'initial'});
   }
   function handleSave(){
     setInput({display: 'none'});
   }
   function handleInstructions(){
     if (styleSettings.display === 'none'){
       setStyle({display: 'initial'});
     } else {
       setStyle({display: 'none'})
     }
   }
  return (
    <ul>
      <button onClick={handleEdit}>Edit</button><button style={input} onClick={handleSave}>Save</button>
      <li onClick={handleInstructions} >{recipeName}</li>
      <input onChange={(event)=>setRecipeName(event.target.value)} style={input} value={recipeName} placeholder="new recipe name"></input><br></br>
      <p style={styleSettings}>{instName}</p><br></br>
      <input onChange={(event)=>setInstName(event.target.value)} style={input} value={instName} placeholder="new instructions"></input>
    </ul>
  )
}

export default App;