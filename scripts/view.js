(function () {

    var controller = Modules.get("controller"),
        Log = Modules.get("log"),
        isEmpty = Modules.get("isEmpty");

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
                    <img src=${obj.isFavorite ? "assets/images/star.jpg" : "assets/images/emptyStar.png"}
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

        $(".favorite").on("click", function (e) {
            // console.log($(e.currentTarget).attr("data-id"));
            var currLocation = controller.locations.filter(function (location) {
                return location.id === $(e.currentTarget).attr("data-id");
            });
            currLocation[0].isFavorite = !currLocation[0].isFavorite;
            console.log(currLocation[0].isFavorite);
            render();
        });

        $(".delButton").on("click", function (e) {
            controller.deleteLocation($(e.currentTarget).attr("data-id"));

            render();
        })
    }

    render();

    $("#locationInfo").on("submit", function (event) {
        event.preventDefault();
        var data = {},
            isFormValid = true,
            self = this;
        $(".error").removeClass("error");

        data = $(this).serializeArray().reduce(function (temp, currItem, index) {
            temp[currItem.name] = currItem.value;
            return temp;
        }, {});
        console.log(data);

        Object.keys(data).forEach(function (key,i) {
            if(!data[key]){
                $(self).find(`input[name=${key}]`).addClass("error");
                isFormValid = false;
            }
        });

        if (isFormValid) {
            controller.addLocation(data);

            $(".borderWrapper").show();
            $(".formWrapper").hide();
            $(".funcBtnWrapper").show();

        }

        render();
    });

    $("#addLocationBtn").on("click", function () {
        $("#locationInfo")[0].reset();
        $(".error").removeClass("error");
        $(".funcBtnWrapper").hide();
        $(".borderWrapper").hide();
        $(".formWrapper").show();
    });

    $("#back").on("click", function () {
        $(".formWrapper").hide();
        $(".borderWrapper").show();
        $(".funcBtnWrapper").show();
    });

    $("#backFromHistory").on("click", function () {
        $(".formWrapper").hide();
        $(".history").hide();
        $(".borderWrapper").show();
        $(".funcBtnWrapper").show();
    });

    $("#history").on("click", function () {
        $(".funcBtnWrapper").hide();
        $(".borderWrapper").hide();

        var history = controller.history.logs;
        var counts = `<div class="counters"><p class="green">Added: <b>${controller.history.getNumLogsByOperations("create")}</b></p>  
                           <p class="red">Deleted: <b>${controller.history.getNumLogsByOperations("delete")}</b></p>  
                      </div>`;
        historyHtml = history.map(function (obj) {
            return `
                        <div class="historyElement">
                            <p>Operation: ${obj.operation}</p>
                            <p>Created: ${obj.created}</p>
                            <p>LocationId: ${obj.locationId}</p>
                            <p>OwnId: ${obj.id}</p>
                        </div>`
        });
        $("#counts").html(counts);
        $(".historyWrap").html("").append(counts, historyHtml);
        $(".history").show();
    });

    $("#clear").on("click", function () {
        controller.deleteAllLocations();
        render();
    })

})();

