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
import lang from 'dojo/_base/lang';
import query from 'dojo/query';
import Toolbar from './Toolbar';
import getResource from './I18n';
import $ from 'jquery';
import 'dojo/NodeList-manipulate';

const resource = getResource('mainToolbar');

/**
 * @class argos.MainToolbar
 * MainToolbar is designed to handle the top application bar with markup and logic to set
 * a title and position toolbar items to the left or right
 * @alternateClassName MainToolbar
 * @extends argos.Toolbar
 */
const __class = declare('argos.MainToolbar', [Toolbar], {
  /**
   * @property {Object}
   * Used to set the title node's innerHTML
   */
  attributeMap: {
    title: {
      node: 'titleNode',
      type: 'innerHTML',
    },
  },
  /**
   * @property {Simplate}
   * Simplate that defines the main HTML Markup of the toolbar
   *
   * `$` - the toolbar instance
   */
  widgetTemplate: new Simplate([`
    <nav id="application-menu" data-open-on-large="false" class="application-menu show-shadow"
      data-breakpoint="desktop" style="height: 100%;">
    </nav>
    <header class="header azure07 is-personalizable is-scrolled-down" data-options="{addScrollClass: true}">
      <div class="toolbar has-more-button has-title-button" role="toolbar" aria-label="Layouts">
        <div class="title">
          <button class="btn-icon application-menu-trigger hide-focus" type="button" tabindex="0">
              <span class="audible">Show navigation</span>
              <span class="icon app-header">
                <span class="one"></span>
                <span class="two"></span>
                <span class="three"></span>
              </span>
          </button>
          <h1>
            <span id="pageTitle" data-dojo-attach-point="titleNode" data-dojo-attach-event="onclick: onTitleClick">{%= $.titleText %}</span>
          </h1>
        </div>
        <div class="buttonset" data-dojo-attach-point="toolNode">
        </div>
        <div class="more">
          <button class="btn-actions page-changer hide-focus" type="button" aria-haspopup="true" aria-controls="app-toolbar-more">
            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-more"></use>
            </svg>
            <span class="audible" data-translate="text">More...</span>
          </button>
          <div class="popupmenu-wrapper bottom" role="application" aria-hidden="true">
            <ul id="app-toolbar-more" class="popupmenu is-selectable" role="menu" aria-hidden="true">
              <li class="heading" role="presentation">Theme</li>
              <li class="is-selectable" role="presentation"><a href="#" data-theme="grey-theme" tabindex="-1" role="menuitemcheckbox" aria-checked="true">Light</a></li>
              <li class="is-selectable" role="presentation"><a href="#" data-theme="dark-theme" tabindex="-1" role="menuitem">Dark</a></li>
              <li class="is-selectable is-checked" role="presentation"><a href="#" data-theme="high-contrast-theme" tabindex="-1" role="menuitem">High Contrast</a></li>
              <li class="separator" role="presentation"></li>
              <li class="heading" role="presentation">Personalization</li>
              <li class="is-selectable is-checked" role="presentation"><a data-rgbcolor="" href="#" tabindex="-1" role="menuitemcheckbox" aria-checked="true">Default</a></li>
              <li class="is-selectable" role="presentation"><a data-rgbcolor="#368AC0" href="#" tabindex="-1" role="menuitem">Azure</a></li>
              <li class="is-selectable" role="presentation"><a data-rgbcolor="#EFA836" href="#" tabindex="-1" role="menuitem">Amber</a></li>
              <li class="is-selectable" role="presentation"><a data-rgbcolor="#9279A6" href="#" tabindex="-1" role="menuitem">Amethyst</a></li>
              <li class="is-selectable" role="presentation"><a data-rgbcolor="#579E95" href="#" tabindex="-1" role="menuitem">Turqoise</a></li>
              <li class="is-selectable" role="presentation"><a data-rgbcolor="#76B051" href="#" tabindex="-1" role="menuitem">Emerald</a></li>
              <li class="is-selectable" role="presentation"><a data-rgbcolor="#5C5C5C" href="#" tabindex="-1" role="menuitem">Graphite</a></li>
            </ul>
            <div class="arrow">
            </div>
          </div>
        </div>
      </div>
    </header>
  `]),
  /**
   * @property {Simplate}
   * Simplate that defines the toolbar item HTML Markup
   *
   * `$` - The toolbar item object
   * `$$` - The toolbar instance
   */
  toolTemplate: new Simplate([`
      <button
        class="btn-icon hide-focus {%= $.cls %}"
        type="button"
        data-action="invokeTool"
        data-tool="{%= $.id %}">
        {% if ($.svg) { %}
        <svg aria-hidden="true" focusable="false" role="presentation" class="icon">
          <use xlink:href="#icon-{%= $.svg %}"/>
        </svg>
        {% } %}
        <span class="audible">{%: $.title || $.id %}</span>
      </button>
    `,
  ]),
  /**
   * @property {Number}
   * Current number of toolbar items set
   */
  size: 0,

  /**
   * Text that is placed into the toolbar titleNode
   */
  titleText: resource.titleText,

  /**
   * Calls parent {@link Toolbar#clear clear} and removes all toolbar items from DOM.
   */
  clear: function clear() {
    this.inherited(arguments);

    query('> [data-action], .toolButton-right', this.domNode).remove();
  },
  initSoho: function sohoInit() {
    if (this._sohoInit) {
      return;
    }

    const menu = $('.application-menu', this.domNode);
    menu.applicationmenu();
    this.appMenu = menu.data('applicationmenu');

    const accordion = $('.accordion.panel', this.domNode);
    accordion.accordion();

    const header = $('.header', this.domNode);
    header.header();
    this.header = header.data('header');

    const toolbar = $('.toolbar', this.domNode);
    toolbar.toolbar();
    this.toolbar = toolbar.data('toolbar');
    this._sohoInit = true;
  },
  _sohoInit: false,
  updateSoho: function updateSoho() {
    this.initSoho();
    this.toolbar.updated();
    this.appMenu.updated();
  },
  /**
   * Calls parent {@link Toolbar#showTools showTools} which sets the tool collection.
   * The collection is then looped over and added to DOM, adding the left or right styling
   * @param {Object[]} tools Array of toolbar item definitions
   */
  showTools: function showTools(tools) {
    this.inherited(arguments);

    $(this.domNode).removeClass(`toolbar-size-${this.size}`);
    let onLine = this.app.onLine;
    if (tools) {
      const count = {
        left: 0,
        right: 0,
      };

      $(this.toolNode).empty();

      for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];
        const side = tool.side || 'right';
        const toolTemplate = tool.template || this.toolTemplate;
        count[side] += 1;
        if (tool.offline) {
          onLine = false;
        }
        $(this.toolNode).append(toolTemplate.apply(tool, this.tools[tool.id]));
      }

      this.updateSoho();

      this.size = Math.max(count.left, count.right);
      $(this.domNode).addClass(`toolbar-size-${this.size}`);
      this.setMode(onLine);
    }
  },
  /**
   * Event handler that fires when the toolbar title is clicked.
   */
  onTitleClick: function onTitleClick(/* evt*/) {},
  setMode: function setMode(onLine) {
    $(this.domNode).removeClass('offline');
    if (!onLine) {
      $(this.domNode).addClass('offline');
    }
  },
});

lang.setObject('Sage.Platform.Mobile.MainToolbar', __class);
export default __class;
