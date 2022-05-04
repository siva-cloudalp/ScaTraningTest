/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="OrderWizard.Step"/>

import * as _ from 'underscore';
import * as order_wizard_step_tpl from 'order_wizard_step.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import { FooterSimplifiedView } from '../../../Advanced/Footer/JavaScript/Footer.Simplified.View';
import { Configuration } from '../../../Advanced/SCA/JavaScript/Configuration';
import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';
import { ProfileModel } from '../../../Commons/Profile/JavaScript/Profile.Model';
import ProductModel =require('../../../Commons/Product/JavaScript/Product.Model');
import ProductListModel =require('../../../Commons/ProductList/JavaScript/ProductList.Model');
import ProductDetailToQuoteExtView =require('../../../Advanced/ProductDetailToQuote/JavaScript/ProductDetailToQuote.View')
import WizardStep = require('../../../Advanced/Wizard/JavaScript/Wizard.Step');
import HeaderSimplifiedView = require('../../../Advanced/Header/JavaScript/Header.Simplified.View');
import Tracker = require('../../../Commons/Tracker/JavaScript/Tracker');
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import { WizardStepModule } from '../../../Advanced/Wizard/JavaScript/Wizard.StepModule';
import { QuoteModel } from '../../../Commons/Quote/JavaScript/Quote.Model';
 
import jsPDF = require('../../../Commons/Utilities/JavaScript/jQuery.jspdf.custom');

 

// @class OrderWizard.Step Step View, Renders all the components of the Step @extends Wizard.Step
const OrderWizardStep: any = WizardStep.extend({
    // @property {Function} headerView
    headerView: !Configuration.get('useStandardHeaderFooter') ? HeaderSimplifiedView : false,
    // @property {Function} footerView
    footerView: !Configuration.get('useStandardHeaderFooter') ? FooterSimplifiedView : false,
    // @property {Function} template
    template: order_wizard_step_tpl,
    // @method stepAdvance
    stepAdvance: function() {
        if (this.areAllModulesReady()) {
            return this.isStepReady() || this.wizard.isPaypalComplete();
        }
        return false;
    },
    events:{
            'change [name="wizard-quote-sales"]':'checkRadioValue',
            'click [data-type="request-quote"]':'RequestQuote'
    },
    
    // @method initialize
    initialize: function(options) {
    
        WizardStep.prototype.initialize.apply(this, arguments);
    
        
    }
    
    
    ,addModule: function addModule(module) {
        const self = this;
        const args = arguments;
    
        
        const order_wizard = this.wizard.orderWizardModel;
             
        const event_data = {
            step_group_name: self.stepGroup.name,
            step_url: self.step_url,
            module: _.isArray(module) ? module : [module, {}],
        
        

        };
    
        

        if (_.isFunction(event_data.module[0])) {
            event_data.module[1] = event_data.module[1] || {};
            event_data.module[1].module_id =
                event_data.module[0].prototype.template &&
                event_data.module[0].prototype.template.Name;
        }
        
        
        return order_wizard
            .cancelableTrigger('before:OrderWizardStep.addModule', event_data)
            .done(function() {
                WizardStep.prototype.addModule.apply(self, args);
                 
                
                order_wizard.cancelableTrigger('after:OrderWizardStep.addModule', event_data);
            });
    },
    
        
    submit: function submit() {
    
        const self = this;
        const args = arguments;
        const order_wizard = this.wizard.orderWizardModel;
        const next_step_url = this.wizard.getNextStepUrl();
                  
        return order_wizard
            .cancelableTrigger('before:OrderWizardStep.submit', next_step_url)
            .then(function() {
                return WizardStep.prototype.submit.apply(self, args);
            })
            .fail(function(jqXhr) {
                const error_container = jQuery('[data-type="alert-placeholder-module"]:first');
                const error_container_parent = error_container.parents('.module-rendered:last');

                if (error_container_parent.length) {
                    Utils.animatedScroll(error_container_parent[0]);
                }
            });
    },

    _submit: function _submit() {
        const self = this;
        const args = arguments;

        return WizardStep.prototype._submit
            .apply(self, args)
            .then(jQuery.noop)
            .fail(function fail(error) {
                return {
                    error: error,
                    step_url: self.step_url
                };
            });
    },

    previousStep: function previousStep() {
        const self = this;
        const args = arguments;
        const order_wizard = this.wizard.orderWizardModel;
        const prev_step_url = this.wizard.getPreviousStepUrl();

        return order_wizard
            .cancelableTrigger('before:OrderWizardStep.previousStep', prev_step_url)
            .then(function() {
                return WizardStep.prototype.previousStep.apply(self, args);
            });
    },

    _previousStep: function _previousStep() {
        const self = this;
        const args = arguments;

        return WizardStep.prototype._previousStep
            .apply(self, args)
            .then(jQuery.noop, function fail(error) {
                return {
                    error: error,
                    step_url: self.step_url
                };
            });
    },

    // @method render
    render: function(...args) {
        const layout = this.wizard.application.getLayout();

        this.profileModel = ProfileModel.getInstance();

        WizardStep.prototype.render.apply(this, args);

        const { checkoutApp } = this.wizard.application.getConfig();
        if (
            this.wizard.isCurrentStepFirst() && // only in the first step
            this.profileModel.get('isLoggedIn') === 'F' && // only if the user doesn't already have a session
            checkoutApp.skipLogin
        ) {
            const message = Utils.translate(
                '<p>Checking out as a Guest. Using an account, you will enjoy a faster checkout experience.<p><a href="login" data-toggle="show-in-modal" data-id="skip-login-modal">Login</a><a class="order-wizard-step-skip-login-register" href="register" data-toggle="show-in-modal" data-id="skip-login-register-modal">Register</a>'
            );
            const global_view_message = new GlobalViewsMessageView({
                message: message,
                type: 'info',
                closable: true
            });

            this.$('[data-action="skip-login-message"]')
                .empty()
                .append(global_view_message.render().$el.html());
        }

        if (this.wizard.currentStep !== 'confirmation') {
            Tracker.getInstance().trackPageviewForCheckoutStep(
                this.wizard.getStepPosition().fromBegining + 2
            );
        }

        // Also trigger the afterRender event so the site search module can load the typeahead.
        layout.trigger('afterRender');
    },
    checkRadioValue:function(){
        let checkedVal =$('input[name=wizard-quote-sales]:checked').val();
        if(checkedVal=='requestQuote'){
            $('.order-wizard-step-button-continue').hide(),
            $('.order-wizard-button-quote').show()
        }
        else{
            $('.order-wizard-button-quote').hide();
            $('.order-wizard-step-button-continue').show();
        }
             
    },
    RequestQuote:function(e){  
        
        // e.preventDefault();	  
          		
        // var self=this;
        // this.isCheckoutAsGuest = this.wizard.options.profile.get('isLoggedIn') == "T" && this.wizard.options.profile.get('isGuest') == "T" ? true : false;
        // this.productCollection=[];
        	
        // this.wizard.model.get('lines').forEach(myFunction);
        
        // function myFunction(item) {              
        //     var product =new ProductModel({
        //         item:item
        //     ,	quantity:item.get('quantity')
        //     ,	options:item.get('options') && item.get('options').length > 0 ?item.get('options').models : {}
        //     });
            
        //     self.productCollection.push(product); 
        // };
     
        
        //  var quote_model = new QuoteModel();

		// quote_model.save().done(function(){
        //             const billing_address = parseInt(this.wizard.model.get('billaddress'), 10);
        //             const shipping_address = parseInt(this.wizard.model.get('shipaddress'), 10);
        //             if (!_.isNumber(billing_address) || _.isNaN(billing_address)) {
        //                 this.unset('billaddress');
        //                 };
                 
        //             collection:this.productCollection

        //          });
         
        
    }
    	// ,requestToQuote:function(e)
		// {
		// 	var self = this;
		// 	_.each(this.productCollection,function(product,index){
        //             console.log(product);
                    
		// 	var quote = new ProductDetailToQuoteExtView({
		// 	application:this.wizard.application.Checkout
		// 	,	model: product
		// 	,	index: index == (self.productCollection.length - 1) ? true : false
		// 	});
		// 	quote.itemsToQuote(e);
		// 	});
		// }	
    
    // @method getContext @returns OrderWizard.Step.Context
    ,getContext: function() {
     
        
        // @class OrderWizard.Step.Context
        return {
            // @property {String} showUrl
            isReview:this.step_url =='review',
            // @property {Boolean} showTitle
            showTitle: !!this.getName(),
            // @property {String} title
            title: this.getName(),
            // @property {Boolean} showContinueButton
            showContinueButton: !this.hideContinueButton,
            // @property {String} continueButtonLabel
            continueButtonLabel: this.getContinueButtonLabel() || '',
            // @property {Boolean} showSecondContinueButtonOnPhone
            showSecondContinueButtonOnPhone: !!this.hideSecondContinueButtonOnPhone,
            // @property {Boolean} showBackButton
            showBackButton: !(this.hideBackButton || this.wizard.isCurrentStepFirst()),
            // @property {Boolean} showBottomMessage
            showBottomMessage: !!this.bottomMessage,
            // @property {String} bottomMessage
            bottomMessage: _.isFunction(this.bottomMessage)
                ? this.bottomMessage()
                : this.bottomMessage || '',
            // @property {String} bottomMessageClass
            bottomMessageClass: _.isFunction(this.bottomMessageClass)
                ? this.bottomMessageClass()
                : this.bottomMessageClass || ''
        };
    }
});

export = OrderWizardStep;
