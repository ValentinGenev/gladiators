import Tile from "../objects/Tile";

export default interface FieldObject {
    getTile(): Tile
    setTile(tile: Tile): void
}
