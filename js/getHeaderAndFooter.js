$("#header").load("/assets/decorations/topNavbar.html", highlightActivePage);
$("#footer").load("/assets/decorations/footer.html");

// alert($(`.onpage-${$(document).attr("title")}`));

function highlightActivePage() {
  $(`.onpage-${$(document).attr("title")}`).addClass("active");
}
