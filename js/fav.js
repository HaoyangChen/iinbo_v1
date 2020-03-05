'use strict';


window.onload=function() {
    console.log('ready');
    document.querySelectorAll('.del').forEach(item => {
        let btnID = item.id;
        console.log(btnID);
    item.addEventListener('click', () => {
        removeLi(btnID);
  })
})
    return false;

}
function removeLi(btnID) {
    // Removes an element from the document
    console.log(btnID);
    var li = document.getElementById(btnID).parentNode.parentNode.parentNode.parentNode;
    console.log(li);
    li.parentNode.removeChild(li);
    console.log("removed");
}