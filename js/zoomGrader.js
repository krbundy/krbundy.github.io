function loadfiles(files){
    //loads all the files from the webform and returns them as a JS Object

}

function cleanZoomData(names, emails, attendance){
// Cleans the data from zoom, by:
// 1. removes extra characters, moves everything to lower case
// 2. combines duplicate entries.
}

function createMasterList(list, tokens){
    // returns master list from an array of names.  Formatted for a reduce operation.
}

function collateAttendance(masterList, names, attendance){
    // Takes all of the information from the loaded file, and then adds them to the master list

}

function run(files){
    //The function that is called on clicking the run button
    var data  = loadfiles();
    var cleaned_data  = cleanZoomData(data);
    let masterList = [];
    masterlist = collateAttendance()

}

//helper functions
