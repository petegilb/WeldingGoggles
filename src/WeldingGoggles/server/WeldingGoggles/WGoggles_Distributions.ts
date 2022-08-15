import { KahluaTable } from "PipeWrench"
import { getGlobal } from "PipeWrench-Utils"

const ProceduralDistributions = getGlobal<KahluaTable>("ProceduralDistributions")

// Add it to the same parts of the distribution table as the WeldingMask
table.insert(ProceduralDistributions.list.ArmyHangarOutfit.items, "WeldingGoggles.WeldingGoggles");
table.insert(ProceduralDistributions.list.ArmyHangarOutfit.items, 1);

table.insert(ProceduralDistributions.list.CrateMetalwork.items, "WeldingGoggles.WeldingGoggles");
table.insert(ProceduralDistributions.list.CrateMetalwork.items, 2);

table.insert(ProceduralDistributions.list.CrateRandomJunk.items, "WeldingGoggles.WeldingGoggles");
table.insert(ProceduralDistributions.list.CrateRandomJunk.items, 0.6);

table.insert(ProceduralDistributions.list.GarageMetalwork.items, "WeldingGoggles.WeldingGoggles");
table.insert(ProceduralDistributions.list.GarageMetalwork.items, 4);

table.insert(ProceduralDistributions.list.MechanicShelfOutfit.items, "WeldingGoggles.WeldingGoggles");
table.insert(ProceduralDistributions.list.MechanicShelfOutfit.items, 5);

table.insert(ProceduralDistributions.list.MetalShopTools.items, "WeldingGoggles.WeldingGoggles");
table.insert(ProceduralDistributions.list.MetalShopTools.items, 3);

table.insert(ProceduralDistributions.list.ToolStoreAccessories.items, "WeldingGoggles.WeldingGoggles");
table.insert(ProceduralDistributions.list.ToolStoreAccessories.items, 3);

table.insert(ProceduralDistributions.list.ToolStoreMetalwork.items, "WeldingGoggles.WeldingGoggles");
table.insert(ProceduralDistributions.list.ToolStoreMetalwork.items, 2);