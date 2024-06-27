import React, { useState } from "react";

const SellRecordsTable = () => {
  const [livestockData, setLivestockData] = useState([]);
  const [editMobId, setEditMobId] = useState(null);

  const handleAddMob = () => {
    const id = livestockData.length + 1;
    const newMob = {
      id,
      animal: "",
      family: "",
      weight: "",
      gender: "",
      age: "",
      vaccine: "",
      sellPrice: "", // New sell price field
      status: "Belum Terjual",
    };
    setLivestockData([...livestockData, newMob]);
    setEditMobId(id);
  };

  const handleEditMob = (id) => {
    setEditMobId(id);
  };

  const handleSaveMob = (id) => {
    const updatedData = livestockData.map((mob) =>
      mob.id === id
        ? {
            ...mob,
            status: "Terjual",
            sellDate: new Date().toLocaleDateString(),
          }
        : mob
    );
    setLivestockData(updatedData);
    setEditMobId(null);
  };

  const handleInputChange = (id, key, value) => {
    const updatedData = livestockData.map((mob) =>
      mob.id === id ? { ...mob, [key]: value } : mob
    );
    setLivestockData(updatedData);
  };

  const handleDeleteMob = (id) => {
    const updatedData = livestockData.filter((mob) => mob.id !== id);
    setLivestockData(updatedData);
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Sales Data</h2>
        <button
          onClick={handleAddMob}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add Data
        </button>
        <SellDataTable
          livestockData={livestockData}
          editMobId={editMobId}
          onEditMob={handleEditMob}
          onSaveMob={handleSaveMob}
          onInputChange={handleInputChange}
          onDeleteMob={handleDeleteMob}
          setEditMobId={setEditMobId}
        />
      </div>
    </>
  );
};

export const SellDataTable = ({
  livestockData,
  editMobId,
  onEditMob,
  onSaveMob,
  onInputChange,
  onDeleteMob,
  setEditMobId,
}) => {
  const familyData = {
    Cow: ["Bovidae"],
    Sheep: ["Bovidae"],
    Goat: ["Bovidae"],
    Chicken: ["Phasianidae"],
    Buffalo: ["Bovidae"],
    Pig: ["Suidae"],
  };

  const vaccineOptions = {
    Cow: ["Anthrax", "Brucellosis", "IBR", "Leptospirosis", "BVD", "SE"],
    Sheep: [
      "Pasteurellosis",
      "Chlamydia",
      "Clostridium",
      "Caseous Lymphadenitis",
      "Anthelmintic",
    ],
    Goat: [
      "Pasteurellosis",
      "Chlamydia",
      "Clostridium",
      "Caseous Lymphadenitis",
      "Anthelmintic",
    ],
    Chicken: [
      "Newcastle Disease",
      "Avian Influenza",
      "Infectious Bronchitis",
      "Marek's Disease",
      "Gumboro",
    ],
    Buffalo: ["Anthrax", "FMD", "Enterotoxemia", "Blackleg", "Pasteurellosis"],
    Pig: [
      "Classical Swine Fever",
      "PRRS",
      "FMD",
      "Swine Influenza",
      "Erysipelas",
    ],
  };

  return (
    <table className="border border-gray-400 mr-5">
      <thead className="bg-gray-200 text-gray-900">
        <tr>
          <th className="px-6 border py-3 border-gray-400">Sell Date</th>
          <th className="px-6 border py-3 border-gray-400">Animal</th>
          <th className="px-4 border border-gray-400">Family</th>
          <th className="px-6 border border-gray-400">Weight (Kg)</th>
          <th className="px-4 border border-gray-400">Gender</th>
          <th className="px-6 border border-gray-400">Age (Month)</th>
          <th className="px-4 border border-gray-400">Vaccine</th>
          <th className="px-4 border border-gray-400">Sell Price</th>
          <th className="px-4 border border-gray-400">Status</th>
          <th className="px-4 border border-gray-400">Action</th>
        </tr>
      </thead>
      <tbody>
        {livestockData.map(
          ({
            id,
            animal,
            family,
            weight,
            gender,
            age,
            vaccine,
            sellPrice,
            status,
          }) => (
            <tr key={id}>
              <td className="border text-center border-gray-400">
                {status === "Terjual" ? new Date().toLocaleDateString() : null}
              </td>
              <td className="border text-center border-gray-400">
                {editMobId === id ? (
                  <select
                    value={animal}
                    onChange={(e) =>
                      onInputChange(id, "animal", e.target.value)
                    }
                    className="bg-gray-200 px-2 py-1 rounded-md w-full"
                  >
                    <option value="">Select Animal</option>
                    {Object.keys(familyData).map((animal, index) => (
                      <option key={index} value={animal}>
                        {animal}
                      </option>
                    ))}
                  </select>
                ) : (
                  animal
                )}
              </td>
              <td className="border text-center border-gray-400">
                {editMobId === id ? (
                  <select
                    value={family}
                    onChange={(e) =>
                      onInputChange(id, "family", e.target.value)
                    }
                    className="bg-gray-200 px-2 py-1 rounded-md w-full"
                  >
                    <option value="">Select Family</option>
                    {familyData[animal] &&
                      familyData[animal].map((family, index) => (
                        <option key={index} value={family}>
                          {family}
                        </option>
                      ))}
                  </select>
                ) : (
                  family
                )}
              </td>
              <td className="border text-center border-gray-400">
                {editMobId === id ? (
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) =>
                      onInputChange(id, "weight", e.target.value)
                    }
                    className="bg-gray-200 px-2 py-1 rounded-md w-full"
                  />
                ) : (
                  weight
                )}
              </td>
              <td className="border text-center border-gray-400">
                {editMobId === id ? (
                  <select
                    value={gender}
                    onChange={(e) =>
                      onInputChange(id, "gender", e.target.value)
                    }
                    className="bg-gray-200 px-2 py-1 rounded-md w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  gender
                )}
              </td>
              <td className="border text-center border-gray-400">
                {editMobId === id ? (
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => onInputChange(id, "age", e.target.value)}
                    className="bg-gray-200 px-2 py-1 rounded-md w-full"
                  />
                ) : (
                  age
                )}
              </td>
              <td className="border text-center border-gray-400">
                {editMobId === id ? (
                  <select
                    value={vaccine}
                    onChange={(e) =>
                      onInputChange(id, "vaccine", e.target.value)
                    }
                    className="bg-gray-200 px-2 py-1 rounded-md w-full"
                  >
                    <option value="">Select Vaccine</option>
                    {vaccineOptions &&
                      vaccineOptions[animal]?.map((vaccine, index) => (
                        <option key={index} value={vaccine}>
                          {vaccine}
                        </option>
                      ))}
                  </select>
                ) : (
                  vaccine
                )}
              </td>
              <td className="border text-center border-gray-400">
                {editMobId === id ? (
                  <input
                    type="text"
                    value={sellPrice}
                    onChange={(e) =>
                      onInputChange(id, "sellPrice", e.target.value)
                    }
                    className="bg-gray-200 px-2 py-1 rounded-md w-full"
                  />
                ) : (
                  sellPrice
                )}
              </td>
              <td className="border text-center border-gray-400">{status}</td>
              <td className="text-center px-2 flex">
                {editMobId === id ? (
                  <>
                    <button
                      onClick={() => onSaveMob(id)}
                      className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded-md mr-2 text-white"
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
                      onClick={() => setEditMobId(null)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onEditMob(id)}
                      className="px-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-md mr-2 text-white"
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
                      onClick={() => onDeleteMob(id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default SellRecordsTable;
