(function () {

    var controller = Modules.get("controller");
    var locations = controller.locations;
    locationsHtml = locations.map(function (obj) {
        return `<div class="mainWrapper">
            <div class="photoWrapper">
                <img src="assets/images/sharada.jpg" alt="Photo" class="photo">
            </div>
            <div class="info">
                <div class="header">
                    <a href="#root"><h3>${obj.title}</h3></a>
                    <img src="assets/images/star.jpg" class="favorite" data-id=${obj.id} alt="star">
                </div>
                <div class="contentWrapper">
                    <h4>Адрес:</h4>
                    <p>г.Кременчуг ул.Лейтенанта Днепрова,111</p>
                </div>
                <div class="contentWrapper">
                    <h4>Контакты:</h4>
                    <p>+38(067)941-40-11, +38(067)186-87-37 |sharadabase@mail.ru, sharadabase@yandex.ua</p>
                </div>
                <div class="description">
                    Коттеджи, детская площадка, бассейн, мангал, турецкая баня, русская баня,
                    футбол (крытый зал),футбол(открытая площадь), теннис(крытый зал),
                    теннис(открытый корт),фитнес, прогулки на катере,вейкборд,рыбалка
                </div>
                <div>
                    <img src="assets/images/star.jpg" class="rating" alt="star">
                    <img src="assets/images/star.jpg" class="rating" alt="star">
                    <img src="assets/images/star.jpg" class="rating" alt="star">
                    <img src="assets/images/star.jpg" class="rating" alt="star">
                    <img src="assets/images/emptyStar.png" class="rating" alt="star">
                </div>
            </div>
        </div>`
    });
    $(".borderWrapper").append(locationsHtml);

    $(".favorite").on("click", favoriteClick);
    function favoriteClick(e) {
           console.log($(e.currentTarget).attr("data-id"));
    }

})();

