/*
	© 2022 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// DeleteCartItem.ServiceController.js
// ----------------
// Service to manage placeordercustom requests

define('DeleteCartItem.ServiceController', [
  'ServiceController',
  'DeleteCartItem',
  'SiteSettings.Model'
], function(ServiceController, DeleteCartItem, SiteSettingsModel) {
  // @class placeOrderCustom.ServiceController Manage placeordercustom data
  // @extend ServiceController
  return ServiceController.extend({
      // @property {String} name Mandatory for all ssp-libraries model
      name: 'DeleteCartItem.ServiceController',

      get:function() {
          // Call the search function defined on ssp_libraries/models/placeOrderCustom.js and send the response
          // const search = this.request.getParameter('search');
          // console.warn(JSON.stringify(search),"placeOrderSearch")
          
      },

      post:function() {
      
        
      }
  });
});
