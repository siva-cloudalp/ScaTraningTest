/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="placeOrderCustom.Model"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts"/>
import * as _ from 'underscore';

import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';

import TransactionModel = require('../../../Commons/Transaction/JavaScript/Transaction.Model');
import TransactionLineModel = require('../../../Commons/Transaction/JavaScript/Transaction.Line.Model');

 
const PlaceOrderCustomModel: any =TransactionLineModel.extend({
    // urlRoot: Utils.getAbsoluteUrl('services/placeOrderCustom.Service.ss'),
		urlRoot:'services/placeOrderCustom.Service.ss'
		 
  

})
export =PlaceOrderCustomModel;