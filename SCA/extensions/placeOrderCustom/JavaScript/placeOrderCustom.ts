 
//----------------------------------------------------------------------------------------------------
/*
	© 2022 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="placeOrderCustom"/>
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import PlaceOrderCustomView = require('./placeOrderCustom.View');
import { MyAccountMenu } from '../../../Advanced/Header/JavaScript/MyAccountMenu';

const placeOrderCustom:any = {
    mountToApp: function(application) {
    
    let myAccountMenu = MyAccountMenu.getInstance();
    
        const pageType = application.getComponent('PageType');
        myAccountMenu.addEntry({
            id:'PlaceOrder',
            name: Utils.translate('PlaceOrder'),
            index:7
        });
        
        myAccountMenu.addSubEntry({
            entryId:'PlaceOrder',
            id:'placeorder',
            name: Utils.translate('Place Order Custom'),
            url:'placeorder',
            index:1
        });
       
        pageType.registerPageType({
            name: 'PlaceOrderCustom',
            routes: ['placeorder'],
             view:PlaceOrderCustomView,
             defaultTemplate: {
                name: 'place_order_custom.tpl',
                displayName:'placeordercustom',
                
            }
        });

        

    }
        

    
};
export=placeOrderCustom;