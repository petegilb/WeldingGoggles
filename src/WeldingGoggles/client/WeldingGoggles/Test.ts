import { getSpecificPlayer } from "PipeWrench";
import { everyTenMinutes } from "PipeWrench-Events";

function testFunction(){
    let player = getSpecificPlayer(0);
    player.Say('Hey bro :)');
}

everyTenMinutes.addListener(testFunction);