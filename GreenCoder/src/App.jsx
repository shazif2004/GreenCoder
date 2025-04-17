import React, { useState } from "react";
import "./Styles.css";

// Ingredient nutritional data
const ingredientNutrition = {
    chicken: { calories: 200, protein: 20, carbs: 0, fat: 5 },
    lettuce: { calories: 10, protein: 1, carbs: 2, fat: 0 },
    tomato: { calories: 20, protein: 1, carbs: 4, fat: 0 },
    onion: { calories: 40, protein: 1, carbs: 9, fat: 0 },
    cheese: { calories: 100, protein: 5, carbs: 1, fat: 9 },
    avocado: { calories: 160, protein: 2, carbs: 9, fat: 15 },
    bacon: { calories: 42, protein: 3, carbs: 0, fat: 3 },
    bread: { calories: 80, protein: 2, carbs: 15, fat: 1 },
    lettuceWrap: { calories: 5, protein: 1, carbs: 1, fat: 0 },
    tomatoSauce: { calories: 30, protein: 1, carbs: 7, fat: 0 },
    mustard: { calories: 10, protein: 0, carbs: 1, fat: 0 },
    pickle: { calories: 5, protein: 0, carbs: 1, fat: 0 }
};

// Recipe data
const recipes = [
    {
        name: "Chicken Salad",
        ingredients: ["chicken", "lettuce", "tomato"],
        instructions: [
            "Grill the chicken",
            "Chop the veggies",
            "Mix together"
        ]
    },
    {
        name: "Chicken Sandwich",
        ingredients: ["chicken", "bread", "lettuce", "tomato", "cheese"],
        instructions: [
            "Grill the chicken",
            "Toast the bread",
            "Assemble the sandwich with lettuce, tomato, and cheese"
        ]
    },
    {
        name: "BLT Sandwich",
        ingredients: ["bacon", "lettuce", "tomato", "bread"],
        instructions: [
            "Cook the bacon",
            "Toast the bread",
            "Assemble the sandwich with bacon, lettuce, and tomato"
        ]
    },
    {
        name: "Avocado Toast",
        ingredients: ["avocado", "bread", "tomato"],
        instructions: [
            "Toast the bread",
            "Mash the avocado and spread it on the toast",
            "Top with sliced tomato"
        ]
    },
    {
        name: "Chicken Lettuce Wraps",
        ingredients: ["chicken", "lettuceWrap", "onion", "tomato", "bacon"],
        instructions: [
            "Grill the chicken",
            "Chop the onion and tomato",
            "Assemble in lettuce wraps with bacon"
        ]
    },
    {
        name: "Cheeseburger",
        ingredients: ["beefPatty", "lettuce", "tomato", "cheese", "bread", "pickle"],
        instructions: [
            "Grill the beef patty",
            "Toast the bread",
            "Assemble with lettuce, tomato, cheese, and pickle"
        ]
    }
];

// Function to calculate nutritional information for a recipe
function calculateNutrition(ingredients) {
    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;

    ingredients.forEach(ingredient => {
        if (ingredientNutrition[ingredient]) {
            const nutrition = ingredientNutrition[ingredient];
            totalCalories += nutrition.calories;
            totalProtein += nutrition.protein;
            totalCarbs += nutrition.carbs;
            totalFat += nutrition.fat;
        }
    });

    return {
        calories: `${totalCalories} kcal`,
        protein: `${totalProtein}g`,
        carbs: `${totalCarbs}g`,
        fat: `${totalFat}g`
    };
}

// Function to find recipes based on user ingredients
function findRecipes(userIngredients) {
    const availableIngredients = userIngredients.map(i => i.toLowerCase());

    console.log("User Ingredients:", availableIngredients); // Debugging log

    return recipes.filter(recipe => {
        const match = recipe.ingredients.every(ingredient =>
            availableIngredients.includes(ingredient)
        );
        console.log(`Recipe: ${recipe.name}, Match: ${match}`); // Debugging log
        return match;
    });
}

function App() {
    const [fridgeItems, setFridgeItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [recipesList, setRecipesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Adding ingredients to fridge
    const addItem = () => {
        if (newItem.trim() && !fridgeItems.includes(newItem.trim())) {
            setFridgeItems([...fridgeItems, newItem.trim().toLowerCase()]);
            setNewItem('');
        }
    };

    // Removing ingredients from fridge
    const removeItem = (item) => {
        setFridgeItems(fridgeItems.filter(i => i !== item));
    };

    // Finding recipes based on available ingredients
    const findRecipesHandler = () => {
        if (fridgeItems.length === 0) {
            alert("Please add some ingredients!");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const matchedRecipes = findRecipes(fridgeItems);
            console.log("Matched Recipes:", matchedRecipes); // Debugging log
            setRecipesList(matchedRecipes);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="app-container">
            <h1>Fridge to Feast: Reduce Food Waste</h1>

            <div className="input-section">
                <input 
                    type="text" 
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter an ingredient"
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
                <button onClick={addItem}>Add Item</button>
            </div>

            <div className="fridge-list">
                {fridgeItems.map(item => (
                    <div key={item} className="fridge-item">
                        {item}
                        <button onClick={() => removeItem(item)}>×</button>
                    </div>
                ))}
            </div>

            <button onClick={findRecipesHandler} disabled={isLoading}>
                {isLoading ? 'Searching Recipes...' : 'Find Recipes'}
            </button>

            {recipesList.map((recipe, index) => (
                <div key={index} className="recipe-card">
                    <h3>{recipe.name}</h3>
                    <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                    <p><strong>Instructions:</strong></p>
                    <ol>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
                    <p><strong>Nutritional Information:</strong></p>
                    <p>Calories: {calculateNutrition(recipe.ingredients).calories}</p>
                    <p>Protein: {calculateNutrition(recipe.ingredients).protein}</p>
                    <p>Carbs: {calculateNutrition(recipe.ingredients).carbs}</p>
                    <p>Fat: {calculateNutrition(recipe.ingredients).fat}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
