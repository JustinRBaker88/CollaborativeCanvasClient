enum Events {
    CANVASCLICKED = "CanvasClicked",
    CANVASCONSTRUCTED = "CanvasConstructed",
    COLORSELECTED = "ColorSelected",
    CAMERAZOOMED = "CameraZoomed",
    CANVASREADY = "CanvasReady",
    DBUNSUPPORTED = "DBUnsupported",
    SAVECOMPLETE = "SaveComplete",
    SAVEFAIL = "SaveFail",
    SAVECLICK = "SaveClick",
    SAVEREQUEST = "SaveRequest",
    LOADREADY = "LoadReady",
    LOADFAIL = "LoadFail",
    DBREADY = "DBReady",
    DELETECOMPLETE = "DeleteComplete",
    DELETEFAIL = "DeleteFail"
  
}

enum Scenes {
  CANVAS = "Canvas",
  CANVASUI = "CanvasUI"

}

export const CollaborativeCanvas  = { 
  Events, Scenes
};
