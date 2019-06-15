var createDate = function () {
    var d = new Date();
    var formDate = "";

    // java functions to get info
    formDate += (d.getMonth() + 1) + "_";
    formDate +=d.getDate() + "_";
    formDate +=d.getFullYear();

    return formDate;
}; 

module.exports = createDate;