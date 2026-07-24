document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(function(button){
        button.addEventListener("click", function(){
            console.log("Sky Foundation - Thank you for your support!");
        });
    });

});
