$("#header").load("/assets/decorations/topNavbar.html", highlightActivePage);
$("#header").addClass("my-5");
$("#footer").load("/assets/decorations/footer.html");

// alert($(`.onpage-${$(document).attr("title")}`));

function highlightActivePage() {
  $(`.onpage-${$(document).attr("title")}`).addClass("active");
}
