//CONSTANTS
var API_KEY = "AIzaSyCezOKNqrj4hqNqIanUDNeqnupvHdGge-o"
var ROOT_FOLDER_ID = '0B1esFIYXspGHRUQ1T1RkSjZOa0U'


/////
///// Document Ready +
/////
$(document).ready(function(){
    LoadNavBar(LoadNavBarLinks)

    $("#current-folder").text("Home")
    $("#current-folder").attr('href', 'https://drive.google.com/drive/folders/' + ROOT_FOLDER_ID)

    SetupButtonClick()
});


/////
///// LoadNavBarLinks
/////
function LoadNavBarLinks(){
///DESCRIPTION
///     - called when the navbar is loaded
    RequestFolderContents(SetupNavLinks, ROOT_FOLDER_ID, API_KEY)
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

    FillPage(folderContents)

}


/////
///// SetupButtonClick
/////
function SetupButtonClick(){
///DESCRIPTION
///     - All click events and on 'click' events should be declared here

    $("#top-navigation").on('click', "#navbar ul li a", function(){
        $("#current-folder").text(this.text)
        $("#current-folder").attr('href', 'https://drive.google.com/drive/folders/' + this.id)

        $("#document-insertion").empty()
        RequestFolderContents(FillPage, this.id, API_KEY)
    });
}

/////
///// FillPage
/////
function FillPage(folderContents, folder_id){
///DESCRIPTION
///     - callback from RequestFolderContents, see that function for details
///         (in GoogleDrive.js)

    var documents = folderContents.documents

    if(documents.length == 0){
        $("#document-insertion").append("<h3 class='col-md-12'>No documents here.</h3>")

        return;
    }

    for(var i = 0; i < documents.length; i++){
        console.log("halp" + i)
        $("#document-insertion").append(BuildDocumentElement(documents[i].name, documents[i].id))
        RequestTextFile(FillDocumentElement, documents[i].id, API_KEY)

        //Request a single document here, instead of all of them, like above
    }

}

/////
///// FillDocumentElement
/////
function FillDocumentElement(contents, file_id){
///DESCRIPTION
///     - callback from RequestTextFile, see that function for details
///         (in GoogleDrive.js)

    $("#" + file_id + " .well").html(contents)
}
