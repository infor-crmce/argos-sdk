<<<<<<< HEAD
define('argos/FieldManager', ['exports', 'module', 'dojo/_base/lang'], function (exports, module, _dojo_baseLang) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  /* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var store, __class;

  store = {};

  /**
   * @class argos.FieldManager
   * Field Manager is a registry for field types that enables the Edit View layouts to
   * simply define `type: 'myFieldType'`.
   * @alternateClassName FieldManager
   * @singleton
   */
  __class = _lang['default'].setObject('argos.FieldManager', {
    /**
     * @property {Object}
     * The type map that translates string type names to constructor functions
     */
    types: store,
    /**
     * Registers a field type by providing a unique name and the constructor to be called
     * @param {String} name Unique string name of field, will be what is used in Edit View layouts.
     * @param {Function} ctor Constructor function of field
     */
    register: function register(name, ctor) {
      store[name] = ctor;
      return ctor;
    },
    /**
     * Retrieves a constructor for the given field name
     * @param name Unique name of field
     * @return {Function} Constructor for the given field type
     */
    get: function get(name) {
      return store[name];
    }
  });

  _lang['default'].setObject('Sage.Platform.Mobile.FieldManager', __class);
  module.exports = __class;
=======
/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @class argos.FieldManager
 * Field Manager is a registry for field types that enables the Edit View layouts to
 * simply define `type: 'myFieldType'`.
 * @alternateClassName FieldManager
 * @singleton
 */
define('argos/FieldManager', [
    'dojo/_base/lang'
], function(
    lang
) {
    var store,
        __class;

    store = {};
    __class = lang.setObject('argos.FieldManager', {
        /**
         * @property {Object}
         * The type map that translates string type names to constructor functions
         */
        types: store,
        /**
         * Registers a field type by providing a unique name and the constructor to be called
         * @param {String} name Unique string name of field, will be what is used in Edit View layouts.
         * @param {Function} ctor Constructor function of field
         */
        register: function(name, ctor) {
            store[name] = ctor;
            return ctor;
        },
        /**
         * Retrieves a constructor for the given field name
         * @param name Unique name of field
         * @return {Function} Constructor for the given field type
         */
        get: function(name) {
            return store[name];
        }
    });

    lang.setObject('Sage.Platform.Mobile.FieldManager', __class);
    return __class;
>>>>>>> develop
});
