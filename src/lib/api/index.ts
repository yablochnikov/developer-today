import axios from 'axios';
import {GetMakesResponse, GetModelsResponse} from "@/lib/types";

export async function fetchVehicleMakes() {
    try {
        const response = await axios.get<GetMakesResponse>(process.env.NEXT_PUBLIC_VEHICLE_MAKES_URL!);
        return response.data.Results.map((make) => ({
            MakeId: make.MakeId,
            MakeName: make.MakeName,
            VehicleTypeId: make.VehicleTypeId,
            VehicleTypeName: make.VehicleTypeName,
        }));
    } catch (error) {
        console.error('Error fetching vehicle makes:', error);
        throw error;
    }
}

export async function fetchVehiclesByMakeAndYear(makeId: string, year: string) {
    try {
        const response = await axios.get<GetModelsResponse>(`${process.env.NEXT_PUBLIC_VEHICLE_MODELS_URL}${makeId}/modelyear/${year}?format=json`);
        console.log(response.data);
        return response.data.Results.map((vehicle) => ({
            Make_ID: vehicle.Make_ID,
            Make_Name: vehicle.Make_Name,
            Model_ID: vehicle.Model_ID,
            Model_Name: vehicle.Model_Name,
        }));
    } catch (error) {
        console.error('Error fetching vehicles by make and year:', error);
        throw error;
    }
}
