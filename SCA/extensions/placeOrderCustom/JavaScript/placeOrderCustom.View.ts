///<amd-module name="placeOrderCustom.View"/>
import * as _ from 'underscore';
import * as place_order_custom_tpl from 'place_order_custom.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { GlobalViewsPaginationView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Pagination.View';
import { GlobalViewsShowingCurrentView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.ShowingCurrent.View';
import { ListHeaderView } from '../../../Commons/ListHeader/JavaScript/ListHeader.View';
import LiveOrderModel = require('../../../Commons/LiveOrder/JavaScript/LiveOrder.Model');
import PlaceOrderCustomModel = require('./PlaceOrderCustom.Model');
import placeorderCustomCollection = require('./placeOrderCustom.Collection');
import TransactionListView = require('../../../Commons/Transaction/JavaScript/Transaction.List.View');
import FacetsItemListShowSelectorView = require('../../../Commons/Facets/JavaScript/Facets.ItemListShowSelector.View')
// import Backbone = require('../../../Commons/Core/JavaScript/backbone/backbone');
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
const PlaceOrderCustomView: any = TransactionListView.extend({
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
        'click [data-action="add-to-cart-using-url"]': 'addToCartUrl',
        'click [data-action="srchbtn"]': 'submitSearch'

    },
    initialize: function (options) {
        this.option = options
        this.application = options.application;
        this.model = new PlaceOrderCustomModel();
        this.collection = new placeorderCustomCollection();
        this.resultPage = [];
        var url = Backbone.history.fragment;
        _.each(SC.CONFIGURATION.showresultsPerPage, (val: any) => {
            var select;
            val.isDefault ? select = true : select = false;
            this.resultPage.push(
                {
                    selected: select,
                    name: `${val.name} ${val.items}`,
                    value: `${val.items}`
                }
            )
        });

        this.listenCollection();
        this.listHeader = new ListHeaderView({
            view: this,
            application: this.application,
            collection: this.collection,
            sorts: this.sortOptions,
            ShowperPage: this.resultPage,
            Showsearch: true,
            hidePagination: true,
            SearchVal: Utils.getParameterByName(url, 'search'),
            allowEmptyBoundaries: true,
            jsonData: JSON.stringify(this.collection)


        });
        this.collection.on('reset', this.render, this);
    },
    // @method listenCollection
    listenCollection: function () {
        this.setLoading(true);

        this.collection.on({
            request: jQuery.proxy(this, 'setLoading', true),
            reset: jQuery.proxy(this, 'setLoading', false)
        });
    },
    // @method setLoading
    setLoading: function (value) {
        this.isLoading = value;
    },

    sortOptions: [
        {
            value: "name",
            name: Utils.translate('By Name'),
            selected: true
        },
        {
            value: "id",
            name: Utils.translate('By Internalid'),
        },
        {
            value: "price",
            name: Utils.translate('By Price'),
        }
    ],

    addToCartUrl: function () {

        //step 1:-
        //For single item to addto cart  :- '/app/site/backend/additemtocart.nl?c=TSTDRV1521025&buyid=5992'
        //step 2:-
        // for multi items :-  '/app/site/backend/additemtocart.nl?c=TSTDRV1521025&buyid=multi&multi=6880,1;6881,2' 
        // dynamic url  /app/site/backend/additemtocart.nl?c=${customerId}&buyid=multi&multi=${buyid},${qty}`

        let customerId = 'TSTDRV1521025';
        let buyid = 6882;
        let qty = 1;
        let showcart = 'T';
        let promise = jQuery.Deferred();


        // jQuery.get(`item/app/site/backend/additemtocart.nl?c=${customerId}&buyid=multi&multi=${buyid},${qty}`);


    },
    addToCartAll: function (e) {
        e.preventDefault();
        const $form = this.$(e.target).closest('[data-type="order-items"]');
        const $alert_placeholder = $form.find('[data-type=alert-placeholder1]');
        const layout = this.application.getLayout();
        _.each(this.collection.models, (line: any) => {

            LiveOrderModel.getInstance().addLines(
                {
                    quantity: line.items.quantity,
                    item: { internalid: line.items.LineId }
                }
            ).done(function () {
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
            })
                .fail(function (jqXhr) {
                    jqXhr.preventDefault = true;
                    $alert_placeholder.show().empty();
                    layout.showXHRErrorMessage($alert_placeholder, jqXhr, true);

                });
            })
    },
    addToCart: function (e) {
        const line_id = this.$(e.target).data('line-id');
        const $form = this.$(e.target).closest('[data-type="order-item"]');
        const $quantity = $form.find('[name=item_quantity]');
        const $alert_placeholder = $form.find('[data-type=alert-placeholder]');
        const quantity = isNaN(parseInt($quantity.val(), 10)) ? 0 : parseInt($quantity.val(), 10);
        const layout = this.application.getLayout();
        LiveOrderModel.getInstance().addLine({
            quantity: quantity,
            item: { internalid: line_id }
        }).done(function () {
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

    },
    childViews: {
        'List.Header': function () {
            return this.listHeader;
        },
        'Facets.ItemListShowSelector': function () {
            return new FacetsItemListShowSelectorView({
                options: SC.CONFIGURATION.resultsPerPage,
            });
        },
        'GlobalViews.Pagination': function () {
            let perPage = parseInt(this.collection.recordsPerPage)
            if (perPage)
                return new GlobalViewsPaginationView(
                    _.extend(

                        {
                            totalPages: Math.ceil(
                                this.collection.totalRecordsFound / parseInt(this.collection.recordsPerPage)
                            )
                        }
                    )
                );
        }

    },
    beforeShowContent: function () {
        var promise = jQuery.Deferred();

        let Getitemurl = '/api/items?fieldset=placeordercustom';
        var ResId = sessionStorage.getItem('resId');
        // this.getAllItems(Getitemurl);
        if (ResId != " ") {
            return promise.resolve();
        } else {
            console.log("No RECORDid");

            this.getAllItems(Getitemurl);
        }

        //     var self = this;    
        //     let Getitemurl = '/api/items?fieldset=details';

        // var  url = "api/items?fieldset=details";
        // var apiData;

        // var promise = jQuery.Deferred();

        // jQuery.get('/api/items?fieldset=details').then(res =>{
        //     apiData = (res && res.total > 0) ? _.compact(res.items) : [];          
        //     var url =Utils.getAbsoluteUrl('services/placeOrderCustom.Service.ss'); 
        //     // console.log(url,'get');
        //     jQuery.ajax(url,{data:JSON.stringify(apiData),method:'POST'}).then(function (res) {
        //         console.log(res, "backbone");
        //     })    
        // promise.resolve();
        // })

        // this.model.save({ items:apiData}).then(function (res) {
        //     console.log(res, "backbone");
        // })
        return promise
    },
    getAllItems: function (url) {
        alert("ho")
        // url = '/api/items?fieldset=details' ;
        var Posturl = Utils.getAbsoluteUrl('services/placeOrderCustom.Service.ss');
        var self = this;
        var promise = jQuery.Deferred();
        jQuery.get(url, function (itemsRes) {
            if (_.has(itemsRes, 'total')) {
                self.item = _.union(self.item, itemsRes.items);
            }
            if (_.has(itemsRes, 'links')) {
                var links: any = _.findWhere(itemsRes.links, { 'rel': 'next' });
                var href = _.has(links, 'href') ? links.href : '';

                if (href) {
                    self.getAllItems(href);
                }
                else {
                    promise.resolve();
                }
            }
        });
        if (self.items) {
            let ParseData = JSON.stringify(self.item);
            jQuery.ajax(Posturl, {
                data: ParseData, method: 'POST', success: function (data) {
                    sessionStorage.setItem('resId', data.RecordId);

                }
            });
        }
    },
    getContext: function () {
        return {
            // @propery {Boolean} isLoading
            isLoading: this.isLoading,
            // @property {Array} item
            itemData: this.collection.models,
            // @propery {Boolean} showItems
            showItems: !!this.collection.totalRecordsFound,
            // @property {number} 
            // itemsLength: this.sendViewData.length > 0 ? true : false,
            // @property {String} name
            title: this.title,
            // @propery {Boolean} itemsNotFound
            // itemsNotFound: !this.collection.totalRecordsFound && !this.isLoading,
            itemsNotFound: this.collection.totalRecordsFound == 0 && !this.isLoading,
            // @property {array} search no item found
            noSearchDataFound: this.collection.searchPar
        }

    }
})
export = PlaceOrderCustomView;