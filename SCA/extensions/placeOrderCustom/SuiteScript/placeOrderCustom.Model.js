/*
  © 2022 NetSuite Inc.
  User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
  provided, however, if you are an authorized user with a NetSuite account or log-in, you
  may use this code subject to the terms that govern your access and use.
*/

// placeOrderCustom.Model.js
// ----------
// Handles fetching of website Item Data custom records
define('placeOrderCustom.Model', [
  'SC.Model',
  'SC.Models.Init',
  'Application',
  'StoreItem.Model',
  'SiteSettings.Model',
  'Utils',
  'underscore',
  'Transaction.Model',
  'Configuration'
], function (
  SCModel,
  ModelsInit,
  Application,
  StoreItem,
  SiteSettings,
  Utils,
  _,
  Transaction,
  Configuration
) {
  // @class placeOrderCustom.Model Defines the model used by the placeOrderCustom.Service.ss service
  // @extends SCModel
  return SCModel.extend({
    name: 'placeOrderCustom',
    search: function () {
      let  filters = [];
      filters.push(new nlobjSearchFilter('custrecord_web_customer','is',nlapiGetUser()));
      var columns = [];
      columns.push(new nlobjSearchColumn('custrecord_web_item'));
      columns.push(new nlobjSearchColumn('custrecord_web_rate'));
      columns.push(new nlobjSearchColumn('custrecordcustrecord_web_quantity'));
      columns.push(new nlobjSearchColumn('custrecord_web_size'));
      columns.push(new nlobjSearchColumn('custrecord_web_color'));
      columns.push(new nlobjSearchColumn('custrecord_web_customer'));
      columns.push(new nlobjSearchColumn('custrecordcustrecord_web_url'));
  
      const result = Application.getPaginatedSearchResults({
        record_type: 'customrecord_web_item_data',
        columns:columns,
        recordsPerPage:2       
    });
  
  
    result.records = _.map(result.records, function(line) {
        // prepare the collection for the frontend
        // @class placeordercustom.Model.Attributes
        console.warn(line.getValue('custrecord_web_color'),"placeordercustom");
        return {
          items:{ 
            internalid:line.getValue('custrecord_web_item'),
            displayname:line.getText('custrecord_web_item'),
            pricelevel1:parseInt(line.getValue('custrecord_web_rate')),
            pricelevel1_formatted:`$ ${line.getValue('custrecord_web_rate')}`,
            quantity:parseInt(line.getValue('custrecordcustrecord_web_quantity')),
            color:line.getValue('custrecord_web_color'),
            size:line.getValue('custrecord_web_size'),
            customerName:line.getText('custrecord_web_customer'),
            customerId:line.getValue('custrecord_web_customer'),
            url:line.getValue('custrecordcustrecord_web_url'),

          }   
        };
        // @class placeordercustom.Model
    });


      return result;
    }
  });



})
