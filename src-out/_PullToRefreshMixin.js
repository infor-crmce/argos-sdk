<<<<<<< HEAD
define('argos/_PullToRefreshMixin', ['exports', 'module', 'dojo/_base/declare', 'dojo/dom-attr', 'dojo/dom-class', 'dojo/dom-construct', 'dojo/dom-geometry', 'dojo/dom-style', 'dojo/dom'], function (exports, module, _dojo_baseDeclare, _dojoDomAttr, _dojoDomClass, _dojoDomConstruct, _dojoDomGeometry, _dojoDomStyle, _dojoDom) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _domAttr = _interopRequireDefault(_dojoDomAttr);

    var _domClass = _interopRequireDefault(_dojoDomClass);

    var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

    var _domGeom = _interopRequireDefault(_dojoDomGeometry);

    var _domStyle = _interopRequireDefault(_dojoDomStyle);

    var _dom = _interopRequireDefault(_dojoDom);

    var __class;

    /**
     * @class argos._PullToRefreshMixin
     * Mixin for pull to refresh actions
     * @alternateClassName _PullToRefreshMixin
     */
    __class = (0, _declare['default'])('argos._PullToRefreshMixin', null, {
        /**
         * @property {Simplate}
         */
        pullRefreshBannerTemplate: new Simplate(['<div class="pull-to-refresh">{%! $.pullRefreshTemplate %}</div>']),
=======
/**
 * @class argos._PullToRefreshMixin
 * Mixin for pull to refresh actions
 * @alternateClassName _PullToRefreshMixin
 */
define('argos/_PullToRefreshMixin', [
    'dojo/_base/declare',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/dom-geometry',
    'dojo/dom-style',
    'dojo/dom'
], function(
    declare,
    domAttr,
    domClass,
    domConstruct,
    domGeom,
    domStyle,
    dom
) {
    var __class;

    __class = declare('argos._PullToRefreshMixin', null, {
        /**
         * @property {Simplate}
         */
        pullRefreshBannerTemplate: new Simplate([
            '<div class="pull-to-refresh">{%! $.pullRefreshTemplate %}</div>'
        ]),
>>>>>>> develop

        /**
         * @property {Simplate}
         */
<<<<<<< HEAD
        pullRefreshTemplate: new Simplate(['<span class="fa fa-long-arrow-down"></span>{%= $$._getText("pullRefreshText") %}']),
=======
        pullRefreshTemplate: new Simplate([
            '<span class="fa fa-long-arrow-down"></span>{%= $$._getText("pullRefreshText") %}'
        ]),
>>>>>>> develop

        /**
         * @property {Simplate}
         */
<<<<<<< HEAD
        pullReleaseTemplate: new Simplate(['<span class="fa fa-long-arrow-up"></span>{%= $$._getText("pullReleaseText") %}']),
=======
        pullReleaseTemplate: new Simplate([
            '<span class="fa fa-long-arrow-up"></span>{%= $$._getText("pullReleaseText") %}'
        ]),
>>>>>>> develop

        /**
         * @property {String}
         * Text to indicate a pull to refresh
         */
        pullRefreshText: 'Pull down to refresh...',
        /**
         * @property {String}
         * Text to indicate the user should release to cause the refresh
         */
        pullReleaseText: 'Release to refresh...',

        /**
         * @property {Boolean} enablePullToRefresh If true, will enable the user to drag down and refresh the list. Default is true.
         */
        enablePullToRefresh: true,

        /**
         * @property {DOMNode}
         */
        pullRefreshBanner: null,

        /**
         * @property {DOMNode}
         */
        scrollerNode: null,

        _onTouchStartHandle: null,
        _onTouchEndHandle: null,
        _onTouchMoveHandle: null,
        _onTouchCancelHandle: null,

<<<<<<< HEAD
        _getText: function _getText(prop) {
=======
        _getText: function(prop) {
>>>>>>> develop
            return __class.prototype[prop];
        },

        /**
         * @static
         * @property {Object}
         * Stores the current pull to refresh data. Do not store object refs here, this structure is static.
         */
        pullToRefresh: {
            originalTop: '0px',
            originalOverflow: '',
            bannerHeight: 0,
            scrollerHeight: 0,
            scrollerWidth: 0,
            dragTop: 0,
            pulling: false,
            dragStartX: 0,
            dragStartY: 0,
            lastX: 0,
            lastY: 0,
            results: false,
            animateCls: 'animate'
        },

        /**
         * @param {DOMNode} scrollerNode The node that scrollers and should be pulled on to refresh.
         */
<<<<<<< HEAD
        initPullToRefresh: function initPullToRefresh(scrollerNode) {
=======
        initPullToRefresh: function(scrollerNode) {
>>>>>>> develop
            if (!this.enablePullToRefresh || !window.App.supportsTouch() || !scrollerNode) {
                return;
            }

<<<<<<< HEAD
            this.pullRefreshBanner = _domConstruct['default'].toDom(this.pullRefreshBannerTemplate.apply(this));
            _domConstruct['default'].place(this.pullRefreshBanner, scrollerNode, 'before');
=======
            this.pullRefreshBanner = domConstruct.toDom(this.pullRefreshBannerTemplate.apply(this));
            domConstruct.place(this.pullRefreshBanner, scrollerNode, 'before');
>>>>>>> develop

            // Pull down to refresh touch handles
            this.scrollerNode = scrollerNode;
            this._onTouchStartHandle = this.connect(scrollerNode, 'ontouchstart', this._onTouchStart.bind(this));
            this._onTouchMoveHandle = this.connect(scrollerNode, 'ontouchmove', this._onTouchMove.bind(this));
            this._onTouchCancelHandle = this.connect(scrollerNode, 'ontouchcancel', this._onEndTouchDrag.bind(this));
            this._onTouchEndHandle = this.connect(scrollerNode, 'ontouchend', this._onEndTouchDrag.bind(this));
        },

        /**
         * Derived class must implement this to determine when pull to refresh should start. This is called when onTouchStart is fired.
         * @param {DOMNode} scrollerNode
         * Reference to the scoller node
         * @returns {Boolean}
         */
<<<<<<< HEAD
        shouldStartPullToRefresh: function shouldStartPullToRefresh(scrollerNode) {
=======
        shouldStartPullToRefresh: function(scrollerNode) {
>>>>>>> develop
            var scrollTop;
            scrollTop = scrollerNode.scrollTop; // How far we are scrolled down, this should be 0 before we start dragging the pull refresh
            return scrollTop === 0;
        },

<<<<<<< HEAD
        _onTouchStart: function _onTouchStart(evt) {
=======
        _onTouchStart: function(evt) {
>>>>>>> develop
            var scrollTop, position, style, bannerPos, scrollerNode;

            this.pullToRefresh.pulling = false;
            this.pullToRefresh.results = false;

            scrollerNode = this.scrollerNode;

            if (!scrollerNode) {
                return;
            }

            scrollTop = scrollerNode.scrollTop; // How far we are scrolled down, this should be 0 before we start dragging the pull refresh

<<<<<<< HEAD
            if (this.shouldStartPullToRefresh(scrollerNode)) {
                //) {
                position = _domGeom['default'].position(scrollerNode);
                bannerPos = _domGeom['default'].position(this.pullRefreshBanner);
                style = _domStyle['default'].getComputedStyle(scrollerNode); // expensive
=======
            if (this.shouldStartPullToRefresh(scrollerNode)) { //) {
                position = domGeom.position(scrollerNode);
                bannerPos = domGeom.position(this.pullRefreshBanner);
                style = domStyle.getComputedStyle(scrollerNode); // expensive
>>>>>>> develop
                this.pullToRefresh.bannerHeight = bannerPos.h;
                this.pullToRefresh.scrollerHeight = position.h;
                this.pullToRefresh.scrollerWidth = position.w;
                this.pullToRefresh.originalTop = style.top;
                this.pullToRefresh.originalOverflow = style.overflow;
                this.pullToRefresh.dragTop = parseInt(style.top, 10);
                this.pullToRefresh.dragStartY = this.pullToRefresh.lastY = evt.clientY;
                this.pullToRefresh.dragStartX = this.pullToRefresh.lastX = evt.clientX;

                this.pullToRefresh.pulling = true;

<<<<<<< HEAD
                _domStyle['default'].set(this.pullRefreshBanner, 'visibility', 'visible');
            }
        },
        _onTouchMove: function _onTouchMove(evt) {
            var top,
                distance,
                PULL_PADDING = 20,
                MAX_DISTANCE,
                scrollerNode;
=======
                domStyle.set(this.pullRefreshBanner, 'visibility', 'visible');
            }
        },
        _onTouchMove: function(evt) {
            var top, distance, PULL_PADDING = 20, MAX_DISTANCE, scrollerNode;
>>>>>>> develop

            scrollerNode = this.scrollerNode;

            if (!this.pullToRefresh.pulling || !scrollerNode) {
                return;
            }

<<<<<<< HEAD
            _domClass['default'].remove(scrollerNode, this.pullToRefresh.animateCls);
=======
            domClass.remove(scrollerNode, this.pullToRefresh.animateCls);
>>>>>>> develop

            // distance from last drag
            distance = evt.clientY - this.pullToRefresh.lastY;

            MAX_DISTANCE = this.pullToRefresh.bannerHeight + PULL_PADDING;

            // slow down the pull down speed a bit, the user has to drag a bit futher, but it feels a bit more smooth
            distance = distance / 2;

            if (distance >= 0) {
                evt.preventDefault();
                top = this.pullToRefresh.dragTop;

                top = top + distance;
                _domStyle['default'].set(scrollerNode, {
                    'top': top + 'px',
                    'overflow': 'hidden'
                });

                if (distance > MAX_DISTANCE) {
                    // The user has pulled down the max distance required to trigger a refresh
                    this.pullToRefresh.results = true;
                    this.pullRefreshBanner.innerHTML = this.pullReleaseTemplate.apply(this);
                } else {
                    // The user pulled down, but not far enough to trigger a refresh
                    this.pullToRefresh.results = false;
                    this.pullRefreshBanner.innerHTML = this.pullRefreshTemplate.apply(this);
                }
            }
        },
<<<<<<< HEAD
        _onEndTouchDrag: function _onEndTouchDrag() {
=======
        _onEndTouchDrag: function() {
>>>>>>> develop
            var scrollerNode;

            scrollerNode = this.scrollerNode;

            if (!this.pullRefreshBanner || !scrollerNode || !this.pullToRefresh.pulling) {
                return;
            }

            // Restore our original scroller styles
            _domStyle['default'].set(scrollerNode, {
                'top': this.pullToRefresh.originalTop,
                'overflow': this.pullToRefresh.originalOverflow
            });

<<<<<<< HEAD
            _domStyle['default'].set(this.pullRefreshBanner, 'visibility', 'hidden');

            _domClass['default'].add(scrollerNode, this.pullToRefresh.animateCls);
=======
            domStyle.set(this.pullRefreshBanner, 'visibility', 'hidden');

            domClass.add(scrollerNode, this.pullToRefresh.animateCls);
>>>>>>> develop

            // Trigger a refresh
            if (this.pullToRefresh.results) {
                this.onPullToRefreshComplete();
            } else {
                this.onPullToRefreshCancel();
            }

            this.pullToRefresh.pulling = false;
            this.pullToRefresh.results = false;
        },

        /**
         * Fires when the pull to refresh is successful.
         */
<<<<<<< HEAD
        onPullToRefreshComplete: function onPullToRefreshComplete() {},
=======
        onPullToRefreshComplete: function() {
        },
>>>>>>> develop

        /**
         * Fires when the pull to refresh is canceled.
         */
<<<<<<< HEAD
        onPullToRefreshCancel: function onPullToRefreshCancel() {}
    });

    module.exports = __class;
=======
        onPullToRefreshCancel: function() {
        }
    });

    return __class;
>>>>>>> develop
});

