
import React from "react";
import { Container } from "@/components/shared/container";
import {Title} from "@/components/shared/title";
import {fetchVehicleMakes} from "@/lib/api";
import FilterForm from "@/components/ui/filterForm";

export default async function Home() {
    const allMakes = await fetchVehicleMakes();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => currentYear - i);
    const isDataEmpty = !Array.isArray(allMakes) || allMakes.length <1 || !allMakes;

  return (
      <>
        <Container className="mt-5">
            <Title text="Car Dealer App" size="lg" className="font-extrabold text-center"/>

            {!isDataEmpty && (
                <FilterForm allMakes={allMakes} years={years}/>
            )}
        </Container>
      </>
  );
}
