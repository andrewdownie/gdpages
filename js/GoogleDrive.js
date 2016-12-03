//////////
//////////
////////// Interface functions /////////////////////////////////////////////////
//////////
//////////

/////
///// RequestTextFile
/////
function RequestTextFile(callback, file_id, api_key){
///DESCRIPTION
///     - Gets the contents of a google doc file as plain text
///     - also removes the new page indicators
/// callback
///     - the function that will be called once the contents of the text file is
///         found
///     - callback function header is: callback(string, string)
/// file_id
///     - the google id of the text file to load
/// api_key
///     - the google api key with permissions to read the text file

    var promise = $.getJSON(_BuildFileUrl(file_id, api_key), function( data, status ){
        alert("Success")
    })
    .done(function( data ){
        JSON.stringify(data)

    }).fail(function(jsonError){//This returns an error despite working, and I don't know why
        var response = jsonError.responseText
        var result = response.replace(/________________/g, "")// Sketchy way of removing the new page indicator

        callback(result, file_id)
    });

}


/////
///// RequestFolderContents
/////
function RequestFolderContents(callback, folder_id, api_key){
///DESCRIPTION
///     - gets a list of all the file ids and folder ids from a google drive folder
/// callback
///     - the function that will be called once the contents of the folder is
///         found
///     - callback function header is: callback(dictionary, string)
///     - see the _PackFolderContents function for info about the contents of
///         the dictionary parameter
/// folder_id
///     - the google id of the folder to get info about
/// api_key
///     - the google api key with permissions to read the text file

    var promise = $.getJSON(_BuildFolderUrl(folder_id, api_key), function( data, status){

    }).done(function( data ){
        callback(_PackFolderContents(data), folder_id)

    }).fail(function(jsonError){
        alert("Google Drive Folder AJAX JSON Request failed, see browser log for full error.")
        console.log(JSON.stringify(jsonError))
    });

}


//////////
//////////
////////// Helper functions ////////////////////////////////////////////////////
//////////
//////////

/////
///// _PackFolderContents
/////
function _PackFolderContents(jsonData){
///DESCRIPTION
///     - takes the jsondata given by google about a folder, and turns it into a
///         dictionary containing two lists
///     - one list (folderContents.documents), is a list of info about the
///         google documents in the folder
///     - the other list (folderContents.folders), is a list of info about the
///         subfolders in the folder
/// jsonData
///     - the raw json recieved from google folder contents query
///

    var folders = []
    var documents = []
    var folderContents = {}


    for(var i = 0; i < jsonData.files.length; i++){
        curItem = {}

        curItem.name = jsonData.files[i].name
        curItem.id = jsonData.files[i].id

        if(jsonData.files[i].mimeType == "application/vnd.google-apps.document"){
            //curItem.type = "document"
            documents.push(curItem)
        }
        else if(jsonData.files[i].mimeType == "application/vnd.google-apps.folder"){
            //curItem.type = "folder"
            folders.push(curItem)
        }


    }

    folderContents.documents = documents
    folderContents.folders = folders
    return folderContents
}


/////
///// _BuildFileUrl
/////
function _BuildFileUrl(file_id, api_key){
///DESCRIPTION
///     - takes a google drive file id, and an google api key, and returns a url
///         to be used in an http get request, to get that files contents as plain text
///
    return "https://www.googleapis.com/drive/v2/files/" + file_id + "/export?mimeType=text%2Fplain&key=" + api_key
}



/////
///// _BuildFolderUrl
/////
function _BuildFolderUrl(folder_id, api_key){
///DESCRIPTION
///     - takes a google drive folder id, and an google api key, and returns a
///         url to be used in an http get request, to get that folders contents as json
///
    return "https://www.googleapis.com/drive/v3/files?q='" + folder_id + "'+in+parents&key=" + api_key
}
