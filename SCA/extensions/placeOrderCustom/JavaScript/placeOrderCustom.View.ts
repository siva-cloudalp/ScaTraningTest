///<amd-module name="placeOrderCustom.View"/>
import * as _ from 'underscore';
import * as place_order_custom_tpl from 'place_order_custom.tpl';
import * as Utils from  '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { GlobalViewsPaginationView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Pagination.View';
import { GlobalViewsShowingCurrentView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.ShowingCurrent.View';

import { ProfileModel } from '../../../Commons/Profile/JavaScript/Profile.Model';
import LiveOrderModel = require('../../../Commons/LiveOrder/JavaScript/LiveOrder.Model');
import PlaceOrderCustomModel =require('./PlaceOrderCustom.Model');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import { object } from 'underscore';
const PlaceOrderCustomView:any =BackboneView.extend({
   // @property {Function} template
 template:place_order_custom_tpl,
 // @property {String} title
 title: Utils.translate('Place Order Custom'),
 // @property {String} className
 className: 'PlaceOrdercustomView',
 // @property {String} page_header
 page_header: Utils.translate('Place order web items'),
 // @property {Object} attributes
 attributes: {
     id: 'PlaceOrdercustomView',
     class: 'PlaceOrdercustom'
 },
   // @method getBreadcrumbPages
   getBreadcrumbPages: function() {
    return {
        text: this.title,
        href: '/PlaceOrderCustom'
    };
},
// @propery {Object} events
events:{
    'click [data-action="add-to-cart"]': 'addToCart',
    'click [data-action="add-to-cart-all"]': 'addToCartAll',
},
initialize: function(options) {  
    this.application=options.application;
    this.model=new PlaceOrderCustomModel();   
 },
 beforeShowContent: function(){
     var self=this;      
    this.web_item_cust_data={};
    this.Pagination={};
    var promise = jQuery.Deferred();
    jQuery.get('/api/items?fieldset=details',function(result){
        self.itemDetails =(result && result.total>0) ? _.compact(result.items): [] ;
        promise.resolve();
      }); 
    
    return  this.model.fetch().then(res=>{
        this.Pagination.recordsPerPage =res.recordsPerPage;
        this.Pagination.totalRecordsFound =res.totalRecordsFound;
        return this.web_item_cust_data= res.records;
        
    }); 
},

addToCartAll:function(e){
    e.preventDefault();
    let line_all_ids =[];
    let line_items_all =[];
    const $form = this.$(e.target).closest('[data-type="order-items"]');
    const $alert_placeholder = $form.find('[data-type=alert-placeholder1]');
    const quantity = [];
    const layout = this.application.getLayout();
     this.modelData.map(webitem=>{
        quantity.push(webitem.quantity);
        line_all_ids.push(webitem.internalid)
         this.itemDetails.map(apiData=>{ 
            if( apiData.internalid== webitem.internalid ){
                line_items_all.push(apiData);
            }
        }) 
     });
     var selected_line = {
         item: line_items_all[3]
     };
     LiveOrderModel.getInstance().addLines(selected_line ).done(function(){
        $alert_placeholder.show().empty();
        let message;
           
            message = Utils.translate(
                'Items successfully added to <a href="#" data-touchpoint="viewcart">your cart</a><br/>'
            );
         
        layout.showMessage($alert_placeholder, message, 'success', true);
        setTimeout(function() {
            $alert_placeholder.fadeOut(function() {
                $alert_placeholder.empty();
            });
        }, 6000);
        alert('succes')
    })
    .fail(function(jqXhr) {
        alert("fail")
        jqXhr.preventDefault = true;
        $alert_placeholder.show().empty();
        layout.showXHRErrorMessage($alert_placeholder,jqXhr,true);
    
    }); 
 
},
 addToCart:function(e){
    // /api/items?id=6830&fieldset=details
    e.preventDefault();
    const self = this;  
        const line_id = this.$(e.target).data('line-id');
        const $form = this.$(e.target).closest('[data-type="order-item"]');
        const $quantity =$form.find('[name=item_quantity]');
        const $alert_placeholder = $form.find('[data-type=alert-placeholder]');
        const quantity = isNaN(parseInt($quantity.val(), 10)) ? 0 : parseInt($quantity.val(), 10);
        
        var filterApiData=[];	
        
        this.itemDetails.forEach(itemSearch);
        function itemSearch(item) {              
            if(item.internalid == line_id ){
                filterApiData.push(item);                      
            } 
        };
    
        
        const layout = this.application.getLayout();
        if (quantity) {
            var selected_line = {
                internalid:line_id,
                item:filterApiData[0],
                location:"",
                fulfillmentChoice:'ship',
                quantity:quantity,
                options:[]
            };
            LiveOrderModel.getInstance().addLine(selected_line).done(function(){
                $alert_placeholder.show().empty();
                let message;
                if (quantity > 1) {
                    message = Utils.translate(
                        '$(0) Items successfully added to <a href="#" data-touchpoint="viewcart">your cart</a><br/>',
                        quantity
                    );
                } else {
                    message = Utils.translate(
                        'Item successfully added to <a href="#" data-touchpoint="viewcart">your cart</a><br/>'
                    );
                }
                layout.showMessage($alert_placeholder, message, 'success', true);
                setTimeout(function() {
                    $alert_placeholder.fadeOut(function() {
                        $alert_placeholder.empty();
                    });
                }, 6000);
    
            })
            .fail(function(jqXhr) {
                jqXhr.preventDefault = true;
                $alert_placeholder.show().empty();
                layout.showXHRErrorMessage($alert_placeholder, jqXhr, true);
            });

        }       
 },
 childViews: {
    'GlobalViews.Pagination': function() {
        return new GlobalViewsPaginationView(
            _.extend(
                {
                    totalPages: Math.ceil(
                        this.Pagination.totalRecordsFound / this.Pagination.recordsPerPage
                    )
                }
            )
        );
    },
    'GlobalViews.ShowCurrentPage': function() {
        return new GlobalViewsShowingCurrentView({
            items_per_page: this.Pagination.recordsPerPage,
            total_items: this.Pagination.totalRecordsFound,
            total_pages: Math.ceil(
                this.Pagination.totalRecordsFound / this.Pagination.recordsPerPage
            )
        });
    },
},
getContext: function() {     
     let isLogin =ProfileModel.getInstance();
    this.modelData=[];
    this.web_item_cust_data.forEach(data=>{
        if(data.items.customerId==isLogin.id){
            this.modelData.push(data.items);
        }         
    });    

    console.log(this.modelData);
    
    // prepare the model for the frontend
    // @class placeOrderCustom.Model.Attributes
   return{
        // @property {Array} item
        itemData:this.modelData,
        // @property {number} 
        itemsLength:this.modelData.length >0 ? true:false,
        // @property {String} name
        title:this.title
        }
    }

})
export =PlaceOrderCustomView;