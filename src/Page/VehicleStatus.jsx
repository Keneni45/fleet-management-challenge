import { useEffect, useState } from "react";
const VehicleStatus=()=>{
    const initialVehicles= [
        { _id: "1", name: "Truck 1", status: "Active", lastUpdated: new Date().toISOString() },
        { _id: "2", name: "Van 1", status: "Inactive", lastUpdated: new Date().toISOString() },
        { _id: "3", name: "Car 1", status: "Active", lastUpdated: new Date().toISOString() },
      ];
      const [vehicles, setVehicles] = useState(initialVehicles);
      const [newVehicleName, setNewVehicleName] = useState("");
      const [statusUpdate, setStatusUpdate] = useState("");
      const [editingVehicleId, setEditingVehicleId] = useState(null);
    
      // Simulate fetch vehicles from the backend
      useEffect(() => {
        setVehicles(initialVehicles);
      }, []);

        // Add a new vehicle (simulating adding to the backend)
  const addVehicle = () => {
    if (!newVehicleName) return;
    const newVehicle = {
      _id: (vehicles.length + 1).toString(), // Simulate an auto-incrementing ID
      name: newVehicleName,
      status: "Inactive",
      lastUpdated: new Date().toISOString(),
    };
    setVehicles((prev) => [...prev, newVehicle]);
    setNewVehicleName(""); // Reset the input field
  };

  // Update vehicle status (simulating backend update)
  const updateStatus = (id) => {
    if (!statusUpdate) return;
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle._id === id
          ? { ...vehicle, status: statusUpdate, lastUpdated: new Date().toISOString() }
          : vehicle
      )
    );
    setEditingVehicleId(null);
    setStatusUpdate(""); // Reset the input field
  };
    // Handle editing a vehicle's status
    const handleEditClick = (id, status) => {
        setEditingVehicleId(id);
        setStatusUpdate(status); // Pre-fill the input with the current status
      };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>

        {/* Add Vehicle */}
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={newVehicleName}
            onChange={(e) => setNewVehicleName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 flex-grow"
          />
          <button
            onClick={addVehicle}
            className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2 hover:bg-blue-600"
          >
            Add Vehicle
          </button>
        </div>

        {/* Vehicle Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Vehicle Name</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Last Updated</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id}>
                <td className="border border-gray-300 p-2">{vehicle.name}</td>
                <td className="border border-gray-300 p-2">{vehicle.status}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(vehicle.lastUpdated).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="New Status"
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="border border-gray-300 rounded-md p-1"
                  />
                  <button
                    onClick={() => updateStatus(vehicle._id)}
                    className="bg-green-500 text-white rounded-md px-4 py-1 ml-2 hover:bg-green-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default VehicleStatus