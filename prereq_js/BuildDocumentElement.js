/////
///// BuildDocumentElement
/////
function BuildDocumentElement(name, docID){
///DESCRIPTION
///     - Creates the html needed to make document elements, allowing for
///         javascript styles parameter input
///     - Defaults to loading state, and needs to be filled in
/// name
///     - the name of the google document
/// docID
///     - the google id of this document
///

    var docElement = ""

    docElement += '<div id="' + docID + '" class="col-md-12">'
    docElement += '    <h1 class="contents-head">'
    docElement += '        <a target="_blank" href="https://docs.google.com/document/d/' + docID + '/edit">'
    docElement +=              name
    docElement += '        </a>'
    docElement += '    </h1>'
    docElement += '    <div id="contents-body">'
    docElement += '        Loading...'
    docElement += '    </div>'

    docElement += '</div>'

    return docElement
}
