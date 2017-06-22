var Modules = window.Modules || {};
Modules.modules = {};
/*Object.defineProperty(Modules, "modules", {
 value: {},
 writable: false,
 enumerable: false,
 get: function () {
 return this.value;
 },
 set: function (value) {
 this.value[] = value;
 }

 });*/

Modules.add = function (name, module) {
    this.modules[name] = module;
};

Modules.get = function (name) {
    return this.modules[name];

};

