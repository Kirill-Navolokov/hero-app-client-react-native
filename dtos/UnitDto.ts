export interface UnitDto {
    id: string;
    name: string;
    description: string;
    type: number,
    foundationDate: string;
    imageUrl: string;
    socialNetworks?: {[type: number]: string}
}