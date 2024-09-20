import { fetchVehicleMakes, fetchVehiclesByMakeAndYear } from "@/lib/api";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { Suspense } from "react";
import { Loader } from "@/components/shared/loader";

interface ResultPageProps {
    params: {
        makeId: string;
        year: string;
    };
}

export const generateStaticParams = async () => {
    const makes = await fetchVehicleMakes();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => currentYear - i);

    const paths = makes.flatMap(make =>
        years.map(year => ({
            makeId: make.MakeId.toString(),
            year: year.toString(),
        }))
    );

    return paths;
};

export default async function ResultPage({ params }: ResultPageProps) {
    const { makeId, year } = params;

    const vehicles = await fetchVehiclesByMakeAndYear(makeId, year);
    const isDataEmpty = !Array.isArray(vehicles) || vehicles.length < 1;

    const vehicleName = !isDataEmpty ? vehicles[0].Make_Name : "No Vehicles";

    return (
        <Container className="mt-5">
            <Suspense fallback={<Loader />}>
                <Title text={`${vehicleName} in ${year}`} size="lg" className="font-extrabold text-center" />
                {isDataEmpty ? (
                    <p className="text-center mt-5">No vehicles found for this make and year.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {vehicles.map(vehicle => (
                            <div key={vehicle.Model_ID} className="border rounded-lg p-4 shadow">
                                <h3 className="font-bold text-xl mb-2">{vehicle.Model_Name}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </Suspense>
        </Container>
    );
}
