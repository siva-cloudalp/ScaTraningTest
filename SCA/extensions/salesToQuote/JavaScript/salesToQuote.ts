/// <amd-module name="salesToQuote"/>

import * as _ from 'underscore';

import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';

 
import salesToQuoteView =require( './salesToQuote.View');
 


// @class Home @extends ApplicationModule
export = {
    mountToApp: function(application) {
        //const homeCMSTemplate = home_cms_tpl;
            
        const pageType = application.getComponent('PageType');
        pageType.registerPageType({
            name: 'salesToQuote',
            routes:['sales'],
            view:salesToQuoteView
        });
 
    }
};

