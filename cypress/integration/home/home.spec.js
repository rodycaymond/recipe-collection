import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../../src/App.js';
// import "react-testing-library/cleanup-after-each";
import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect'; 



describe("Home page", () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it("header contains recipe heading with a message that there are no recipes", () => {
      cy.findByRole('heading').should('contain', 'My Recipes')
      cy.get('p')
        .findByText('There are no recipes to list.')
        .should('exist')
    })

    it("contains an add recipe button that when clicked opens a form", () => {
        cy.findByRole('button').click();
      
        cy.get('form')
          .findByRole('button')
          .should('exist')
      })
      it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () => {
        cy.findByRole('button').click();
        expect(cy.findByRole('textbox', {name: /Recipe name/i})).toExist()
        cy.findByRole('textbox', {name: /instructions/i}).should('exist')
      })
      it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
        const recipeName = 'Tofu Scramble Tacos';
        cy.findByRole('button').click()
        cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
        cy.findByRole('textbox', {name: /instructions/i}).type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas")
      
        return cy.findByRole('button').click()
          .then(() => {
          expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();
          })
      })
      it('typing in the recipe name makes the recipe name appear in the input', async () => {
        render(<App />);
      
        const recipeName = 'No pockets';
        userEvent.click(screen.getByText("Add Recipe"));
        await userEvent.type(screen.getByLabelText('Recipe name:'), recipeName);
      
        expect(screen.getByLabelText('Recipe name:').value).toEqual(recipeName);
      })

      const setup = () => {
        const app = render(<App />);
      
        userEvent.click(app.getByText('Add Recipe'));
      
        // Add the submit button to your setup method:
        const submitButton = app.getByRole('button')
        const instructionsInput = app.getByLabelText('Instructions:')
        const nameInput = app.getByLabelText('Recipe name:')
      
        return {
          instructionsInput,
          nameInput,
          submitButton,
          app
        }
      }
      
      it('recipe name from state appears in an unordered list', async () => {
        const {instructionsInput, nameInput, submitButton, app} = setup();
        const recipeName = "Lean Pockets"
        const recipeInstructions = "place in toaster oven on 350 for 45 minutes"
      
        userEvent.click(app.getByText('Add Recipe'));

        await userEvent.type(instructionsInput, recipeInstructions)
        await userEvent.type(nameInput, recipeName)
        userEvent.click(submitButton);
      
        // expect(screen.getByRole('listitem')).toExist();
        // expect(screen.getByText(recipeName)).toExist();
        expect(screen.getByRole('listitem')).toBeInTheDocument();
        expect(screen.getByText(recipeName)).toBeInTheDocument();
      })
  })

 