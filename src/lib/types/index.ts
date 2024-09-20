export interface VehicleMake {
    MakeId: number;
    MakeName: string;
    VehicleTypeId: number;
    VehicleTypeName: string;
}

export interface GetMakesResponse {
    Results: VehicleMake[];
}

export interface VehicleModel {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

export interface GetModelsResponse {
    Results: VehicleModel[];
}
