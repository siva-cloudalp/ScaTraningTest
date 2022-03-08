///<amd-module name="placeOrderCustom.View"/>
import * as _ from 'underscore';
import * as place_order_custom_tpl from 'place_order_custom.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { GlobalViewsPaginationView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Pagination.View';
import { GlobalViewsShowingCurrentView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.ShowingCurrent.View';

import { ProfileModel } from '../../../Commons/Profile/JavaScript/Profile.Model';
import LiveOrderModel = require('../../../Commons/LiveOrder/JavaScript/LiveOrder.Model');
import PlaceOrderCustomModel = require('./PlaceOrderCustom.Model');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import { object } from 'underscore';
const PlaceOrderCustomView: any = BackboneView.extend({
    // @property {Function} template
    template: place_order_custom_tpl,
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
    getBreadcrumbPages: function () {
        return {
            text: this.title,
            href: '/PlaceOrderCustom'
        };
    },
    // @propery {Object} events
    events: {
        'click [data-action="add-to-cart"]': 'addToCart',
        'click [data-action="add-to-cart-all"]': 'addToCartAll',
        'click [data-action="add-to-cart-using-url"]':'addToCartUrl'
    },
    initialize: function (options) {
        this.application = options.application;
        this.model = new PlaceOrderCustomModel();
        this.cart = LiveOrderModel.getInstance();
    },
    beforeShowContent: function () {
        var self = this;
        this.web_item_cust_data = {};
        this.Pagination = {};
        // var promise = jQuery.Deferred();
        // jQuery.get('/api/items?fieldset=details', function (result) {
        //     self.itemDetails = (result && result.total > 0) ? _.compact(result.items) : [];
        //     promise.resolve();
        // });

        return this.model.fetch().then(res => {
            this.Pagination.recordsPerPage = res.recordsPerPage;
            this.Pagination.totalRecordsFound = res.totalRecordsFound;
            return this.web_item_cust_data = res.records;

        });
    },
    addToCartUrl:function(){

//step 1:-
//For single item to addto cart  :- '/app/site/backend/additemtocart.nl?c=TSTDRV1521025&buyid=5992'
//step 2:-
// for multi items :-  '/app/site/backend/additemtocart.nl?c=TSTDRV1521025&buyid=multi&multi=6880,1;6881,2' 
// dynamic url  /app/site/backend/additemtocart.nl?c=${customerId}&buyid=multi&multi=${buyid},${qty}`


let customerId ='TSTDRV1521025';
let buyid=6894;
let qty=1;
let showcart='T';
    let promise =jQuery.Deferred();
    jQuery.get(`/app/site/backend/additemtocart.nl?c=${customerId}&buyid=multi&multi=${buyid},${qty}`,(res)=>{promise.resolve()});


    },


    addToCartAll: function (e) {
        var self = this;
        e.preventDefault();
        let line_items_all = [];
        const $form = this.$(e.target).closest('[data-type="order-items"]');
        const $alert_placeholder = $form.find('[data-type=alert-placeholder1]');
        const layout = this.application.getLayout();

    
        this.modelData.forEach(multiLines);
        function multiLines(lines){
            LiveOrderModel.getInstance().addLine({quantity:lines.quantity,item:{internalid:lines.internalid}}).done(function () {
            $alert_placeholder.show().empty();
            let message;

            message = Utils.translate(
                'Items successfully added to <a href="#" data-touchpoint="viewcart">your cart</a><br/>'
            );

            layout.showMessage($alert_placeholder, message, 'success', true);
            setTimeout(function () {
                $alert_placeholder.fadeOut(function () {
                    $alert_placeholder.empty();
                });
            }, 6000);
            // alert('succes')
        })
            .fail(function (jqXhr) {
                jqXhr.preventDefault = true;
                $alert_placeholder.show().empty();
                layout.showXHRErrorMessage($alert_placeholder, jqXhr, true);

            });
            
        }
             

        // let selected_line ={
        //     quantity: 1,
        //     item:{internalid:6843 },
        //     options:[
        //         {
        //         cartOptionId: "custcol29",
        //         value:{
        //             label: "blue",
        //             internalid:"2"
        //             },
        //             ismandatory:true
        //         }
        //     ]
        // };

        

    },
    addToCart: function (e) {
        // /api/items?id=6830&fieldset=details
        e.preventDefault();
        const self = this;
        const line_id = this.$(e.target).data('line-id');
        const $form = this.$(e.target).closest('[data-type="order-item"]');
        const $quantity = $form.find('[name=item_quantity]');
        const $alert_placeholder = $form.find('[data-type=alert-placeholder]');
        const quantity = isNaN(parseInt($quantity.val(), 10)) ? 0 : parseInt($quantity.val(), 10);


        const layout = this.application.getLayout();
        if (quantity) {
            var selected_line = {
                quantity: quantity,
                // internalid: line_id,
                // item:filterApiData[0],
                item:{internalid:line_id},
                options: []

            };
            LiveOrderModel.getInstance().addLine(selected_line).done(function () {
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
                setTimeout(function () {
                    $alert_placeholder.fadeOut(function () {
                        $alert_placeholder.empty();
                    });
                }, 6000);

            })
                .fail(function (jqXhr) {
                    jqXhr.preventDefault = true;
                    $alert_placeholder.show().empty();
                    layout.showXHRErrorMessage($alert_placeholder, jqXhr, true);
                });

        }
    },
    childViews: {
        'GlobalViews.Pagination': function () {
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
        'GlobalViews.ShowCurrentPage': function () {
            return new GlobalViewsShowingCurrentView({
                items_per_page: this.Pagination.recordsPerPage,
                total_items: this.Pagination.totalRecordsFound,
                total_pages: Math.ceil(
                    this.Pagination.totalRecordsFound / this.Pagination.recordsPerPage
                )
            });
        },
    },
    getContext: function () {
        let isLogin = ProfileModel.getInstance();
        this.modelData = [];
        this.web_item_cust_data.forEach(data => {
            if (data.items.customerId == isLogin.id) {
                this.modelData.push(data.items);
            }
        });

        // prepare the model for the frontend
        // @class placeOrderCustom.Model.Attributes
        return {
            // @property {Array} item
            itemData: this.modelData,
            // @property {number} 
            itemsLength: this.modelData.length > 0 ? true : false,
            // @property {String} name
            title: this.title
        }
    }

})
export = PlaceOrderCustomView;
