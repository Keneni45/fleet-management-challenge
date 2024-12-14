import { useEffect, useState } from "react";
import axios from "axios";

const VehicleStatus = () => {
  const initialVehicles = [];

  const [vehicles, setVehicles] = useState(initialVehicles);
  const [newVehicleName, setNewVehicleName] = useState("");
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({}); // Store status updates per vehicle

  // Fetch vehicles from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/vehicles").then((res) => setVehicles(res.data));
  }, []);

  // Add a new vehicle
  const addVehicle = () => {
    if (!newVehicleName) return;
    axios.post("http://localhost:5000/vehicles", { name: newVehicleName }).then((res) => {
      setVehicles((prev) => [...prev, res.data]);
      setNewVehicleName("");
    });
  };

  // Update vehicle status
  const updateStatus = (id) => {
    const newStatus = statusUpdates[id]; 
    if (!newStatus) return;

    axios.put(`http://localhost:5000/vehicles/${id}`, { status: newStatus }).then((res) => {
      setVehicles((prev) =>
        prev.map((v) =>
          v._id === id ? { ...v, status: res.data.status, lastUpdated: res.data.lastUpdated } : v
        )
      );
      setEditingVehicleId(null); 
      setStatusUpdates((prev) => ({ ...prev, [id]: "" })); 
    });
  };

  // Handle input change for status updates
  const handleStatusChange = (id, value) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: value })); 
  };

  // Handle editing a vehicle's status
  const handleEditClick = (id, status) => {
    setEditingVehicleId(id);
    setStatusUpdates((prev) => ({ ...prev, [id]: status })); 
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
                <td className="border border-gray-300 p-2">
                  {editingVehicleId === vehicle._id ? (
                    <input
                      type="text"
                      value={statusUpdates[vehicle._id] || ""}
                      onChange={(e) => handleStatusChange(vehicle._id, e.target.value)}
                      className="border border-gray-300 rounded-md p-1"
                    />
                  ) : (
                    vehicle.status
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(vehicle.lastUpdated).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingVehicleId === vehicle._id ? (
                    <button
                      onClick={() => updateStatus(vehicle._id)}
                      className="bg-green-500 text-white rounded-md px-4 py-1 hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(vehicle._id, vehicle.status)}
                      className="bg-yellow-500 text-white rounded-md px-4 py-1 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleStatus;
