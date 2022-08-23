require "BuildingObjects/ISBuildingObject"
local ISBuildingObject_tryBuild = ISBuildingObject.tryBuild

-- Overwrite the building object function to equip welding goggles and allow crafting
function ISBuildingObject:tryBuild(x,y,z)
    local playerObj = getSpecificPlayer(self.player)
    local playerInv = playerObj:getInventory()
    if (self.secondItem == "WeldingMask" and not playerInv:contains("WeldingMask")) then
        self.secondItem = "WeldingGoggles"
    end

    return ISBuildingObject_tryBuild(self, x, y, z)
end
