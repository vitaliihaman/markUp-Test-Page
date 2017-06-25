(function () {

    var controller = Modules.get("controller");

    function render() {

        var locations = controller.locations;
        locationsHtml = locations.map(function (obj) {
            return `<div class="mainWrapper">
            <div class="photoWrapper">
                <img src=${obj.imgUrl} alt="Photo" class="photo">
            </div>
            <div class="info">
                <div class="header">
                    <a href="#root"><h3>${obj.title}</h3></a>
                    <img src=${obj.isFavorite? "assets/images/star.jpg":"assets/images/emptyStar.png"}
                     class="favorite" data-id=${obj.id} alt="star">
                </div>
                <div class="contentWrapper">
                    <h4>Адрес:</h4>
                    <p>${obj.address}</p>
                </div>
                <div class="contentWrapper">
                    <h4>Контакты:</h4>
                    <p>${obj.contacts}</p>
                </div>
                <div class="description">
                    ${obj.description}
                </div>
                <div class="bottomWrapper">
                    <div class="ratingWrapper">
                        <img src="assets/images/star.jpg" class="rating" alt="star">
                        <img src="assets/images/star.jpg" class="rating" alt="star">
                        <img src="assets/images/star.jpg" class="rating" alt="star">
                        <img src="assets/images/star.jpg" class="rating" alt="star">
                        <img src="assets/images/emptyStar.png" class="rating" alt="star">
                    </div>
                    <div class="deleteWrapper">
                        <button class="delButton" data-id="${obj.id}" >delete</button>
                    </div>
                </div>
            </div>
        </div>`
        });


        $(".borderWrapper").html("").append(locationsHtml);

        $(".favorite").on("click", function(e) {
           // console.log($(e.currentTarget).attr("data-id"));
            var currLocation = controller.locations.filter(function (location) {
                return location.id === $(e.currentTarget).attr("data-id");
            });
            currLocation[0].isFavorite = !currLocation[0].isFavorite;
            console.log(currLocation[0].isFavorite);
            render();

        });

        $(".delButton").on("click", function(e) {
            console.log($(e.currentTarget).attr("data-id"));
            controller.locations = locations.filter(function (location) {
                return location.id !== $(e.currentTarget).attr("data-id");
            });
            render();
        })
    }

    render();


    $("#locationInfo").on("submit", function (event) {
        event.preventDefault();
        var data = {};
        for (var i = 0; i < this.length; i++) {
            if (this[i].type === "reset" || this[i].type === "submit") {
                continue;
            }
            data[this[i].name] = this[i].value;
        }
        console.log(data);
        controller.addLocation(data);
        console.log(controller.locations);
        render();
    });

$("#addLocationBtn").on("click", function () {
    $(".borderWrapper").hide();
    $(this).hide();
    $(".formWrapper").show();
})


})();

