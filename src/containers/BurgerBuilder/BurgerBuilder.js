import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// salad more expensive than cheese?!
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    

    /**
     * i believe you should add more abstraction to your ingredients-object
     * 
     * what about:
     * 
     * class Ingredient {
     *      // @NOTE count could be ommited 0 by default
     *      constructor(name, type, price, count = 0) {
     *          this.name = name;
     *          this.type = type;
     *          this.price = price;
     *          this.count = count;
     *      }
     * 
     *      increment() {
     *          this.count += 1;
     *      }
     * 
     *      decrement() {
     *          this.count -= 1;
     *      }
     * }
     * 
     * 
     * and then
     * 
     * ingredients: {
     *    salad: new Ingredient('Salad', 'salad', 0.5)
     *    // ...
     * 
     * and then you dont need controls from 'BuildControls`
     * 
     * in `addIngredientHandler` use `increment` method
     * in `removeIngredientHandler` use `decrement`
     */
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    /**
     * you can (and should) get ingredients from state - that is state for
     * know why you passed it here because just read `removeIngredientHandler` and `addIngredientHandler`
     * try to refactor `removeIngredientHandler` and `addIngredientHandler` in that way i commented in line :74
     */
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            // dont be afraid of longer names `ingredientKey`
            // but here you wand Object.values :)
            .map( igKey => {
                return ingredients[igKey];
            } )
            /**
             *  you can merge this map and reduce. Reduce is definetely most powerfull than map
             * Object.values(indredients).reduce((sum, indredientCount) => sum + indredientCount, 0)
             */
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // it is copy of ingredients, not updated
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    /**
     * `removeIngredientHandler` and `addIngredientHandler` are almost same
     * try to define another method - update price
     */

    /**
     * 
     * https://en.reactjs.org/docs/react-component.html#setstate - remember that setState have callback - called after state update (state is updating asynchronously)
     * this.setState(({ ingredients }) => ({
     *    ...ingredients,
     *    [type]: ingredients[type] + 1
     * }), this.updatePurchaseState)
     * 
     * its simply:
     * 1. `=> ({  })` means => { return { }; }
     * 
     * 2. ...ingredients - spreading all old values
     * 
     * 3. [type]: ingredients[type] + 1
     * [type] - returns string from `type` for object-notation, so we copy all walues and update only that one from type
     * 
     * 4. }), this.updatePurchaseState)
     * it's callback -> called after state update
     */
    removeIngredientHandler = ( type ) => {
        const oldCount = this.state.ingredients[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('Your order is on it\'s way now!');
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        /**
         * its not necessary, just pass ingredients into BuildControls and in 
         * 
         * from:
         * disabled={props.disabled[ctrl.type]} />
         * 
         * to:
         * controls.map((ctrl, index) => (
         * // ...
         *      disabled={props.ingredients[index] <= 0} />
         */
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
       
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;