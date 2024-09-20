import { fetchVehicleMakes, fetchVehiclesByMakeAndYear } from "@/lib/api";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { Suspense } from "react";
import { Loader } from "@/components/shared/loader";
import {VehicleCard} from "@/components/ui/VehicleCard";

interface ResultPageProps {
    params: {
        makeId: string;
        year: string;
    };
}

export const generateStaticParams = async () => {
    try {
        const makes = await fetchVehicleMakes();
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => currentYear - i);

        const paths = makes.flatMap((make) =>
            years.map((year) => ({
                makeId: make.MakeId.toString(),
                year: year.toString(),
            }))
        );

        return paths;
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
};

export default async function ResultPage({ params }: ResultPageProps) {
    const { makeId, year } = params;

    let vehicles;
    let errorMessage = null;

    try {
        vehicles = await fetchVehiclesByMakeAndYear(makeId, year);
    } catch (err) {
        console.error("Error fetching vehicles:", err);
        errorMessage = "Failed to load vehicles. Please try again later.";
    }

    const isDataEmpty = !Array.isArray(vehicles) || vehicles.length < 1;

    if (errorMessage) {
        return (
            <Container className="mt-5">
                <Title text="Error" size="lg" className="font-extrabold text-center" />
                <p className="text-center mt-5 text-red-500">{errorMessage}</p>
            </Container>
        );
    }

    const vehicleName = !isDataEmpty && vehicles ? vehicles[0].Make_Name : "No Vehicles";

    return (
        <Container className="mt-5">
            <Suspense fallback={<Loader />}>
                <Title text={`${vehicleName} in ${year}`} size="lg" className="font-extrabold text-center" />
                {isDataEmpty ? (
                    <p className="text-center mt-5">No vehicles found for this make and year.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {vehicles?.map((vehicle) => (
                            <VehicleCard key={vehicle.Model_ID} modelId={vehicle.Model_ID} modelName={vehicle.Model_Name} />
                        ))}
                    </div>
                )}
            </Suspense>
        </Container>
    );
}
