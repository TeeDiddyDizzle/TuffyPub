//event handler for post-form submit
window.addEventListener("load", function() {
    var form = document.getElementById("post-form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        getPostInfo();
    })
})

//functionto get the post-form info from user
function getPostInfo() {
    //get the card element
    var target = document.querySelector(".card");

    //get post-form element and get the text entered
    var userPost = document.getElementById("post-form");
    var text = "";
    text = userPost.elements[0].value;
    
    //create a new div with class card
    var newCard = document.createElement("div");
    newCard.setAttribute("class", "card");

    //edit the new card's html and insert before parent
    newCard.innerHTML = "<div class='bar'><a href=''>John Doe</a></div><p>" + text + "</p>";
    target.parentNode.insertBefore(newCard, target);
}; 
