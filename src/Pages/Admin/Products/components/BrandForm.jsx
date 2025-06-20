import React, { useState, useEffect } from "react";
import { X, Save, Search, Edit2, Trash2, Check } from "lucide-react";

const sampleBrands = [
  { id: 1, name: "Brand 1" },
  { id: 2, name: "Brand 2" },
  { id: 3, name: "Brand 3" },
  { id: 4, name: "Jack Daniel's" },
  { id: 5, name: "Johnnie Walker" },
  { id: 6, name: "Red Label" },
  { id: 7, name: "Black Label" },
];

const BrandForm = ({ onCancel }) => {
  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    setBrands(sampleBrands);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!brandName.trim()) return;

    console.log("Brand submitted:", brandName);
    const newBrand = { id: brands.length + 1, name: brandName };
    setBrands([...brands, newBrand]);
    setBrandName("");
  };

  const handleEdit = (brand) => {
    setEditingId(brand.id);
    setEditingName(brand.name);
  };

  const handleSaveEdit = (id) => {
    if (editingName.trim()) {
      setBrands(
        brands.map((brand) =>
          brand.id === id ? { ...brand, name: editingName } : brand
        )
      );
    }
    setEditingId(null);
    setEditingName("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      setBrands(brands.filter((brand) => brand.id !== id));
    }
  };

  // Filter brands based on search term
  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full mb-4 bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-left text-gray-600 font-bold mb-2">
            Add New Brand
          </h1>
          <p className="text-gray-600">
            Enter brand name to add to your product system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search brands..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={onCancel}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="space-y-6 mb-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Name*
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter brand name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => {
              if (e.key === "Enter" && brandName.trim()) {
                handleSubmit(e);
              }
            }}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!brandName.trim()}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Brand
          </button>
        </div>
      </div>
      {/* Brand List */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Existing Brands ({filteredBrands.length})
          </h2>
        </div>

        {filteredBrands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                {editingId === brand.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveEdit(brand.id);
                        if (e.key === "Escape") handleCancelEdit();
                      }}
                      autoFocus
                    />
                    <div className="flex justify-end space-x-1">
                      <button
                        onClick={() => handleSaveEdit(brand.id)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                        title="Save"
                      >
                        <Check className="h-3 w-3" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                        title="Cancel"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-gray-800 flex-1 mr-2 truncate">
                      {brand.name}
                    </p>
                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        title="Edit brand"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Delete brand"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No brands found matching your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default BrandForm;
