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

import declare from 'dojo/_base/declare';
import LookupField from './LookupField';
import FieldManager from '../FieldManager';

/**
 * @class argos.Fields.SelectField
 * @classdesc The SelectField is a minor extension to te LookupField in that it explicitly hides search and actions.
 *
 * It may also optionally pass the `data` option which a view may optionally use instead of requesting data.
 *
 * @example
 *     {
 *         name: 'State',
 *         property: 'State',
 *         label: this.stateText,
 *         type: 'select',
 *         view: 'state_list'
 *     }
 * @extends argos.Fields.LookupField
 * @requires argos.FieldManager
 */
const control = declare('argos.Fields.SelectField', [LookupField], /** @lends argos.SelectField# */ {
  /**
   * @property {Boolean}
   * Overrides the {@link LookupField LookupField} default to explicitly set it to false forcing
   * the view to use the currentValue instead of a key/descriptor
   */
  valueKeyProperty: false,
  /**
   * @property {Boolean}
   * Overrides the {@link LookupField LookupField} default to explicitly set it to false forcing
   * the view to use the currentValue instead of a key/descriptor
   */
  valueTextProperty: false,
  /**
   * @property {Object|Object[]|Function}
   * If defined will be expanded (if function) and passed in the navigation options to the lookup view
   */
  data: null,
  /**
   * Overides the {@link LookupField#createNavigationOptions parent implementation} to set search and actions to
   * hidden and optionally pass data defined on the field.
   */
  createNavigationOptions: function createNavigationOptions() {
    const options = this.inherited(createNavigationOptions, arguments);
    options.hideSearch = true;
    options.enableActions = false;
    options.data = this.expandExpression(this.data);
    return options;
  },
});

export default FieldManager.register('select', control);
