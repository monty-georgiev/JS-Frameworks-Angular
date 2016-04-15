'use strict';

app.factory('adsService',
    function ($resource, baseServiceUrl) {

        var adsResource = $resource(baseServiceUrl + '/api/ads',
            null,
            {
                'getAll': {method: 'GET'}
            }
        );

        return {
            getAds: function (params, success, error) {
                return adsResource.getAll(params, success, error);
            }
        };
    }
);
app.factory('townsService',
    function ($resource, baseServiceUrl) {
        return {};
    });
app.factory('categoriesService', function ($resource, baseServiceUrl) {
        return {};
    }
);
