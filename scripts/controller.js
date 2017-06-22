(function () {
    var controller = {
        locations: [],
        history: {
            logs: [],
            getNumLogsByOperations: function (operationName) {
                return this.logs.filter(function (el) {
                    return el.operation === operationName;
                }).length;
            }
        },
        addLocation: function (params) {
            var location = new Location(params);
            this.locations.push(location);
        },
        deleteLocation: function (id) {
            this.locations = this.locations.filter(function (obj) {
                return obj.id !== id;
            })
        },
        deleteAllLocations: function () {
            this.locations = [];
        }
    };

    function Location(params) {
        this.imgUrl = params.url;
        this.title = params.title;
        this.address = params.address;
        this.contacts = params.contacts || [];
        this.description = params.description || "";
        this.rate = params.rate || 0;
        this.rateNumber = params.rateNumber || 0;
        this.isFavorite = false;
        this.id = getUniqId();
    }

    function Log(params) {
        this.operation = params.operation; // есть 3 операции create, delete, deleteAll
        this.created = Date.now();
        this.locationId = params.locationId || "";
        this.id = getUniqId();
    }

    function getUniqId() {
        return (Math.random() * Math.pow(10, 17)).toString(16);
    }

    controller.addLocation({
        title: "Шарада"
    });
    controller.addLocation({
        title: "Пляж"

    });
    controller.addLocation({
        title: "Маяк"

    });

    Modules.add("controller", controller);

})();












