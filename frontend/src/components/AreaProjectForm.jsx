import { useState } from "react";
import PropTypes from "prop-types";

function AreaProjectForm({ project, selectedArea, onSave, onCancel }) {
    console.log("Received props:", { project, selectedArea }); 
  const [formData, setFormData] = useState({
    name: project?.name || "",
    description: project?.description || "",
    status: project?.status || "planned",
    dateInitiated: project?.date_initiated || "",
    expectedDuration: project?.expected_duration || "",
    image: null,
    area: selectedArea?.id || null, // Relateret område
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("date_initiated", formData.dateInitiated);
    data.append("expected_duration", formData.expectedDuration);
    data.append("area", formData.area);
    if (formData.image) {
      data.append("image", formData.image);
      }
      console.log("Calling API with data:", Object.fromEntries(data.entries()));
    onSave(data);
  };
  console.log("Rendering AreaProjectForm...");
    return (
        <>
           
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status:
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="planned">Planned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Initiated:
            </label>
            <input
              type="date"
              name="dateInitiated"
              value={formData.dateInitiated}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Duration (days):
            </label>
            <input
              type="number"
              name="expectedDuration"
              value={formData.expectedDuration}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image:
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md shadow-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </>
      
  );
}

AreaProjectForm.propTypes = {
  project: PropTypes.object,
  selectedArea: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AreaProjectForm;
