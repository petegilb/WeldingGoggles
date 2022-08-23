import { getScriptManager, Recipe, ArrayList } from "PipeWrench";
import { onGameStart } from "PipeWrench-Events";

function editRecipes(){
    let allrecipes = getScriptManager().getAllRecipes();
    for (let i = 0; i < allrecipes.size(); i++) {
        let recipe = allrecipes.get(i) as Recipe;
        let recipe_sources = recipe.getSource() as ArrayList;
        // For each source -- check if there's a WeldingMask and no WeldingGoggles.WeldingGoggles
        for (let x = 0; x < recipe_sources.size(); x++) {
            let source = recipe_sources.get(x);
            let sourceItems = source.getItems();
            if (sourceItems.contains("Base.WeldingMask") && !(sourceItems.contains("WeldingGoggles.WeldingGoggles"))){
                sourceItems.add("WeldingGoggles.WeldingGoggles");
            }
        }
    }
}
onGameStart.addListener(editRecipes)