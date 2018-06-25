function search() {
    let matches = 0;
    let targetValue = $("#searchText").val();
    $("#towns li").each((index, el) => {
            if (el.textContent.includes(targetValue)) {
                $(el).css("font-weight", "bold");
                matches++;
            } else {
                $(el).css("font-weight", "");
            }
        });
    $("#result").text(matches + " matches found.")
}