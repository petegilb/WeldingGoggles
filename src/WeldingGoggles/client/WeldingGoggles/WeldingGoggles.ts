import { getSearchMode, IsoPlayer, IsoGameCharacter, getPlayer } from "PipeWrench";
import { onClothingUpdated, onDisableSearchMode, onGameStart, onToggleSearchMode } from "PipeWrench-Events";

// If the player is wearing welding goggles tint their vision a bit
// Looked at the Blind Trait mod to create this method
function tintVision(playerNum:number){
    let search_mode = getSearchMode();
    
    let player_search_mode = search_mode.getSearchModeForPlayer(playerNum);
    let blur = player_search_mode.getBlur();
    blur.setExterior(.2);
    blur.setInterior(.2);
    let desat = player_search_mode.getDesat();
    desat.setExterior(.3);
    desat.setInterior(.3);
    let gradient = player_search_mode.getGradientWidth();
    gradient.setExterior(6);
    gradient.setInterior(6);
    let dark = player_search_mode.getDarkness();
    dark.setExterior(.5);
    dark.setInterior(.5);
    // Before adding this override the user could stop the effect by enabling/disabling search mode manually
    search_mode.setOverride(playerNum, true);
    search_mode.setEnabled(playerNum, true);
}

function unTintVision(playerNum:number){
    let search_mode = getSearchMode();
    search_mode.setOverride(playerNum, false);
    search_mode.setEnabled(playerNum, false);
}

// Check if the client has goggles in their inventory and they are equipped
function checkWeldingGoggles(playerOrCharacter: IsoPlayer | IsoGameCharacter){
    if (playerOrCharacter.getIsNPC() == false){
        let playerInventory = playerOrCharacter.getInventory();
        if(playerInventory.contains('WeldingGoggles.WeldingGoggles')){
            print('inventory contains welding goggles');
            let goggles = playerInventory.FindAll('WeldingGoggles.WeldingGoggles');
            for(let i=0; i<goggles.size(); i++){
                if (goggles.get(i).isEquipped()){
                    print('tinting vision!!');
                    tintVision(playerOrCharacter.getPlayerNum());
                    return;
                }
            }
        }
        unTintVision(playerOrCharacter.getPlayerNum());
    }
}

onClothingUpdated.addListener(checkWeldingGoggles);

// If the player entered search mode and is still wearing goggles, don't turn it off
function disableSearchModeOverride(player: IsoPlayer, isSearchMode : boolean){
    checkWeldingGoggles(player);
}

onDisableSearchMode.addListener(disableSearchModeOverride);
onGameStart.addListener(function(){checkWeldingGoggles(getPlayer())});