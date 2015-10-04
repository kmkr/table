'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _getBorderCharacters = require('./getBorderCharacters');

var _getBorderCharacters2 = _interopRequireDefault(_getBorderCharacters);

var _validateConfig = require('./validateConfig');

var _validateConfig2 = _interopRequireDefault(_validateConfig);

var _calculateMaximumColumnWidthIndex = require('./calculateMaximumColumnWidthIndex');

var _calculateMaximumColumnWidthIndex2 = _interopRequireDefault(_calculateMaximumColumnWidthIndex);

var makeBorder = undefined,
    makeColumns = undefined;

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @param {Object} border
 * @returns {Object}
 */
makeBorder = function () {
    var border = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return _lodash2['default'].assign({}, (0, _getBorderCharacters2['default'])('honeywell'), border);
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} columns
 * @param {Object} columnDefault
 * @returns {Object}
 */
makeColumns = function (rows) {
    var columns = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var columnDefault = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var maximumColumnWidthIndex = undefined;

    maximumColumnWidthIndex = (0, _calculateMaximumColumnWidthIndex2['default'])(rows);

    _lodash2['default'].times(rows[0].length, function (index) {
        if (_lodash2['default'].isUndefined(columns[index])) {
            columns[index] = {};
        }

        columns[index] = _lodash2['default'].assign({
            alignment: 'left',
            width: maximumColumnWidthIndex[index],
            truncate: Infinity,
            paddingLeft: 1,
            paddingRight: 1
        }, columnDefault, columns[index]);
    });

    return columns;
};

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} userConfig
 * @returns {Object}
 */

exports['default'] = function (rows) {
    var userConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var config = undefined;

    (0, _validateConfig2['default'])(userConfig);

    config = _lodash2['default'].cloneDeep(userConfig);

    config.border = makeBorder(config.border);
    config.columns = makeColumns(rows, config.columns, config.columnDefault);

    if (!config.drawHorizontalLine) {
        /**
         * @returns {boolean}
         */
        config.drawHorizontalLine = function () {
            return true;
        };
    }

    return config;
};

module.exports = exports['default'];
//# sourceMappingURL=makeConfig.js.map
