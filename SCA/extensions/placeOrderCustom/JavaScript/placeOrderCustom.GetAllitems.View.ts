///<amd-module name="placeOrderCustom.GetAllitems.View"/>
import * as _ from 'underscore';
// import * as place_order_custom_tpl from 'place_order_custom.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import * as BackboneView from '../../../Commons/BackboneExtras/JavaScript/Backbone.View';
import TransactionListView = require('../../../Commons/Transaction/JavaScript/Transaction.List.View');


const PlaceOrderCustomGetItemsView:any =  TransactionListView.extend({
  // @property {Function} template
  // template: place_order_custom_tpl,
  // @property {String} title
  title: Utils.translate('Place Order Custom'),
  // @property {String} className
  className: 'PlaceOrdercustomView',
  // @property {String} page_header
  page_header: Utils.translate('Place order web items'),
  // @property {Object} attributes
  attributes: {
      id: 'PlaceOrdercustomgetitemsView',
      class: 'PlaceOrdercustomgetitems'
  },
 
  // @propery {Object} events
  events: {
       

  },

  initialize: function (options) {
   

  },
 
 
  beforeShowContent: function () {
    
  },
  getAllItems:function(url){
      // url = '/api/items?fieldset=details' ;
      var self = this;
      var promise = jQuery.Deferred();
      jQuery.get(url,function(itemsRes){    
          if(_.has(itemsRes,'total')){
              self.items = _.union(self.items,itemsRes.items);
          }

          if(_.has(itemsRes,'links')){
              var links:any = _.findWhere(itemsRes.links,{'rel': 'next'});
              var href = _.has(links,'href')? links.href: '';
              
              if(href){    
                  self.getAllItems(href);
              }
              else{
                  promise.resolve();
                  console.log( self.items);  
              }
          }
          // promise.resolve();
      });
    },
  getContext: function () {
       console.log("hi");
      return {
         msg:"hi"
      }

  }
})
export = PlaceOrderCustomGetItemsView;

