import jquery from "jquery"

$("#game-start-button").on("click", (event) => {
    alert("Clicked");
    $(this).remove();
    $("#gameplay-iframe").removeClass("d-none");
});