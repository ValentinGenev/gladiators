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
var Field_1 = require("../state/Field");
var Movement = (function () {
    function Movement() {
    }
    Movement.determineDirection = function (keyEvent) {
        if (Object.keys(this.KEY_VECTOR_MAP).includes(keyEvent.key)) {
            return this.KEY_VECTOR_MAP[keyEvent.key];
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
    Movement.KEY_VECTOR_MAP = {
        ArrowUp: [-1, 0],
        ArrowDown: [1, 0],
        ArrowLeft: [0, -1],
        ArrowRight: [0, 1]
    };
    return Movement;
}());
exports["default"] = Movement;

},{"../state/Field":8}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Equipment_1 = require("../objects/Equipment");
var Field_1 = require("../state/Field");
var Gladiator_1 = require("../objects/Gladiator");
var random_generator_1 = require("../utilities/random-generator");
var Staging = (function () {
    function Staging(level) {
        this.enemies = [];
        this.level = level;
        this.populateWithGladiators();
    }
    Staging.prototype.getEnemies = function () {
        return this.enemies;
    };
    Staging.prototype.populateWithGladiators = function () {
        for (var i = 0; i < this.level; i++) {
            this.setEnemyPosition(i + 1, i);
            this.setEnemyPosition(i, i + 1);
            this.setEnemyPosition(i + 1, i + 1);
        }
    };
    Staging.prototype.setEnemyPosition = function (weapon, armor) {
        var row = (0, random_generator_1.getRandomNumber)(0, Field_1["default"].getRows());
        var column = (0, random_generator_1.getRandomNumber)(0, Field_1["default"].getColumns());
        var tile = Field_1["default"].getFreeTile(row, column);
        var gladiator = new Gladiator_1["default"](new Equipment_1["default"](weapon, armor), tile, false);
        tile.setContent(gladiator);
        this.enemies.push(gladiator);
    };
    return Staging;
}());
exports["default"] = Staging;

},{"../objects/Equipment":5,"../objects/Gladiator":6,"../state/Field":8,"../utilities/random-generator":10}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Staging_1 = require("./engine/Staging");
var Movement_1 = require("./engine/Movement");
var Player_1 = require("./state/Player");
startGame();
document.onkeydown = function (event) {
    var player = Player_1["default"].get();
    var direction = Movement_1["default"].determineDirection(event);
    Movement_1["default"].move(player, direction);
    console.log('--------------- player', player.getTile());
};
function startGame() {
    var level1 = new Staging_1["default"](1);
    Player_1["default"].init();
    var enemies = level1.getEnemies();
}

},{"./engine/Movement":2,"./engine/Staging":3,"./state/Player":9}],5:[function(require,module,exports){
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

},{"../engine/Fighting":1}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Tile_1 = require("../objects/Tile");
var ROWS = 15;
var COLUMNS = 15;
var FieldState = (function () {
    function FieldState() {
    }
    FieldState.getField = function () {
        if (!FieldState.field) {
            FieldState.field = this.create(this.rows, this.columns);
        }
        return FieldState.field;
    };
    FieldState.getRows = function () {
        return FieldState.rows;
    };
    FieldState.getColumns = function () {
        return FieldState.columns;
    };
    FieldState.getTile = function (row, column) {
        try {
            return FieldState.getField()[row][column];
        }
        catch (error) {
            return null;
        }
    };
    FieldState.getFreeTile = function (row, column) {
        var tile;
        do {
            tile = FieldState.getTile(row, column);
        } while (tile.getContent());
        return tile;
    };
    FieldState.create = function (rowsCount, columnsCount) {
        var field = new Array(rowsCount);
        for (var row = 0; row < rowsCount; row++) {
            field[row] = new Array(columnsCount);
            for (var column = 0; column < columnsCount; column++) {
                field[row][column] = new Tile_1["default"](row, column);
            }
        }
        return field;
    };
    FieldState.rows = ROWS;
    FieldState.columns = COLUMNS;
    return FieldState;
}());
exports["default"] = FieldState;

},{"../objects/Tile":7}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Equipment_1 = require("../objects/Equipment");
var Field_1 = require("./Field");
var Gladiator_1 = require("../objects/Gladiator");
var random_generator_1 = require("../utilities/random-generator");
var PlayerState = (function () {
    function PlayerState() {
    }
    PlayerState.init = function () {
        if (!PlayerState.state) {
            PlayerState.state = PlayerState.create();
        }
    };
    PlayerState.get = function () {
        PlayerState.init();
        return PlayerState.state;
    };
    PlayerState.create = function () {
        var row = (0, random_generator_1.getRandomNumber)(0, Field_1["default"].getRows());
        var column = (0, random_generator_1.getRandomNumber)(0, Field_1["default"].getColumns());
        var tile = Field_1["default"].getFreeTile(row, column);
        var gladiator = new Gladiator_1["default"](new Equipment_1["default"](1, 1), tile, false);
        tile.setContent(gladiator);
        return gladiator;
    };
    return PlayerState;
}());
exports["default"] = PlayerState;

},{"../objects/Equipment":5,"../objects/Gladiator":6,"../utilities/random-generator":10,"./Field":8}],10:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.getRandomNumber = void 0;
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
exports.getRandomNumber = getRandomNumber;

},{}]},{},[4]);
