(function () {
    var controller = {
        locations: [],
        history: {
            logs: [],
            getNumLogsByOperations: function (operationName) {
                return this.logs.filter(function (el) {
                    return el.operation === operationName;
                }).length;
            },
            createLog: function (log) {
               var newLog = new Log(log);
                this.logs.push(newLog);
            }
        },
        addLocation: function (params) {
            var location = new Location(params);
            this.locations.push(location);
            this.history.createLog({
                operation: "create",
                locationId: location.id
            })
        },
        deleteLocation: function (id) {
            this.locations = this.locations.filter(function (obj) {
                return obj.id !== id;
            });
            this.history.createLog({
                operation: "delete",
                locationId: id
            })
        },
        deleteAllLocations: function () {
            this.locations = [];
            this.history.createLog({
                operation: "deleteAll"
            })
        }
    };

    function Location(params) {
        this.imgUrl = params.url || "http://oko-kursk.ru/wp-content/uploads/2015/09/no-image-300x227.png";
        this.title = params.title || "-";
        this.address = params.address || "-";
        this.contacts = params.contacts || [];
        this.description = params.description || "-";
        this.rate = params.rate || 0;
        this.rateNumber = params.rateNumber || 0;
        this.isFavorite = false;
        this.id = getUniqId();
    }
    
    function Log(params) {
        this.operation = params.operation; // есть 3 операции create, delete, deleteAll
        this.created = new Date().toLocaleString();
        this.locationId = params.locationId || "-";
        this.id = getUniqId();
    }

    function getUniqId() {
        return (Math.random() * Math.pow(10, 17)).toString(16);
    }

    function isEmpty(input) {
        if(input.length < 3){
            return false;
        }
    }

    //for example:
    controller.addLocation({
        title: "Шарада",
        url: "assets/images/sharada.jpg",
        address: "г.Кременчуг ул.Лейтенанта Днепрова,111",
        contacts: ["+38(067)941-40-11","+38(067)186-87-37","|","sharadabase@mail.ru","sharadabase@yandex.ua"],
        description: "Коттеджи, детская площадка, бассейн, мангал, турецкая баня, русская баня,футбол (крытый зал),футбол(открытая площадь), теннис(крытый зал),теннис(открытый корт),фитнес, прогулки на катере,вейкборд,рыбалка",
    });

    Modules.add("controller", controller);
    Modules.add("isEmpty", isEmpty);

})();












