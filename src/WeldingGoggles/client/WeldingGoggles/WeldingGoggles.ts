import { getSearchMode, IsoPlayer, IsoGameCharacter, getPlayer, KahluaTable, _instanceof_, getScriptManager, Recipe } from "PipeWrench";
import { onClothingUpdated, onDisableSearchMode, onGameStart } from "PipeWrench-Events";
import { getGlobal } from "PipeWrench-Utils";

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
    if (search_mode.isOverride(playerNum)){
        search_mode.setOverride(playerNum, false);
    }
    if (search_mode.isEnabled(playerNum)){
        search_mode.setEnabled(playerNum, false);
    }
}

// Check if the client has goggles in their inventory and they are equipped
function checkWeldingGoggles(playerOrCharacter: IsoPlayer | IsoGameCharacter){
    // Check if the object is a player (hopefully bc checking the type itself wouldn't work)
    if (_instanceof_(playerOrCharacter, "IsoPlayer")){
        let player = playerOrCharacter as IsoPlayer;
        let playerInventory = player.getInventory();
        const SandboxVars = getGlobal<KahluaTable>("SandboxVars");
        const tintGoggles = SandboxVars.WeldingGoggles.GogglesTint;
        const tintMask = SandboxVars.WeldingGoggles.MaskTint;
        if(tintGoggles == true && playerInventory.contains('WeldingGoggles.WeldingGoggles')){
            let goggles = playerInventory.FindAll('WeldingGoggles.WeldingGoggles');
            for(let i=0; i<goggles.size(); i++){
                if (goggles.get(i).isEquipped()){
                    tintVision(player.getPlayerNum());
                    return;
                }
            }
        }
        if(tintMask == true && playerInventory.contains('Base.WeldingMask')){
            let mask = playerInventory.FindAll('Base.WeldingMask');
            for(let i=0; i<mask.size(); i++){
                if (mask.get(i).isEquipped()){
                    tintVision(player.getPlayerNum());
                    return;
                }
            }
        }
        unTintVision(player.getPlayerNum());
    }
}

// If the player entered search mode and is still wearing goggles, don't turn it off
function disableSearchModeOverride(player: IsoPlayer, isSearchMode : boolean){
    checkWeldingGoggles(player);
}

onGameStart.addListener(function(){
    const SandboxVars = getGlobal<KahluaTable>("SandboxVars");
    const tintGoggles = SandboxVars.WeldingGoggles.GogglesTint;
    const tintMask = SandboxVars.WeldingGoggles.MaskTint;
    if(tintGoggles || tintMask){
        checkWeldingGoggles(getPlayer())
        onDisableSearchMode.addListener(disableSearchModeOverride);
        onClothingUpdated.addListener(checkWeldingGoggles);
    }
});