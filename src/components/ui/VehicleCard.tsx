interface VehicleCardProps {
    modelId: number;
    modelName: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ modelId, modelName }) => {
    return (
        <div key={modelId} className="border rounded-lg p-4 shadow">
            <h3 className="font-bold text-xl mb-2">{modelName}</h3>
        </div>
    );
};
