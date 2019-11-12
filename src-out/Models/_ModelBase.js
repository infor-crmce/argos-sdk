define('argos/Models/_ModelBase', ['module', 'exports', 'dojo/_base/declare', 'dojo/Evented', 'dojo/Stateful', '../Utility', '../_CustomizationMixin'], function (module, exports, _declare, _Evented, _Stateful, _Utility, _CustomizationMixin2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Evented2 = _interopRequireDefault(_Evented);

  var _Stateful2 = _interopRequireDefault(_Stateful);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _CustomizationMixin3 = _interopRequireDefault(_CustomizationMixin2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = (0, _declare2.default)('argos.Models._ModelBase', [_Evented2.default, _Stateful2.default, _CustomizationMixin3.default], /** @lends argos.Models_ModelBase# */{
    id: null,
    customizationSet: 'models',
    app: null,
    resourceKind: null,
    itemsProperty: '$resources',
    idProperty: '$key',
    labelProperty: '$descriptor',
    entityProperty: '$name',
    versionProperty: '$etag',
    entityName: 'Entity',
    entityDisplayName: 'Entity',
    entityDisplayNamePlural: 'Entities',
    /**
     * @cfg {Boolean}
     * Enables the use of the customization engine on this model instance
     */
    enableCustomizations: true,
    modelName: null,
    modelType: null,
    iconClass: 'url',
    picklists: null,
    detailViewId: null,
    listViewId: null,
    editViewId: null,
    relationships: null,
    createRelationships: function createRelationships() {
      return [];
    },
    createPicklists: function createPicklists() {
      return [];
    },
    _appGetter: function _appGetter() {
      return this.app || window.App;
    },
    _appSetter: function _appSetter(value) {
      this.app = value;
    },

    /**
     * Initializes the model with options.
     * @param options
     */
    init: function init() {
      this.relationships = this.relationships || this._createCustomizedLayout(this.createRelationships(), 'relationships');
      this.picklists = this.picklists || this._createCustomizedLayout(this.createPicklists(), 'picklists');
      this.getPicklists();
    },
    getEntry: function getEntry(options) {// eslint-disable-line
    },
    getEntries: function getEntries(query, options) {// eslint-disable-line
    },
    getPicklists: function getPicklists() {},
    insertEntry: function insertEntry(entry, options) {// eslint-disable-line
    },
    updateEntry: function updateEntry(entry, options) {// eslint-disable-line
    },
    deleteEntry: function deleteEntry(entry, options) {// eslint-disable-line
    },
    saveEntry: function saveEntry(entry, options) {// eslint-disable-line
    },
    getIconClass: function getIconClass() {
      return this.iconClass;
    },
    getEntityDescription: function getEntityDescription(entry) {
      return _Utility2.default.getValue(entry, this.labelProperty);
    },
    getEntityId: function getEntityId(entry) {
      return _Utility2.default.getValue(entry, this.idProperty);
    },
    getPicklistNameByProperty: function getPicklistNameByProperty(property) {
      var picklist = this.picklists.find(function (pl) {
        return pl.property === property;
      });
      return picklist && picklist.name || null;
    },
    buildQueryExpression: function buildQueryExpression(query, options) {// eslint-disable-line
    },
    buildRelatedQueryExpression: function buildRelatedQueryExpression(relationship, entry) {// eslint-disable-line
    }
  });
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2RlbHMvX01vZGVsQmFzZS5qcyJdLCJuYW1lcyI6WyJpZCIsImN1c3RvbWl6YXRpb25TZXQiLCJhcHAiLCJyZXNvdXJjZUtpbmQiLCJpdGVtc1Byb3BlcnR5IiwiaWRQcm9wZXJ0eSIsImxhYmVsUHJvcGVydHkiLCJlbnRpdHlQcm9wZXJ0eSIsInZlcnNpb25Qcm9wZXJ0eSIsImVudGl0eU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwiZW5hYmxlQ3VzdG9taXphdGlvbnMiLCJtb2RlbE5hbWUiLCJtb2RlbFR5cGUiLCJpY29uQ2xhc3MiLCJwaWNrbGlzdHMiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsInJlbGF0aW9uc2hpcHMiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwiY3JlYXRlUGlja2xpc3RzIiwiX2FwcEdldHRlciIsIndpbmRvdyIsIkFwcCIsIl9hcHBTZXR0ZXIiLCJ2YWx1ZSIsImluaXQiLCJfY3JlYXRlQ3VzdG9taXplZExheW91dCIsImdldFBpY2tsaXN0cyIsImdldEVudHJ5Iiwib3B0aW9ucyIsImdldEVudHJpZXMiLCJxdWVyeSIsImluc2VydEVudHJ5IiwiZW50cnkiLCJ1cGRhdGVFbnRyeSIsImRlbGV0ZUVudHJ5Iiwic2F2ZUVudHJ5IiwiZ2V0SWNvbkNsYXNzIiwiZ2V0RW50aXR5RGVzY3JpcHRpb24iLCJnZXRWYWx1ZSIsImdldEVudGl0eUlkIiwiZ2V0UGlja2xpc3ROYW1lQnlQcm9wZXJ0eSIsInByb3BlcnR5IiwicGlja2xpc3QiLCJmaW5kIiwicGwiLCJuYW1lIiwiYnVpbGRRdWVyeUV4cHJlc3Npb24iLCJidWlsZFJlbGF0ZWRRdWVyeUV4cHJlc3Npb24iLCJyZWxhdGlvbnNoaXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkF1QmUsdUJBQVEseUJBQVIsRUFBbUMscUVBQW5DLEVBQTZFLHFDQUFxQztB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RSxVQUFNQyxXQUFXLEtBQUs5QixTQUFMLENBQWUrQixJQUFmLENBQW9CO0FBQUEsZUFBTUMsR0FBR0gsUUFBSCxLQUFnQkEsUUFBdEI7QUFBQSxPQUFwQixDQUFqQjtBQUNBLGFBQVFDLFlBQVlBLFNBQVNHLElBQXRCLElBQStCLElBQXRDO0FBQ0QsS0ExRThIO0FBMkUvSEMsMEJBQXNCLFNBQVNBLG9CQUFULENBQThCaEIsS0FBOUIsRUFBcUNGLE9BQXJDLEVBQThDLENBQUU7QUFDckUsS0E1RThIO0FBNkUvSG1CLGlDQUE2QixTQUFTQSwyQkFBVCxDQUFxQ0MsWUFBckMsRUFBbURoQixLQUFuRCxFQUEwRCxDQUFFO0FBQ3hGO0FBOUU4SCxHQUFsSCxDIiwiZmlsZSI6Il9Nb2RlbEJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBFdmVudGVkIGZyb20gJ2Rvam8vRXZlbnRlZCc7XHJcbmltcG9ydCBTdGF0ZWZ1bCBmcm9tICdkb2pvL1N0YXRlZnVsJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnLi4vVXRpbGl0eSc7XHJcbmltcG9ydCBfQ3VzdG9taXphdGlvbk1peGluIGZyb20gJy4uL19DdXN0b21pemF0aW9uTWl4aW4nO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBhcmdvcy5Nb2RlbHMuX01vZGVsQmFzZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZGVjbGFyZSgnYXJnb3MuTW9kZWxzLl9Nb2RlbEJhc2UnLCBbRXZlbnRlZCwgU3RhdGVmdWwsIF9DdXN0b21pemF0aW9uTWl4aW5dLCAvKiogQGxlbmRzIGFyZ29zLk1vZGVsc19Nb2RlbEJhc2UjICove1xyXG4gIGlkOiBudWxsLFxyXG4gIGN1c3RvbWl6YXRpb25TZXQ6ICdtb2RlbHMnLFxyXG4gIGFwcDogbnVsbCxcclxuICByZXNvdXJjZUtpbmQ6IG51bGwsXHJcbiAgaXRlbXNQcm9wZXJ0eTogJyRyZXNvdXJjZXMnLFxyXG4gIGlkUHJvcGVydHk6ICcka2V5JyxcclxuICBsYWJlbFByb3BlcnR5OiAnJGRlc2NyaXB0b3InLFxyXG4gIGVudGl0eVByb3BlcnR5OiAnJG5hbWUnLFxyXG4gIHZlcnNpb25Qcm9wZXJ0eTogJyRldGFnJyxcclxuICBlbnRpdHlOYW1lOiAnRW50aXR5JyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogJ0VudGl0eScsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6ICdFbnRpdGllcycsXHJcbiAgLyoqXHJcbiAgICogQGNmZyB7Qm9vbGVhbn1cclxuICAgKiBFbmFibGVzIHRoZSB1c2Ugb2YgdGhlIGN1c3RvbWl6YXRpb24gZW5naW5lIG9uIHRoaXMgbW9kZWwgaW5zdGFuY2VcclxuICAgKi9cclxuICBlbmFibGVDdXN0b21pemF0aW9uczogdHJ1ZSxcclxuICBtb2RlbE5hbWU6IG51bGwsXHJcbiAgbW9kZWxUeXBlOiBudWxsLFxyXG4gIGljb25DbGFzczogJ3VybCcsXHJcbiAgcGlja2xpc3RzOiBudWxsLFxyXG4gIGRldGFpbFZpZXdJZDogbnVsbCxcclxuICBsaXN0Vmlld0lkOiBudWxsLFxyXG4gIGVkaXRWaWV3SWQ6IG51bGwsXHJcbiAgcmVsYXRpb25zaGlwczogbnVsbCxcclxuICBjcmVhdGVSZWxhdGlvbnNoaXBzOiBmdW5jdGlvbiBjcmVhdGVSZWxhdGlvbnNoaXBzKCkge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH0sXHJcbiAgY3JlYXRlUGlja2xpc3RzOiBmdW5jdGlvbiBjcmVhdGVQaWNrbGlzdHMoKSB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfSxcclxuICBfYXBwR2V0dGVyOiBmdW5jdGlvbiBfYXBwR2V0dGVyKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXBwIHx8IHdpbmRvdy5BcHA7XHJcbiAgfSxcclxuICBfYXBwU2V0dGVyOiBmdW5jdGlvbiBfYXBwU2V0dGVyKHZhbHVlKSB7XHJcbiAgICB0aGlzLmFwcCA9IHZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemVzIHRoZSBtb2RlbCB3aXRoIG9wdGlvbnMuXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKi9cclxuICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgdGhpcy5yZWxhdGlvbnNoaXBzID0gdGhpcy5yZWxhdGlvbnNoaXBzIHx8IHRoaXMuX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQodGhpcy5jcmVhdGVSZWxhdGlvbnNoaXBzKCksICdyZWxhdGlvbnNoaXBzJyk7XHJcbiAgICB0aGlzLnBpY2tsaXN0cyA9IHRoaXMucGlja2xpc3RzIHx8IHRoaXMuX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQodGhpcy5jcmVhdGVQaWNrbGlzdHMoKSwgJ3BpY2tsaXN0cycpO1xyXG4gICAgdGhpcy5nZXRQaWNrbGlzdHMoKTtcclxuICB9LFxyXG4gIGdldEVudHJ5OiBmdW5jdGlvbiBnZXRFbnRyeShvcHRpb25zKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG4gIGdldEVudHJpZXM6IGZ1bmN0aW9uIGdldEVudHJpZXMocXVlcnksIG9wdGlvbnMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbiAgZ2V0UGlja2xpc3RzOiBmdW5jdGlvbiBnZXRQaWNrbGlzdHMoKSB7XHJcbiAgfSxcclxuICBpbnNlcnRFbnRyeTogZnVuY3Rpb24gaW5zZXJ0RW50cnkoZW50cnksIG9wdGlvbnMpIHsvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfSxcclxuICB1cGRhdGVFbnRyeTogZnVuY3Rpb24gdXBkYXRlRW50cnkoZW50cnksIG9wdGlvbnMpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbiAgZGVsZXRlRW50cnk6IGZ1bmN0aW9uIGRlbGV0ZUVudHJ5KGVudHJ5LCBvcHRpb25zKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG4gIHNhdmVFbnRyeTogZnVuY3Rpb24gc2F2ZUVudHJ5KGVudHJ5LCBvcHRpb25zKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG4gIGdldEljb25DbGFzczogZnVuY3Rpb24gZ2V0SWNvbkNsYXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaWNvbkNsYXNzO1xyXG4gIH0sXHJcbiAgZ2V0RW50aXR5RGVzY3JpcHRpb246IGZ1bmN0aW9uIGdldEVudGl0eURlc2NyaXB0aW9uKGVudHJ5KSB7XHJcbiAgICByZXR1cm4gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgdGhpcy5sYWJlbFByb3BlcnR5KTtcclxuICB9LFxyXG4gIGdldEVudGl0eUlkOiBmdW5jdGlvbiBnZXRFbnRpdHlJZChlbnRyeSkge1xyXG4gICAgcmV0dXJuIHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksIHRoaXMuaWRQcm9wZXJ0eSk7XHJcbiAgfSxcclxuICBnZXRQaWNrbGlzdE5hbWVCeVByb3BlcnR5OiBmdW5jdGlvbiBnZXRQaWNrbGlzdE5hbWVCeVByb3BlcnR5KHByb3BlcnR5KSB7XHJcbiAgICBjb25zdCBwaWNrbGlzdCA9IHRoaXMucGlja2xpc3RzLmZpbmQocGwgPT4gcGwucHJvcGVydHkgPT09IHByb3BlcnR5KTtcclxuICAgIHJldHVybiAocGlja2xpc3QgJiYgcGlja2xpc3QubmFtZSkgfHwgbnVsbDtcclxuICB9LFxyXG4gIGJ1aWxkUXVlcnlFeHByZXNzaW9uOiBmdW5jdGlvbiBidWlsZFF1ZXJ5RXhwcmVzc2lvbihxdWVyeSwgb3B0aW9ucykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfSxcclxuICBidWlsZFJlbGF0ZWRRdWVyeUV4cHJlc3Npb246IGZ1bmN0aW9uIGJ1aWxkUmVsYXRlZFF1ZXJ5RXhwcmVzc2lvbihyZWxhdGlvbnNoaXAsIGVudHJ5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICB9LFxyXG59KTtcclxuIl19