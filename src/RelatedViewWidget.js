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
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import when from 'dojo/when';
import connect from 'dojo/_base/connect';

import SDataStore from './Store/SData';
import _CustomizationMixin from './_CustomizationMixin';
import _ActionMixin from './_ActionMixin';
import _RelatedViewWidgetBase from './_RelatedViewWidgetBase';
import getResource from './I18n';

const resource = getResource('relatedViewWidget');

/**
 * @class argos.RelatedViewWidget
 */
const __class = declare('argos.RelatedViewWidget', [_RelatedViewWidgetBase, _CustomizationMixin], /** @lends argos.RelatedViewWidget# */{
  _ActionMixin: null,
  cls: 'related-view-widget',
  nodataText: resource.nodataText,
  selectMoreDataText: resource.selectMoreDataText,
  selectMoreDataText2: resource.selectMoreDataText2,
  navToListText: resource.navToListText,
  loadingText: resource.loadingText,
  refreshViewText: resource.refreshViewText,
  itemOfCountText: resource.itemOfCountText,
  totalCountText: resource.totalCountText,
  titleText: resource.titleText,
  parentProperty: '$key',
  parentEntry: null,
  relatedProperty: '$key',
  relatedEntry: null,
  itemsNode: null,
  loadingNode: null,
  id: 'related-view',
  detailViewId: null,
  listViewId: null,
  listViewWhere: null,
  enabled: false,
  parentCollection: false,
  parentCollectionProperty: null,
  resourceKind: null,
  contractName: null,
  select: null,
  where: null,
  sort: null,
  store: null,
  relatedData: null,
  queryOptions: null,
  isLoaded: false,
  autoLoad: false,
  wait: false,
  startIndex: 1,
  pageSize: 3,
  relatedResults: null,
  itemCount: 0,
  _isInitLoad: true,
  showTab: true,
  showTotalInTab: true,
  showSelectMore: false,
  hideWhenNoData: false,
  enableActions: true,
  _subscribes: null,
  /**
   * @property {Simplate}
   * Simple that defines the HTML Markup
   */
  relatedContentTemplate: new Simplate([
    '<div  id="tab" data-dojo-attach-point="tabNode" class="',
    '{% if ($.autoLoad) { %}',
    'tab ',
    '{% } else { %}',
    'tab collapsed ',
    '{% } %}',
    '" >',
    '<div class="tab-items">',
    '{%! $$.relatedViewTabItemsTemplate %}',
    '</div>',
    '</div>',
    '<div class="panel">',
    '<div data-dojo-attach-point="actionsNode" class="action-items"></div>',
    '<div data-dojo-attach-point="headereNode" class="header">',
    '{%! $$.relatedViewHeaderTemplate %}',
    '</div>',
    '<div  data-dojo-attach-point="relatedViewNode"></div>',
    '<div data-dojo-attach-point="footerNode" class="footer">',
    '{%! $$.relatedViewFooterTemplate %}',
    '</div>',
    '</div>',
  ]),
  nodataTemplate: new Simplate([
    '<div class="nodata"> {%: $$.nodataText %}</div>',
  ]),
  relatedViewTabItemsTemplate: new Simplate([
    '<span class="tab-item">',
    '<div class="tab-icon" data-dojo-attach-event="onclick:onNavigateToList">',
    '<img src="{%= $.icon %}" alt="{%= $.title %}" />',
    '</div>',
    '<div data-dojo-attach-point="titleNode" data-dojo-attach-event="onclick:toggleView"  class="title" >{%: ($.title ) %} </div>',
    '</span>',
    '<div class="line-bar"></div>',
  ]),
  relatedViewHeaderTemplate: new Simplate([
    '',
  ]),
  relatedViewFooterTemplate: new Simplate([
    '<div  data-dojo-attach-point="selectMoreNode" class="action" data-dojo-attach-event="onclick:onSelectMoreData"></div>',
    '<div  data-dojo-attach-point="navtoListFooterNode" class="action" data-dojo-attach-event="onclick:onNavigateToList">{%: $$.navToListText %}</div>',

  ]),
  relatedViewRowTemplate: new Simplate([
    '<div class="row {%: $$.cls %}"  data-relatedkey="{%: $.$key %}" data-descriptor="{%: $.$descriptor %}">',
    '<div class="item">',
    '{%! $$.relatedItemTemplate %}',
    '</div>',
    '</div>',
  ]),
  relatedItemIconTemplate: new Simplate([
    '<img src="{%: $$.itemIcon %}" />',
  ]),
  relatedItemHeaderTemplate: new Simplate([
    '<div>{%: $.$descriptor %}</div>',
  ]),
  relatedItemDetailTemplate: new Simplate([
    '<div></div>',
  ]),
  relatedItemFooterTemplate: new Simplate([
    '<div></div>',
  ]),
  relatedItemTemplate: new Simplate([
    '<div class="item-icon">',
    '{%! $$.relatedItemIconTemplate %}',
    '</div>',
    '<div class="item-header">',
    '{%! $$.relatedItemHeaderTemplate %}',
    '</div>',
    '<div class="item-detail">',
    '{%! $$.relatedItemDetailTemplate %}',
    '</div>',
    '<div class="item-footer">',
    '{%! $$.relatedItemFooterTemplate %}',
    '</div>',
  ]),
  loadingTemplate: new Simplate([
    '<div class="busy-indicator-container" aria-live="polite">',
    '<div class="busy-indicator active">',
    '<div class="bar one"></div>',
    '<div class="bar two"></div>',
    '<div class="bar three"></div>',
    '<div class="bar four"></div>',
    '<div class="bar five"></div>',
    '</div>',
    '<span>{%: $.loadingText %}</span>',
    '</div>',
  ]),

  relatedActionTemplate: new Simplate([
    '<span class="action-item" data-id="{%= $.actionIndex %}">',
    '<img src="{%= $.icon %}" alt="{%= $.label %}" />',
    '</span>',
  ]),
  constructor: function constructor(options) {
    lang.mixin(this, options);
    if (this.titleText) {
      this.title = this.titleText;
    }

    this._subscribes = [];
    this._subscribes.push(connect.subscribe('/app/refresh', this, this._onAppRefresh));
  },
  postCreate: function postCreate() {
    this._ActionMixin = new _ActionMixin();
    this._ActionMixin.postCreate(this);

    if ((!this.showTab) && (this.tabNode)) {
      $(this.tabNode).toggleClass('hidden');
    }
    if (this.enableActions) {
      this.createActions(this._createCustomizedLayout(this.createActionLayout(), 'relatedview-actions'));
    }
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'refresh',
      cls: 'fa fa-refresh fa-2x',
      label: this.refreshViewText,
      action: 'onRefreshView',
      isEnabled: true,
    }, {
      id: 'navtoListView',
      label: this.viewContactsActionText,
      cls: 'fa fa-list fa-2x',
      action: 'onNavigateToList',
      isEnabled: true,
      fn: this.onNavigateToList.bind(this),
    }]);
  },
  createActions: function createActions(actions) {
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const options = {
        actionIndex: i,
      };
      lang.mixin(action, options);
      const actionTemplate = action.template || this.relatedActionTemplate;
      const actionNode = $(actionTemplate.apply(action, action.id));
      $(actionNode).on('click', this.onInvokeActionItem.bind(this));
      $(this.actionsNode).append(actionNode);
    }

    this.actions = actions;
  },
  onInvokeActionItem: function onInvokeActionItem(evt) {
    const index = evt.currentTarget.attributes['data-id'].value;
    const action = this.actions[index];
    if (action) {
      if (action.isEnabled) {
        if (action.fn) {
          action.fn.call(action.scope || this, action);
        } else {
          if (typeof this[action.action] === 'function') {
            this[action.action](evt);
          }
        }
      }
    }
    evt.stopPropagation();
  },
  getStore: function getStore() {
    const store = new SDataStore({
      service: App.getService(),
      resourceKind: this.resourceKind,
      contractName: this.contractName,
      scope: this,
    });
    return store;
  },
  getQueryOptions: function getQueryOptions() {
    let whereExpression = '';
    if (this.hasOwnProperty('where')) {
      if (typeof this.where === 'function') {
        whereExpression = this.where(this.parentEntry);
      } else {
        whereExpression = this.where;
      }
    }

    const queryOptions = {
      count: this.pageSize || 1,
      start: 0,
      select: this.select || '',
      where: whereExpression,
      sort: this.sort || '',
    };

    return queryOptions;
  },
  fetchData: function fetchData() {
    if (this.startIndex < 1) {
      this.startIndex = 1;
    }
    this.queryOptions.start = this.startIndex - 1;
    const queryResults = this.store.query(null, this.queryOptions);
    this.startIndex = this.startIndex > 0 && this.pageSize > 0 ? this.startIndex + this.pageSize : 1;
    return queryResults;
  },
  onInit: function onInit() {
    this._isInitLoad = true;
    this.store = this.store || this.getStore();
    this.queryOptions = this.queryOptions || this.getQueryOptions();

    if (this.autoLoad) {
      this.onLoad();
    }
  },
  onLoad: function onLoad() {
    let data;
    if (this.relatedData) {
      if (typeof this.relatedData === 'function') {
        data = this.relatedData(this.parentEntry);
      } else {
        data = this.relatedData;
      }
      if (data) {
        this.relatedResults = {
          total: data.length,
        };
        this.pageSize = data.length;
        this.onApply(data);
      }
    } else if (this.parentCollection) {
      this.relatedResults = {
        total: this.parentEntry[this.parentCollectionProperty].$resources.length,
      };
      this.pageSize = this.relatedResults.total;
      this.onApply(this.parentEntry[this.parentCollectionProperty].$resources);
    } else {
      if (!this.loadingNode) {
        this.loadingNode = $(this.loadingTemplate.apply(this));
        $(this.relatedViewNode).append(this.loadingNode);
      }
      $(this.loadingNode).toggleClass('loading');
      if (this.wait) {
        return;
      }
      this.relatedResults = this.fetchData();
      ((context, relatedResults) => {
        try {
          when(relatedResults, function success(relatedFeed) {
            this.onApply(relatedFeed);
          }.bind(context));
        } catch (error) {
          console.log('Error fetching related view data:' + error);//eslint-disable-line
        }
      })(this, this.relatedResults);
    }
    this.isLoaded = true;
  },
  onApply: function onApply(relatedFeed) {
    try {
      if (!this.itemsNode) {
        this.itemsNode = $("<div id='itemsNode' class='items'><div>");
        $(this.relatedViewNode).append(this.itemsNode);
      }

      if (relatedFeed.length > 0) {
        let moreData;
        $(this.containerNode).removeClass('hidden');
        $(this.tabNode).removeClass('collapsed');
        this.itemCount = this.itemCount + relatedFeed.length;
        const restCount = this.relatedResults.total - this.itemCount;
        if (restCount > 0) {
          const moreCount = (restCount >= this.pageSize) ? this.pageSize : restCount;
          moreData = string.substitute(this.selectMoreDataText, [moreCount, this.relatedResults.total]);
        } else {
          moreData = '';
        }

        if (this.showSelectMore) {
          $(this.selectMoreNode).attr({
            innerHTML: moreData,
          });
        } else {
          $(this.selectMoreNode).attr({
            innerHTML: '',
          });
        }

        if (this.showTotalInTab) {
          $(this.titleNode).attr({
            innerHTML: `${this.title}  ${string.substitute(this.totalCountText, [this.relatedResults.total])}`,
          });
        }
        for (let i = 0; i < relatedFeed.length; i++) {
          const itemEntry = relatedFeed[i];
          itemEntry.$descriptor = itemEntry.$descriptor || relatedFeed.$descriptor;
          const itemHTML = this.relatedViewRowTemplate.apply(itemEntry, this);
          const itemNode = $(itemHTML);
          $(itemNode).on('click', this.onSelectViewRow.bind(this));
          $(this.itemsNode).append(itemNode);
        }
      } else {
        if (this.hideWhenNoData) {
          $(this.containerNode).addClass('hidden');
        } else {
          $(this.containerNode).removeClass('hidden');
        }
        $(this.itemsNode).append(this.nodataTemplate.apply(this.parentEntry, this));
        if (this.showTotalInTab) {
          $(this.titleNode).attr({
            innerHTML: `${this.title}  ${string.substitute(this.totalCountText, [0, 0])}`,
          });
        }
        $(this.selectMoreNode).attr({
          innerHTML: '',
        });
        if (this._isInitLoad) {
          this._isInitLoad = false;
          $(this.tabNode).toggleClass('collapsed');
        }
      }
      $(this.loadingNode).toggleClass('loading');
    } catch (error) {
      console.log('Error applying data for related view widget:' + error);//eslint-disable-line
    }
  },
  toggleView: function toggleView(evt) {
    $(this.tabNode).toggleClass('collapsed');

    if (!this.isLoaded) {
      this.onLoad();
    }
    evt.stopPropagation();
  },
  onSelectViewRow: function onSelectViewRow(evt) {
    const relatedKey = evt.currentTarget.attributes['data-relatedkey'].value;
    const descriptor = evt.currentTarget.attributes['data-descriptor'].value;

    const options = {
      descriptor,
      key: relatedKey,
      title: descriptor,
    };

    const view = App.getView(this.detailViewId);
    if (view) {
      view.show(options);
    }
    evt.stopPropagation();
  },
  onNavigateToList: function onNavigateToList(evt) {
    let whereExpression;
    if (this.hasOwnProperty('listViewWhere')) {
      if (typeof this.listViewWhere === 'function') {
        whereExpression = this.listViewWhere(this.parentEntry);
      } else {
        whereExpression = this.listViewWhere;
      }
    } else {
      if (this.hasOwnProperty('where')) {
        if (typeof this.where === 'function') {
          whereExpression = this.where(this.parentEntry);
        } else {
          whereExpression = this.where;
        }
      }
    }

    const options = {
      descriptor: this.title,
      where: whereExpression,
      title: this.title,
    };

    const view = App.getView(this.listViewId);
    if (view) {
      view.show(options);
    }
    evt.stopPropagation();
  },
  onSelectMoreData: function onSelectMoreData(evt) {
    this.onLoad();
    evt.stopPropagation();
  },
  onRefreshView: function onRefreshView(evt) {
    this._onRefreshView();
    evt.stopPropagation();
  },
  _onRefreshView: function _onRefreshView() {
    if (this.itemsNode) {
      $(this.itemsNode).remove();
      this.itemsNode = null;
    }
    this.startIndex = 1;
    this.itemCount = 0;
    this.isLoaded = false;
    this.onLoad();
  },
  _onAppRefresh: function _onAppRefresh(data) {
    if (data && data.data) {
      if (data.resourceKind === this.resourceKind) {
        if (this.parentEntry && (this.parentEntry[this.parentProperty] === data.data[this.relatedProperty])) {
          this._onRefreshView();
        }
      }
    }
  },
  destroy: function destroy() {
    this._subscribes.forEach((handle) => {
      connect.unsubscribe(handle);
    });
    this.inherited(destroy, arguments);
  },
});

export default __class;
