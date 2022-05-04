/*
	© 2022 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

// placeOrderCustom.ServiceController.js
// ----------------
// Service to manage placeordercustom requests

define('placeOrderCustom.ServiceController', [
  'ServiceController',
  'placeOrderCustom.Model',
  'SiteSettings.Model'
], function(ServiceController, placeOrderCustomModel, SiteSettingsModel) {
  // @class placeOrderCustom.ServiceController Manage placeordercustom data
  // @extend ServiceController
  return ServiceController.extend({
      // @property {String} name Mandatory for all ssp-libraries model
      name: 'placeOrderCustom.ServiceController',

      // @property {Service.ValidationOptions} options. All the required validation, permissions, etc.
      // The values in this object are the validation needed for the current service.
      // Can have values for all the request methods ('common' values) and specific for each one.
    //   options: function() {
    //       return {
    //           common: {
    //               requireLogin: true,
    //               requirePermissions: {
    //                   list: [
    //                       SiteSettingsModel.get().isSCISIntegrationEnabled
    //                           ? 'transactions.tranPurchases.1'
    //                           : 'transactions.tranSalesOrd.1',
    //                       'transactions.tranFind.1'
    //                   ]
    //               }
    //           }
    //       };
    //   },
    // post:function(){
    //   return placeOrderCustomModel.search(
    //     {
    //     page: this.request.getParameter('page') || 1,
    //     results_per_page:this.request.getParameter('results_per_page') || 2
    
    //   },this.data.items)

    // },
      // @method get The call to placeOrderCustom.Service.ss with http method 'get' is managed by this function
      // @return {Array<placeOrderCustom.Model.Attributes>}
      post:function(){
        // var getCustData = this.request.getParameter('custdata')
        // ItemSearchData(this.data);
        var getCustData = this.data;
        return placeOrderCustomModel.ItemSearchData(this.data);
      },
      get:function() {
          // Call the search function defined on ssp_libraries/models/placeOrderCustom.js and send the response
          const perPageValue = this.request.getParameter('ShowperPage'); 
          
          console.warn("order custom ",this.request.getParameter('order'))
          return placeOrderCustomModel.search({
            page: this.request.getParameter('page') || 1,
            results_per_page:this.request.getParameter('results_per_page') ||20,
            ShowperPage:parseInt(perPageValue),
            sort:this.request.getParameter('sort'),
            order: this.request.getParameter('order'),
            search: this.request.getParameter('search')
            
       
        
          });
      }
  });
});
