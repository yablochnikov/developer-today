"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

interface FilterFormProps {
    allMakes: Array<{ MakeId: number; MakeName: string }>;
    years: number[];
}

const FilterForm: React.FC<FilterFormProps> = ({ allMakes, years }) => {
    const [selectedCarMake, setSelectedCarMake] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);

    const isNextButtonDisabled = !selectedCarMake || !selectedYear;

    return (
        <section className="flex justify-center items-center text-center mt-5 gap-5 flex-col">
            <Select onValueChange={(value) => setSelectedCarMake(value)}>
                <SelectTrigger className="w-[350px]">
                    <SelectValue placeholder="Car Make" />
                </SelectTrigger>
                <SelectContent>
                    {allMakes.map((make) => (
                        <SelectItem key={make.MakeId} value={make.MakeId.toString()}>
                            {make.MakeName}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedYear(value)}>
                <SelectTrigger className="w-[350px]">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Link
                href={isNextButtonDisabled ? "#" : `/result/${selectedCarMake}/${selectedYear}`}
                className={`block text-center py-3 px-6 text-white rounded-md ${
                    isNextButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                aria-disabled={isNextButtonDisabled}
            >
                Next
            </Link>
        </section>
    );
};

export default FilterForm;
