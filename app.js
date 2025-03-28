function suggestIngredientCombinations(ingredient) {
    if (validIngredientPairs[ingredient]) {
        return `Here are some suggestions for combinations with ${ingredient}: ${validIngredientPairs[ingredient].join(", ")}.`;
    }
    return `No suggestions found for ${ingredient}. Try another ingredient.`;
}

const ingredient = "mushroom";
console.log(suggestIngredientCombinations(ingredient));



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

            return recipes.filter(recipe => 
                recipe.ingredients.every(ingredient => availableIngredients.includes(ingredient))
            );
        }

        function App() {
            const [fridgeItems, setFridgeItems] = React.useState([]);
            const [newItem, setNewItem] = React.useState('');
            const [recipesList, setRecipesList] = React.useState([]);
            const [isLoading, setIsLoading] = React.useState(false);

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
