/////
///// Document Ready
/////
$(document).ready(function(){
    LoadNavBar(LoadNavBarLinks)

    SetupButtonClick()
});


/////
///// LoadNavBarLinks
/////
function LoadNavBarLinks(){
///DESCRIPTION
///     - called when the navbar is loaded
    //RequestFolderContents(SetupNavLinks, ROOT_FOLDER_ID, API_KEY)
    RequestFolderContents(SetupNavLinks, CONSTANTS.ROOT_FOLDER_ID, CONSTANTS.API_KEY)
}


/////
///// SetupNavLinks
/////
function SetupNavLinks(folderContents, folder_id){
///DESCRIPTION
///     - callback from RequestFolderContents, see that function for details
///         (in GoogleDrive.js)

    var folders = folderContents.folders




    $("#li-loading").remove()
    for(var i = 0; i < folders.length; i++){
        AddNavBarLink(folders[i].name, folders[i].id, "#navbar ul")
    }

    FillPage(folderContents, folder_id)

}


/////
///// SetupButtonClick
/////
function SetupButtonClick(){
///DESCRIPTION
///     - All click events and on 'click' events should be declared here

    $("body").on('click', "#navbar ul li a", function(){
        /*$("#current-folder").text(this.text)
        $("#current-folder").attr('href', 'https://drive.google.com/drive/folders/' + this.id)*/

        alert("You touched da fishy")
        $("#document-insertion").empty()
        RequestFolderContents(FillPage, this.id, CONSTANTS.API_KEY)
    });
}

/////
///// FillPage
/////
function FillPage(folderContents, folder_id){
///DESCRIPTION
///     - callback from RequestFolderContents, see that function for details
///         (in GoogleDrive.js)
    $("#loading").html("")
    var documents = folderContents.documents


    if(documents.length == 0){
        $("#document-insertion").html("<h3 class='col-md-12'>No documents here</h3>")
        return;
    }



    for(var i = 0; i < documents.length; i++){
        if(documents[i].name == "Home"){
            $("#document-insertion").append(BuildDocumentElement(documents[i].name, documents[i].id))
            RequestTextFile(FillDocumentElement, documents[i].id, CONSTANTS.API_KEY)
        }
        else{
            $("#document-insertion").append("<h2>There is no home page :( </h3>")

            $("#document-insertion").append("<ul>")
            $("#document-insertion").append("<li> Create a google doc named 'Home' in the root google drive folder</li>")
            $("#document-insertion").append("<li> Create folders in the root google drive folder to add nav links</li>")
            $("#document-insertion").append("</ul>")
        }
    }

}


/////
///// FillDocumentElement
/////
function FillDocumentElement(contents, file_id){
///DESCRIPTION
///     - callback from RequestTextFile, see that function for details
///         (in GoogleDrive.js)

    $("#" + file_id + " .contents-body").html(contents)
}
