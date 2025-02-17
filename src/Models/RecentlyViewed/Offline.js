/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
import _OfflineModelBase from '../_OfflineModelBase';
import Manager from '../Manager';
import MODEL_TYPES from '../Types';
import getResource from '../../I18n';


const resource = getResource('recentlyViewedModel');

/**
 * @class argos.Models.RecentlyViewed.Offline
 */
const __class = declare('argos.Models.RecentlyViewed.Offline', [_OfflineModelBase], {
  id: 'recentlyviewed_offline_model',
  entityName: 'RecentlyViewed',
  modelName: 'RecentlyViewed',
  entityDisplayName: resource.entityDisplayName,
  entityDisplayNamePlural: resource.entityDisplayNamePlural,
  isSystem: true,
  createEntry: function createEntity(viewId, entry, model) {
    const entity = {}; // need to dynamicly create Properties;
    entity.$key = `${viewId}_${model.getEntityId(entry)}`;
    entity.$descriptor = model.getEntityDescription(entry);
    entity.createDate = moment().toDate();
    entity.modifyDate = moment().toDate();
    entity.entityId = model.getEntityId(entry);
    entity.entityName = model.entityName;
    entity.description = model.getEntityDescription(entry);
    entity.entityDisplayName = model.entityDisplayName;
    entity.resourceKind = model.resourceKind;
    entity.viewId = viewId;
    entity.iconClass = model.getIconClass(entry);
    return entity;
  },
  deleteEntryByEntityContext: function deleteEntryByEntityContext(entityId, entityName) {
    const options = {
      filter: function filter(entry) {
        if (entry.entityId === entityId && entry.entityName === entityName) {
          return entry;
        }
      },
    };
    this.getEntries(null, options).then((entries) => {
      if (entries) {
        entries.forEach((entry) => {
          this.deleteEntry(entry.$key);
        });
      }
    });
  },
});

Manager.register('RecentlyViewed', MODEL_TYPES.OFFLINE, __class);
export default __class;
