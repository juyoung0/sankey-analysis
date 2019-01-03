$(document).ready(function(){

var flagAdd=true;
var myNavBar = {

    elements: [],

    init: function (elements) {
        this.elements = elements;
    },

    add : function() {
        if(this.flagAdd && document.getElementById(this.elements[i]) != null) {
            for(var i=0; i < this.elements.length; i++) {
                document.getElementById(this.elements[i]).className += " fixed-theme";
            }
            flagAdd = false;
        }
    },
    remove: function() {
      if(document.getElementById(this.elements[i]) != null){
        for(var i=0; i < this.elements.length; i++) {
            document.getElementById(this.elements[i]).className =
                    document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixed-theme(?!\S)/g , '' );
        }
        flagAdd = true;
      }
    }

};
myNavBar.init(  [
    "header",
    "header-container",
    "brand"
]);
function offSetManager(){

    var yOffset = 0;
    var currYOffSet = window.pageYOffset;

    if(yOffset < currYOffSet) {
        myNavBar.add();
    }
    else if(currYOffSet == yOffset){
        myNavBar.remove();
    }

}
window.onscroll = function(e) {
    offSetManager();
}
offSetManager();
});
