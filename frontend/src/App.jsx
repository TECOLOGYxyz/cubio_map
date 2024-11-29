import MapComponent from "./components/MapComponent";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProjectForm from "./components/ProjectForm";
import { useState, useEffect } from "react";
import { useProjects } from "./hooks/useProjects";
import {
  fetchSavedAreas,
  saveSelectedAreasAPI,
  savePolygonAreasAPI,
  deleteSavedAreaAPI,
} from "./services/api";


function App() {
  // State for områder og lag
  const [selectedArea, setSelectedArea] = useState(null);
  const [isMultiSelectActive, setIsMultiSelectActive] = useState(false);
  const [isDrawActive, setIsDrawActive] = useState(false);
  const [isInsectMarkersVisible, setIsInsectMarkersVisible] = useState(false);
  const [isProjectMarkersVisible, setIsProjectMarkersVisible] = useState(false);


  // Gemte områder
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [isSavedAreasVisible, setIsSavedAreasVisible] = useState(false); 
  const [savedAreas, setSavedAreas] = useState([]);
  const [activeLayer, setActiveLayer] = useState(null);

  // Projektrelateret logik
  const {
    projectsData,
    selectedProject,
    isEditingProject, 
    isCreatingProject, 
    projectLocation, 
    setProjectLocation, 
    createProject,
    saveUpdatedProject, 
    deleteProject, 
    startCreatingProject, 
    startEditingProject, 
    cancelEditingProject, 
  } = useProjects();

  useEffect(() => {
    console.log("isCreatingProject ændret til:", isCreatingProject);
  }, [isCreatingProject]);

  useEffect(() => {
    console.log("Saved Areas:", savedAreas);
    console.log("Saved Areas Visibility:", isSavedAreasVisible);
  }, [savedAreas, isSavedAreasVisible]);

  // Funktion til at hente gemte områder
  const fetchSavedAreasInApp = async () => {
    try {
        const areas = await fetchSavedAreas(1); 
        setSavedAreas(areas); 
    } catch (error) {
        console.error("Error fetching saved areas in App.jsx:", error);
    }
};

const saveSelectedAreas = async () => {
  if (selectedAreas.length === 0 && (!selectedArea || !selectedArea.geom)) {
    alert("Ingen områder valgt!");
    return;
  }

  try {
    let geoJSON;

    // Hvis det er kvadrater (multiple selection)
    if (selectedAreas.length > 0) {
      const polygons = selectedAreas.map((area) => {
        if (!area.bounds || area.bounds.length !== 2) {
          throw new Error(`Området "${area.name}" har ugyldige koordinater.`);
        }
        const [southWest, northEast] = area.bounds;
        return [
          [southWest[1], southWest[0]],
          [northEast[1], southWest[0]],
          [northEast[1], northEast[0]],
          [southWest[1], northEast[0]],
          [southWest[1], southWest[0]],
        ];
      });

      geoJSON = {
        type: "MultiPolygon",
        coordinates: polygons.map((coords) => [coords]),
      };
    } else if (selectedArea?.geom) {
      geoJSON = selectedArea.geom;
    }

    console.log("Kombineret GeoJSON:", geoJSON);

    
    await saveSelectedAreasAPI(geoJSON, selectedArea, 1); 
    alert("Området blev gemt!");
    setSelectedAreas([]);
    fetchSavedAreasInApp(); 
  } catch (error) {
    console.error("Fejl ved gemning af området:", error);
    alert("Noget gik galt. Prøv igen.");
  }
};


const savePolygonAreas = async () => {
  if (!selectedArea || !selectedArea.geom) {
    alert("Ingen polygon valgt!");
    return;
  }

  try {
    await savePolygonAreasAPI(selectedArea, 1); 
    alert("Polygon blev gemt!");
    setSelectedArea(null); 
    fetchSavedAreasInApp(); 
  } catch (error) {
    console.error("Fejl ved gemning af polygon:", error);
    alert("Noget gik galt. Prøv igen.");
  }
};

useEffect(() => {
    fetchSavedAreasInApp();
}, []);


  // Toggle-funktion
  const toggleSavedAreas = () => {
    setIsSavedAreasVisible((prev) => !prev);
    if (!isSavedAreasVisible) {
      fetchSavedAreasInApp();
    }
  };

  const deleteSavedArea = async (areaId) => {
    try {      
      await deleteSavedAreaAPI(areaId);      
      setSavedAreas((prevSavedAreas) =>
        prevSavedAreas.filter((area) => area.id !== areaId)
      );
      alert("Området blev slettet.");
    } catch (error) {
      console.error("Fejl ved sletning af området:", error);
      alert("Kunne ikke slette området. Prøv igen.");
    }
  };

  const toggleInsectMarkers = () => {
    setIsInsectMarkersVisible(!isInsectMarkersVisible);
  };

  const toggleProjectMarkers = () => {
    setIsProjectMarkersVisible(!isProjectMarkersVisible);
  };

 
  useEffect(() => {
    console.log("Updated projectLocation in App:", projectLocation);
  }, [projectLocation]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      
      <Header />

      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          selectedArea={selectedArea}
          isMultiSelectActive={isMultiSelectActive}
          setIsMultiSelectActive={setIsMultiSelectActive}
          isDrawActive={isDrawActive}
          setIsDrawActive={setIsDrawActive}
          toggleInsectMarkers={toggleInsectMarkers}
          isInsectMarkersVisible={isInsectMarkersVisible}
          isProjectMarkersVisible={isProjectMarkersVisible} 
          toggleProjectMarkers={toggleProjectMarkers}
          startCreatingProject={startCreatingProject}
          onSaveSelectedAreas={saveSelectedAreas} 
          selectedAreas={selectedAreas} 
          toggleSavedAreas={toggleSavedAreas} 
          isSavedAreasVisible={isSavedAreasVisible} 
          savedAreas={savedAreas}
          deleteSavedArea={deleteSavedArea}
          activeLayer={activeLayer} 
          setActiveLayer={setActiveLayer} 
          onSavePolygonAreas={savePolygonAreas}
        />

        
        <div className="flex-grow overflow-hidden">
          <MapComponent
            setSelectedArea={setSelectedArea}
            isMultiSelectActive={isMultiSelectActive}
            isDrawActive={isDrawActive}
            isInsectMarkersVisible={isInsectMarkersVisible}
            isProjectMarkersVisible={isProjectMarkersVisible}
            isCreatingProject={isCreatingProject} 
            setProjectLocation={setProjectLocation}
            projectsData={projectsData}
            onUpdate={startEditingProject}
            onDelete={deleteProject}
            selectedAreas={selectedAreas} 
            setSelectedAreas={setSelectedAreas}
            savedAreas={savedAreas} 
            isSavedAreasVisible={isSavedAreasVisible} 
            activeLayer={activeLayer}
          />
        </div> 

        {projectLocation && (
          <ProjectForm
            project={{ location: projectLocation }}
            projectLocation={projectLocation}
            onSave={createProject}
            onCancel={() => {
              cancelEditingProject(); 
              setProjectLocation(null); 
            }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              border: "1px solid #ccc",
              zIndex: 10000,
              width: "400px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          />
        )}

        {isEditingProject && selectedProject && (
                  <ProjectForm
                    project={selectedProject}
                    projectLocation={selectedProject.location}
                    onSave={saveUpdatedProject}
                    onCancel={cancelEditingProject}
                    style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #ccc",
                      zIndex: 10000,
                      width: "400px",
                      maxHeight: "80vh",
                      overflowY: "auto",
                  }}
                />
            )}
      </div>
    </div>
  )
}



export default App
