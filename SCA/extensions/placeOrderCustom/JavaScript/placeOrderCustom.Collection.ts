/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="placeOrderCustom.Collection"/>
import * as _ from 'underscore';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import placeOrderCustomModel =  require('./placeOrderCustom.Model');

// import TransactionLineCollection = require('../../../Commons/Transaction/JavaScript/Transaction.Line.Collection');
import TransactionCollection = require('../../../Commons/Transaction/JavaScript/Transaction.Collection');
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';


const placeorderCustomCollection: any =TransactionCollection.extend({
    url:'services/placeOrderCustom.Service.ss',



    model:placeOrderCustomModel,

    parse: function(response) {
        this.totalRecordsFound = response.totalRecordsFound;
        this.recordsPerPage = response.recordsPerPage;
        this.searchPar = response.search;
        this.nodata = response.NosearchFound
        return response.records;
        
    },
    update: function(options) {      
        // console.log(options,'opt');
          
            this.fetch({
                data: {
                    // @property {String?} page
                    ShowperPage:parseInt(options.ShowperPage.value),
                    page: options.page,
                    // results_per_page:parseInt(options.sort.value),
                    sort:options.sort.value,
                    order: options.order,
                    search:options.search

                     
                },
                reset: true,
                // @property {String?} killerId
                killerId: options.killerId
            });
         
    }

     
});

export = placeorderCustomCollection;
