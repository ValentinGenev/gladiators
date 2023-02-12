(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Outcome = void 0;
var Outcome;
(function (Outcome) {
    Outcome[Outcome["Win"] = 0] = "Win";
    Outcome[Outcome["Lose"] = 1] = "Lose";
    Outcome[Outcome["Tie"] = 2] = "Tie";
})(Outcome = exports.Outcome || (exports.Outcome = {}));
var Fighting = (function () {
    function Fighting(equipment) {
        this.equipment = equipment;
    }
    Fighting.prototype.getEquipment = function () {
        return this.equipment;
    };
    Fighting.prototype.fight = function (target) {
        var targetEquipment = target.getEquipment();
        var outcome = this.determineOutcome(targetEquipment.getWeapon() + targetEquipment.getArmor());
        this.equipment.change(target, outcome);
        return outcome;
    };
    Fighting.prototype.determineOutcome = function (competitorStats) {
        var yourStats = this.equipment.getWeapon() + this.equipment.getArmor();
        if (yourStats > competitorStats) {
            return Outcome.Win;
        }
        else if (yourStats > competitorStats) {
            return Outcome.Lose;
        }
        else {
            return Outcome.Tie;
        }
    };
    return Fighting;
}());
exports["default"] = Fighting;

},{}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Field_1 = require("../objects/Field");
var KEY_VECTOR_MAP = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1]
};
var Movement = (function () {
    function Movement() {
    }
    Movement.detectControl = function (keyEvent) {
        if (Object.keys(KEY_VECTOR_MAP).includes(keyEvent.key)) {
            return KEY_VECTOR_MAP[keyEvent.key];
        }
        return [0, 0];
    };
    Movement.move = function (object, direction) {
        var _a = object.getTile(), currentRow = _a.row, currentColumn = _a.column;
        var currentTile = Field_1["default"].getTile(currentRow, currentColumn);
        var targetTile = Field_1["default"].getTile(currentRow + direction[0], currentColumn + direction[1]);
        if (targetTile) {
            targetTile.setContent(object);
            object.setTile(targetTile);
            currentTile.setContent(null);
        }
    };
    return Movement;
}());
exports["default"] = Movement;

},{"../objects/Field":6}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Equipment_1 = require("../objects/Equipment");
var Field_1 = require("../objects/Field");
var Gladiator_1 = require("../objects/Gladiator");
var Staging = (function () {
    function Staging(level) {
        this.enemies = [];
        this.level = level;
        if (level === 1) {
            this.setGladiatorPosition(1, 1, true);
        }
        this.populateWithGladiators();
    }
    Staging.prototype.getPlayer = function () {
        return this.player;
    };
    Staging.prototype.getEnemies = function () {
        return this.enemies;
    };
    Staging.prototype.populateWithGladiators = function () {
        for (var i = 0; i < this.level; i++) {
            this.setGladiatorPosition(i + 1, i);
            this.setGladiatorPosition(i, i + 1);
            this.setGladiatorPosition(i + 1, i + 1);
        }
    };
    Staging.prototype.setGladiatorPosition = function (weapon, armor, isPlayer) {
        if (isPlayer === void 0) { isPlayer = false; }
        var row = this.getRandomNumber(0, Field_1["default"].getRows());
        var column = this.getRandomNumber(0, Field_1["default"].getColumns());
        var tile;
        do {
            tile = Field_1["default"].getTile(row, column);
        } while (tile.getContent());
        var gladiator = new Gladiator_1["default"](new Equipment_1["default"](weapon, armor), tile, isPlayer);
        tile.setContent(gladiator);
        if (isPlayer) {
            this.player = gladiator;
        }
        else {
            this.enemies.push(gladiator);
        }
    };
    Staging.prototype.getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
    return Staging;
}());
exports["default"] = Staging;

},{"../objects/Equipment":5,"../objects/Field":6,"../objects/Gladiator":7}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Staging_1 = require("./engine/Staging");
var Movement_1 = require("./engine/Movement");
var level1 = new Staging_1["default"](1);
var player = level1.getPlayer();
var enemies = level1.getEnemies();
document.onkeydown = function (event) {
    var direction = Movement_1["default"].detectControl(event);
    Movement_1["default"].move(player, direction);
};

},{"./engine/Movement":2,"./engine/Staging":3}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Fighting_1 = require("../engine/Fighting");
var Equipment = (function () {
    function Equipment(weapon, armor) {
        this.weapon = weapon;
        this.armor = armor;
    }
    Equipment.prototype.getWeapon = function () {
        return this.weapon;
    };
    Equipment.prototype.setWeapon = function (points) {
        this.weapon = points;
    };
    Equipment.prototype.getArmor = function () {
        return this.armor;
    };
    Equipment.prototype.setArmor = function (points) {
        this.armor = points;
    };
    Equipment.prototype.change = function (target, outcome) {
        var selfWeapon = this.getWeapon();
        var selfArmor = this.getArmor();
        var targetEquipment = target.getEquipment();
        var targetWeapon = targetEquipment.getWeapon();
        var targetArmor = targetEquipment.getArmor();
        switch (outcome) {
            case Fighting_1.Outcome.Win:
                if (selfWeapon < targetWeapon) {
                    this.setWeapon(targetWeapon);
                }
                if (selfArmor < targetArmor) {
                    this.setArmor(targetArmor);
                }
                break;
            case Fighting_1.Outcome.Tie:
                this.setWeapon(selfWeapon - 1);
                this.setArmor(selfArmor - 1);
                targetEquipment.setWeapon(targetWeapon - 1);
                targetEquipment.setArmor(targetArmor - 1);
                break;
        }
    };
    return Equipment;
}());
exports["default"] = Equipment;

},{"../engine/Fighting":1}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Tile_1 = require("./Tile");
var ROWS = 15;
var COLUMNS = 15;
var Field = (function () {
    function Field() {
    }
    Field.getField = function () {
        if (!Field.field) {
            Field.field = this.create(this.rows, this.columns);
        }
        return Field.field;
    };
    Field.getRows = function () {
        return Field.rows;
    };
    Field.getColumns = function () {
        return Field.columns;
    };
    Field.getTile = function (row, column) {
        try {
            return Field.getField()[row][column];
        }
        catch (error) {
            return null;
        }
    };
    Field.create = function (rowsCount, columnsCount) {
        var field = new Array(rowsCount);
        for (var row = 0; row < rowsCount; row++) {
            field[row] = new Array(columnsCount);
            for (var column = 0; column < columnsCount; column++) {
                field[row][column] = new Tile_1["default"](row, column);
            }
        }
        return field;
    };
    Field.rows = ROWS;
    Field.columns = COLUMNS;
    return Field;
}());
exports["default"] = Field;

},{"./Tile":8}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Fighting_1 = require("../engine/Fighting");
var Gladiator = (function (_super) {
    __extends(Gladiator, _super);
    function Gladiator(equipment, tile, isPlayer) {
        if (isPlayer === void 0) { isPlayer = false; }
        var _this = _super.call(this, equipment) || this;
        _this.isDead = false;
        _this.tile = tile;
        _this.isPlayer = isPlayer;
        return _this;
    }
    Gladiator.prototype.setTile = function (tile) {
        this.tile = tile;
    };
    Gladiator.prototype.getTile = function () {
        return this.tile;
    };
    Gladiator.prototype.checkIfPlayer = function () {
        return this.isPlayer;
    };
    Gladiator.prototype.checkIfDead = function () {
        return this.isDead;
    };
    Gladiator.prototype.kill = function () {
        this.isDead = true;
    };
    return Gladiator;
}(Fighting_1["default"]));
exports["default"] = Gladiator;

},{"../engine/Fighting":1}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Tile = (function () {
    function Tile(row, column) {
        this.row = row;
        this.column = column;
        this.content = null;
    }
    Tile.prototype.setContent = function (content) {
        this.content = content;
    };
    Tile.prototype.getContent = function () {
        return this.content;
    };
    return Tile;
}());
exports["default"] = Tile;

},{}]},{},[4]);
