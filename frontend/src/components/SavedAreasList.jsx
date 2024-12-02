import PropTypes from "prop-types";
import { GoTrash } from "react-icons/go";


function SavedAreasList({
    savedAreas,
    deleteSavedArea,
    startCreatingAreaProject,
    startEditingAreaProject,
    deleteAreaProject,
}) {
    
      
    return (
      
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Gemte Områder</h3>
            <ul className="mt-4 space-y-4">
                {savedAreas.length > 0 ? (
                savedAreas.map((area) => (
                    <li
                    key={area.id}
                    className="bg-white rounded-lg p-4 shadow-sm"
                    >
                    {/* Område Info */}
                    <div>
                        <p className="font-semibold text-gray-900">{area.name}</p>
                        <p className="text-sm text-gray-700">
                        Størrelse: {area.area_size.toFixed(2)} m²
                        </p>
                        <p className="text-sm text-gray-700">
                        Gns. Naturværdi: {area.nature_value.toFixed(2)}
                        </p>
                    </div>

                    {/* Handling Buttons */}
                    <div className="flex items-center space-x-4 mt-4">
                        <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md"
                        onClick={() => startCreatingAreaProject(area)}
                        >
                        Opret Projekt
                        </button>
                        <GoTrash
                        onClick={() => {
                            if (
                            window.confirm(
                                `Er du sikker på, at du vil slette området "${area.name}"?`
                            )
                            ) {
                            deleteSavedArea(area.id);
                            }
                        }}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        size={24}
                        title="Slet område"
                        />
                    </div>

                    {/* Projekter knyttet til Området */}
                    {area.projects && area.projects.length > 0 && (
                        <div className="mt-4 border-t border-gray-200 pt-2">
                        <h4 className="font-semibold text-gray-800">Projekter:</h4>
                        <ul className="space-y-2 mt-2">
                            {area.projects.map((project) => (
                            <li
                                key={project.id}
                                className="bg-gray-100 p-3 rounded-md flex justify-between items-center"
                            >
                                <div>
                                <p className="text-sm font-semibold">{project.name}</p>
                                <p className="text-xs text-gray-600">
                                    Status: {project.status}
                                </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md text-xs"
                                    onClick={() => startEditingAreaProject(project)} // Åbn redigeringsformular
                                >
                                    Rediger
                                </button>
                                <GoTrash
                                    onClick={() => {
                                    if (
                                        window.confirm(
                                        `Er du sikker på, at du vil slette projektet "${project.name}"?`
                                        )
                                    ) {
                                        deleteAreaProject(project.id);
                                    }
                                    }}
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                    size={20}
                                    title="Slet projekt"
                                />
                                </div>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </li>
                ))
                ) : (
                <p className="text-gray-500 italic">Ingen gemte områder.</p>
                )}
            </ul>
        </div>
    );
}

SavedAreasList.propTypes = {
  savedAreas: PropTypes.array.isRequired,
    deleteSavedArea: PropTypes.func.isRequired,
    startCreatingAreaProject: PropTypes.func.isRequired,
    startEditingAreaProject: PropTypes.func.isRequired,
  deleteAreaProject: PropTypes.func.isRequired,
};

export default SavedAreasList;
