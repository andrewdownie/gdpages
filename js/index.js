var backStack = []

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


    RequestFolderContents(SetupNavLinks, CONSTANTS.ROOT_FOLDER_ID, CONSTANTS.API_KEY)

    backStack[0] = {}
    backStack[0].id = CONSTANTS.ROOT_FOLDER_ID
    backStack[0].name = "GD Pages"

    $("#folder-name").text(backStack[0].name)
    $("#folder-name").attr("href", href="https://docs.google.com/drive/folders/" + backStack[0].id)
}


/////
///// SetupNavLinks
/////
function SetupNavLinks(folderContents, folder_id){
///DESCRIPTION
///     - callback from RequestFolderContents, see that function for details
///         (in GoogleDrive.js)

    var folders = folderContents.folders
    var documents = folderContents.documents



    $("#li-loading").remove()
    for(var i = 0; i < folders.length; i++){
        AddNavBarLink(folders[i].name, folders[i].id, ".navbar-nav-upper")
    }

    for(var i = 0; i < documents.length; i++){
        AddNavBarLink(documents[i].name, documents[i].id, ".navbar-nav-lower")
    }

    FillPage(folderContents, folder_id)

}


/////
///// SetupButtonClick
/////
function SetupButtonClick(){
///DESCRIPTION
///     - All click events and on 'click' events should be declared here

    ///
    /// Click folder link
    ///
    $("body").on('click', ".navbar-nav-upper li a", function(){

        $("#document-insertion").empty()
        $("#folder-name").text($(this).text())
        $("#folder-name").attr("href", href="https://docs.google.com/drive/folders/" + $(this).attr('id'))

        if($(this).attr('id') == CONSTANTS.ROOT_FOLDER_ID){
            $(".nav-back-chevrons").hide()
        }
        else{
            $(".nav-back-chevrons").show()
        }

        $(".navbar-nav-lower").empty()
        $(".navbar-nav-upper").empty()

        backStack.push({})
        backStack[backStack.length-1].id = $(this).attr('id')
        backStack[backStack.length-1].name = $(this).text()



        RequestFolderContents(SetupNavLinks, backStack[backStack.length-1].id, CONSTANTS.API_KEY)
    });

    ///
    /// Click back link
    ///
    $("body").on('click', ".nav-back-chevrons", function(){

        $("#document-insertion").empty()
        backStack.pop()

        $("#folder-name").text(backStack[backStack.length-1].name)
        $("#folder-name").attr("href", href="https://docs.google.com/drive/folders/" + backStack[backStack.length-1].id)

        if(backStack[backStack.length-1].id == CONSTANTS.ROOT_FOLDER_ID){
            $(".nav-back-chevrons").hide()
        }
        else{
            $(".nav-back-chevrons").show()
        }

        $(".navbar-nav-lower").empty()
        $(".navbar-nav-upper").empty()

        RequestFolderContents(SetupNavLinks, backStack[backStack.length-1].id, CONSTANTS.API_KEY)

    });

    ///
    /// Click file link
    ///
    $("body").on('click', ".navbar-nav-lower li a", function(){

        $("#document-insertion").empty()


        $("#document-insertion").append(BuildDocumentElement( $(this).text(),  $(this).attr("id")))
        RequestTextFile(FillDocumentElement, $(this).attr("id"), CONSTANTS.API_KEY)

    });
}

/////
///// FillPage
/////
function FillPage(folderContents, folder_id){
///DESCRIPTION
///     - callback from RequestFolderContents, see that function for details
///         (in GoogleDrive.js)
    //alert("hi")
    $("#loading").html("")
    var documents = folderContents.documents


    if(documents.length == 0){
        $("#document-insertion").html("<h3 class='col-md-12'>No documents here</h3>")
        return;
    }


    var homePageFound = false
    for(var i = 0; i < documents.length; i++){
        if(documents[i].name == "Home"){
            homePageFound = true

            $("#document-insertion").append(BuildDocumentElement(documents[i].name, documents[i].id))
            RequestTextFile(FillDocumentElement, documents[i].id, CONSTANTS.API_KEY)

            break
        }
    }

    if(homePageFound == false){
        $("#document-insertion").append(BuildDocumentElement(documents[0].name, documents[0].id))
        RequestTextFile(FillDocumentElement, documents[0].id, CONSTANTS.API_KEY)
    }

}


/////
///// FillDocumentElement
/////
function FillDocumentElement(contents, file_id){
///DESCRIPTION
///     - callback from RequestTextFile, see that function for details
///         (in GoogleDrive.js)

    //alert("#" + file_id + " .contents-body")
    $("#contents-body").html(contents)
}
