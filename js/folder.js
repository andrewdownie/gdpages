/////
///// Document Ready
/////
$(document).ready(function(){
    LoadNavBar(LoadNavBarLinks)

    //SetupButtonClick()
});

/////
///// LoadNavBarLinks
/////
function LoadNavBarLinks(){
///DESCRIPTION
///     - called when the navbar is loaded
    //RequestFolderContents(SetupNavLinks, ROOT_FOLDER_ID, API_KEY)
    RequestFolderContents(FillPage, CONSTANTS.ROOT_FOLDER_ID, CONSTANTS.API_KEY)
}
