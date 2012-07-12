define('Sage/Platform/Mobile/_SDataEditMixin', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/dom-class',
    './ErrorManager',
    './Store/SData',
    './_SDataDetailMixin'
], function(
    declare,
    string,
    domClass,
    ErrorManager,
    SData,
    _SDataDetailMixin
) {
    /**
     * SData enablement for the Detail view.
     */
    return declare('Sage.Platform.Mobile._SDataEditMixin', [_SDataDetailMixin], {
        _onRequestTemplateFailure: function(xhr, xhrOptions) {
            var error = new Error('An error occurred requesting: ' + xhrOptions.url);

            error.xhr = xhr;
            error.status = xhr.status;
            error.responseText = xhr.responseText;

            this._onFetchError(error, {});
        },
        _onRequestTemplateSuccess: function(template) {
            this._processTemplateData(template);
        },
        _requestTemplateData: function() {
            var request = this.createTemplateRequest();
            if (request)
                request.read({
                    success: this._onRequestTemplateSuccess,
                    failure: this._onRequestTemplateFailure,
                    scope: this
                });
        },
        createTemplateRequest: function() {
            var request = new Sage.SData.Client.SDataTemplateResourceRequest(this.getConnection());

            if (this.resourceKind)
                request.setResourceKind(this.resourceKind);

            if (this.querySelect)
                request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Select, this.querySelect.join(','));

            if (this.queryInclude)
                request.setQueryArg(Sage.SData.Client.SDataUri.QueryArgNames.Include, this.queryInclude.join(','));

            return request;
        }
    });
});