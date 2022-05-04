/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Utils"/>
/// <reference path="../../../Commons/Utilities/JavaScript/GlobalDeclarations.d.ts" />

import * as _ from 'underscore';
import { stringFormat } from '../../../Commons/NativesExtras/JavaScript/String.format';
import { JQueryBxSlider, SliderOptions } from '../../../Commons/Utilities/JavaScript/bxSliderTypes';

import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';

import TriggeredEvent = JQuery.TriggeredEvent;

import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneModel = require('../../../Commons/BackboneExtras/JavaScript/Backbone.Model');

const ITEM_NO_LONGER_AVAILABLE = 1;
interface SiteSettings {
    analytics: Analytic;
    autoapplypromotionsenabled: string;
    campaignsubscriptions: boolean;
    cartsharingmode: string;
    checkout: Checkout;
    checkoutSupported: boolean;
    cookiepolicy: string;
    countries: Country;
    currencies: Currency[];
    dateformat: string;
    decimalseparator: string;
    defaultSubscriptionStatus: boolean;
    defaultpricelevel: string;
    defaultshipcountry: string | null;
    defaultshippingcountry: string | null;
    // ask if this always has a value
    defaultshippingmethod: string | null;
    displayname: string;
    facetfield: FacetField[];
    groupseparator: string;
    id: number;
    imagesizes: ImageSize[];
    includevatwithprices: string;
    isAutoapplyPromotionsEnabled: boolean;
    isHttpsSupported: number;
    isMultiShippingRoutesEnabled: boolean;
    isPersonalizedCatalogViewsEnabled: boolean;
    isPickupInStoreEnabled: boolean;
    isSCISIntegrationEnabled: boolean;
    isSingleDomain: boolean;
    isSuiteTaxEnabled: boolean;
    is_logged_in: boolean;
    isinactive: string;
    iswebstoreoffline: string;
    iswsdk: boolean;
    languages: Language[];
    loginallowed: string;
    loginrequired: string;
    longdateformat: string;
    minpasswordlength: string;
    multipleshippingenabled: string;
    negativeprefix: string;
    negativesuffix: string;
    order: Order;
    paymentmethods: PaymentMethod[];
    phoneformat: string | null;
    pricesincludevat: string;
    quantitypricing: boolean;
    registration: Registration;
    requireloginforpricing: string;
    requireshippinginformation: string;
    scripttemplateinvoice: string;
    shipallcountries: string;
    shippingrequired: string;
    shipstoallcountries: string;
    shipstocountries: string[];
    shiptocountries: string[];
    shopperCurrency: Currency;
    shoppingSupported: boolean;
    showcookieconsentbanner: string;
    showextendedcart: string;
    showshippingestimator: string;
    sitecurrency: Currency[];
    siteid: number;
    sitelanguage: Language[];
    siteloginrequired: string;
    siteregion: Subsidiary[];
    sitetype: string;
    sortfield: SortField[];
    subsidiaries: Subsidiary[];
    touchpoints: Touchpoint;
    wsdkcancelcarturl: string | null;
    wsdkcancelcheckouturl: string | null;
    wsdkcancelloginurl: string | null;
    wsdkcompletecheckouturl: string | null;
    wsdkcompleteloginurl: string | null;
}

interface SortField {
    sortdirection: string;
    sortfieldname: string;
    sortorder: string;
}

interface Subsidiary {
    displayname: string;
    internalid: string;
    isdefault?: string;
    name: string;
}

interface Registration {
    companyfieldmandatory: string;
    displaycompanyfield: string;
    registrationallowed: string;
    registrationanonymous: string;
    registrationmandatory: string;
    registrationoptional: string;
    requirecompanyfield: string;
    showcompanyfield: string;
}

interface PaymentMethod {
    creditcard: string;
    creditcardtoken: string;
    imagesrc: string[];
    internalid: string;
    isexternal: string;
    ispaypal: string;
    key: string;
    merchantid: string;
    name: string;
}

interface Order {
    outofstockbehavior: string;
    outofstockitems: string;
    upselldisplay: string;
}

interface UrlAlias {
    urlcomponent: string;
}

interface FacetField {
    facetfieldid: string;
    urlcomponent: string | null;
    urlcomponentaliases: UrlAlias[];
}

interface Analytic {
    analyticsclickattributes: string | null;
    analyticssubmitattributes: string | null;
    clickattributes: string | null;
    confpagetrackinghtml: string | null;
    submitattributes: string | null;
}

interface Checkout {
    custchoosespaymethod: string;
    google: CheckoutGoogle;
    hidepaymentpagewhennobalance: string;
    paymentmandatory: string;
    paypalexpress: PaypalExpress;
    requestshippingaddressfirst: string;
    requireccsecuritycode: string;
    requiretermsandconditions: string;
    saveccinfo: string;
    savecreditinfo: string;
    shippingaddrfirst: string;
    showpofieldonpayment: string;
    showpurchaseorder: string;
    showsavecc: string;
    showsavecreditinfo: string;
    termsandconditions: string | null;
    termsandconditionshtml: string | null;
}

interface PaypalExpress {
    available: string;
}

interface CheckoutGoogle {
    available: string;
}

interface Language {
    isdefault?: string;
    languagename: string;
    locale: string;
    name: string;
}

interface Touchpoint {
    checkout: string;
    continueshopping: string;
    customercenter: string;
    home: string;
    login: string;
    logout: string;
    register: string;
    serversync: string;
    storelocator: string;
    viewcart: string;
    welcome: string;
}

interface Country {
    code: string;
    isziprequired: string;
    states?: State[];
}
interface State {
    name: string;
    code: string;
}

interface FormatTokens {
    c: string;
    ab: string;
    aa: string;
    d: string;
}

interface Currency {
    code: string;
    currencyname: string;
    internalid: string;
    isdefault?: string;
    name?: string;
    symbol: string;
    symbolplacement?: number;
    beforeValue?: boolean;
    precision?: number;
}
/**
 *
 * @deprecated
 */
// @function deepCopy Deep Copy of the object taking care of Backbone models
// @param {Object} obj Object to be copy
// @return {Object}
export function deepCopy(obj) {
    if (_.isFunction(obj)) {
        return null;
    }
    let copy: any = {};
    if (obj instanceof BackboneModel) {
        obj = obj.deepCopy();
    } else if (obj instanceof Backbone.Collection) {
        obj = obj.models || [];
    }
    if (_.isArray(obj)) {
        copy = [];
        _.each(obj, function(value) {
            !_.isFunction(value) && copy.push(deepCopy(value));
        });
    } else if (_.isObject(obj)) {
        obj = obj.deepCopy ? obj.deepCopy() : obj;
        _.each(obj, function(value, attr: any) {
            if (
                !_.isFunction(value) &&
                !(value instanceof Backbone.View && attr === 'composite') &&
                attr.indexOf &&
                attr.indexOf('_') !== 0
            ) {
                copy[attr] = deepCopy(value);
            }
        });
    } else {
        copy = obj;
    }
    return copy;
}

export function correctURL(url: string = ''): string {
    // Removes the hastag if it's there remove it

    url = url[0] === '#' ? url.substring(1) : url;
    // if it does not has a slash add it
    url = url[0] === '/' ? url : `/${url}`;

    return url;
}

/**
 *
 * @deprecated
 */
export function deepExtend(target, source) {
    if (_.isArray(target) || !_.isObject(target)) {
        return source;
    }

    _.each(source, function(value, key: number) {
        if (key in target) {
            target[key] = deepExtend(target[key], value);
        } else {
            target[key] = value;
        }
    });

    return target;
}

// @method formatPhone
// Will try to reformat a phone number for a given phone Format,
// If no format is given, it will try to use the one in site settings.
// @param {String} phone @param {String} format @return {String}
export function formatPhone(phone: string, format: string = ''): string {
    // fyi: the tilde (~) its used as !== -1
    const extensionSearch: number = phone.search(/[A-Za-z#]/);
    const extension: string = extensionSearch !== -1 ? ` ${phone.substring(extensionSearch)}` : '';
    const phoneNumber: string =
        extensionSearch !== -1 ? ` ${phone.substring(0, extensionSearch)}` : phone;

    const phoneFormat = format || SC.ENVIRONMENT.siteSettings.phoneformat;

    if (/^[0-9()-.\s]+$/.test(phoneNumber) && phoneFormat) {
        let format_tokens: FormatTokens;
        const phoneDigits: string = phoneNumber.replace(/[()-.\s]/g, '');

        switch (phoneFormat) {
            // c: country, ab: area_before, aa: area_after, d: digits
            case '(123) 456-7890':
                format_tokens = {
                    c: ' ',
                    ab: '(',
                    aa: ') ',
                    d: '-'
                };
                break;
            case '123 456 7890':
                format_tokens = {
                    c: ' ',
                    ab: '',
                    aa: ' ',
                    d: ' '
                };
                break;
            case '123-456-7890':
                format_tokens = {
                    c: ' ',
                    ab: '',
                    aa: '-',
                    d: '-'
                };
                break;
            case '123.456.7890':
                format_tokens = {
                    c: ' ',
                    ab: '',
                    aa: '.',
                    d: '.'
                };
                break;
            default:
                return phone;
        }

        switch (phoneDigits.length) {
            case 7:
                return (
                    phoneDigits.substring(0, 3) +
                    format_tokens.d +
                    phoneDigits.substring(3) +
                    extension
                );
            case 10:
                return (
                    format_tokens.ab +
                    phoneDigits.substring(0, 3) +
                    format_tokens.aa +
                    phoneDigits.substring(3, 6) +
                    format_tokens.d +
                    phoneDigits.substring(6) +
                    extension
                );
            case 11:
                return (
                    phoneDigits.substring(0, 1) +
                    format_tokens.c +
                    format_tokens.ab +
                    phoneDigits.substring(1, 4) +
                    format_tokens.aa +
                    phoneDigits.substring(4, 7) +
                    format_tokens.d +
                    phoneDigits.substring(7) +
                    extension
                );
            default:
                return phone;
        }
    }

    return phone;
}

// @method dateToString Convert a date object to string using international format YYYY-MM-dd
// Useful for inputs of type="date" @param {Date} date @return {String}
export function dateToString(date: Date): string {
    let month = `${date.getMonth() + 1}`;
    let day = `${date.getDate()}`;

    if (month.length === 1) {
        month = `0${month}`;
    }

    if (day.length === 1) {
        day = `0${day}`;
    }

    return `${date.getFullYear()}-${month}-${day}`;
}

// @method addTimeToDate Add the amount of time in mmilliseconds to a date
// @param {Date} date
// @param {Number} offset (time in milliseconds)
// @return {Date}
export function addTimeToDate(date: Date, offset: number): Date {
    const date_time: number = new Date().getTime();
    return new Date(date_time + offset);
}

interface DateOptions {
    format: string;
    plusMonth: number;
    dateSplitCharacter: string;
}

// @method stringToDate parse a string date into a date object.
// @param {String} str_date
// @param {format:String,plusMonth:Number}
// options.format: String format that specify the format of the input string. By Default YYYY-MM-dd.
// options.plusMonth: Number that indicate
// how many month offset should be applied when creating the date object.
export function stringToDate(str_date: string, options?: DateOptions): Date {
    const dateOptions = _.extend(
        {
            format: 'YYYY-MM-dd',
            plusMonth: -1,
            dateSplitCharacter: '-'
        },
        options || {}
    );

    // plumbing
    const date_parts: string[] = str_date ? str_date.split(dateOptions.dateSplitCharacter) : [];
    const format_parts: string[] = dateOptions.format ? dateOptions.format.split('-') : [];
    const year_index: number =
        _.indexOf(format_parts, 'YYYY') >= 0 ? _.indexOf(format_parts, 'YYYY') : 2;
    const month_index: number =
        _.indexOf(format_parts, 'MM') >= 0 ? _.indexOf(format_parts, 'MM') : 1;
    const day_index: number =
        _.indexOf(format_parts, 'dd') >= 0 ? _.indexOf(format_parts, 'dd') : 0;
    // Date parts
    const year: number = parseInt(date_parts[year_index], 10);
    const month: number = parseInt(date_parts[month_index], 10) + (dateOptions.plusMonth || 0);
    const day: number = parseInt(date_parts[day_index], 10);

    return new Date(year, month, day);
}

export function isDateValid(date: Date): boolean {
    if (date === null || typeof date.getTime() !== 'number') {
        // d.valueOf() could also work
        // date is not valid
        return false;
    }

    // date is valid
    // now validate the values of day, month and year
    const dtDay: number = date.getDate();
    const dtMonth: number = date.getMonth() + 1;
    const dtYear: number = date.getFullYear();
    const pattern = /^\d{4}$/;

    if (!pattern.test(dtYear.toString())) {
        return false;
    }
    if (dtMonth < 1 || dtMonth > 12) {
        return false;
    }
    if (dtDay < 1 || dtDay > 31) {
        return false;
    }
    if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay === 31) {
        return false;
    }
    if (dtMonth === 2) {
        const isLeap = dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0);
        if (dtDay > 29 || (dtDay === 29 && !isLeap)) {
            return false;
        }
    }

    return true;
}

export function getCurrencyByName(currency_name: string): Currency | undefined {
    let selected_currency: Currency | undefined;
    const currencies: Currency[] = SC.ENVIRONMENT.availableCurrencies;

    if (currency_name && currencies) {
        selected_currency = _.find(currencies, (currency: Currency) => {
            return currency.currencyname === currency_name;
        });
    }

    return selected_currency;
}

// @method translate
// Used on all of the hardcoded texts in the templates.
// Gets the translated value from SC.Translations object literal.
// Please always use the syntax translate('string', 1, 2)
// instead of the syntax _.translate('string', 1, 2)
// Example: ```translate('There are $(0) apples in the tree', appleCount)```
// @param {String} text @return {String}

export function translate(
    text: string,
    ...continuationText: (string | number | (string | number)[])[]
): string {
    if (!text) {
        return '';
    }
    // Turns the arguments object into an array
    // let parameters: (string | number)[] = [];
    let parameters: (string | number)[] = [];
    // Checks the translation table

    let result: string = SC.Translations && SC.Translations[text] ? SC.Translations[text] : text;

    if (continuationText && continuationText.length && result) {
        const [firstParameter]  = continuationText;
        if (_.isArray(firstParameter) && firstParameter.length) {
            parameters = firstParameter;
        } else {
            parameters = _.map(continuationText, function(param: string) {
                return _.escape(param);
            });
        }
    }
    result = stringFormat(result, ...parameters);

    return result;
}

// Returns the translated message based on the exception code
// defined on Exceptions.ts file. If not defined a default translation is returned.
export function getTranslatedMessage(
    errorCode: number | string,
    errorMessage: string,
    parameters: string[]
): string {
    try {
        switch (errorCode) {
            case ITEM_NO_LONGER_AVAILABLE: {
                return this.translate(
                    'Unfortunately this item/s is not longer available. Please <a href="#" data-touchpoint="viewcart"">go back</a> and review the cart'
                );
            }
            default: {
                return this.translate(errorMessage);
            }
        }
    } catch (e) {
        return this.translate('An error has occurred');
    }
}

export function validateSecurityCode(value: string): string {
    const ccsn: string = String(value).trim();
    let errorMessage = '';
    if (ccsn) {
        if (
            !(
                Backbone.Validation.patterns.number.test(ccsn) &&
                (ccsn.length === 3 || ccsn.length === 4)
            )
        ) {
            errorMessage = translate('Security Number is invalid');
        }
    } else {
        errorMessage = translate('Security Number is required');
    }
    return errorMessage;
}

export function isHttpsSupported(): boolean {
    return (
        SC &&
        SC.ENVIRONMENT &&
        SC.ENVIRONMENT.siteSettings &&
        SC.ENVIRONMENT.siteSettings.isHttpsSupported
    );
}

export function isCheckoutSupported(): boolean {
    return (
        SC &&
        SC.ENVIRONMENT &&
        SC.ENVIRONMENT.siteSettings &&
        SC.ENVIRONMENT.siteSettings.checkoutSupported
    );
}

// @method validatePhone @param {String} phone
// @return {String} an error message if the passed phone is invalid or falsy if it is valid
export function validatePhone(phone: string | number): string {
    const minLength = 7;

    if (_.isNumber(phone)) {
        // phone is a number so we can't ask for .length
        // we elevate 10 to (minLength - 1)
        // if the number is lower, then its invalid
        // eg: phone = 1234567890 is greater than 1000000, so its valid
        //     phone = 123456 is lower than 1000000, so its invalid
        if (phone < 10 ** (minLength - 1)) {
            return translate('Phone Number is invalid');
        }
    } else if (phone) {
        // if its a string, we remove all the useless characters
        let value: string = phone.replace(/[()-.\s]/g, '');
        // we then turn the value into an integer and back to string
        // to make sure all of the characters are numeric

        // first remove leading zeros for number comparison
        while (value.length && value.substring(0, 1) === '0') {
            value = value.substring(1, value.length);
        }
        if (parseInt(value, 10).toString() !== value || value.length < minLength) {
            return translate('Phone Number is invalid');
        }
    } else {
        return translate('Phone is required');
    }
    return '';
}

interface AddressForm {
    addr1: string;
    addr2: string | null;
    addr3: string | null;
    city: string;
    company: string | null;
    country: string;
    defaultbilling: string;
    defaultshipping: string;
    fullname: string;
    internalid: string;
    isresidential: string;
    isvalid: string;
    phone: string;
    state: string | null;
    zip: string;
}

export function validateState(value: string, valName: string, form: AddressForm): string {
    const countries: Country = SC.ENVIRONMENT.siteSettings.countries || {};
    if (countries[form.country] && countries[form.country].states && value === '') {
        return translate('State is required');
    }
    return '';
}

export function validateZipCode(value: string, valName: string, form: AddressForm): string {
    const countries: Country = SC.ENVIRONMENT.siteSettings.countries || {};

    value = String(value).trim();

    if (
        !value &&
        (!form.country ||
            (countries[form.country] && countries[form.country].isziprequired === 'T'))
    ) {
        return translate('Zip Code is required');
    }
    return '';
}

export function getFullPathForElement(el: HTMLElement): string {
    const names: string[] = [];
    let c: number;
    let e: Element;

    while (el !== null && el.parentNode) {
        if (el.id) {
            // if a parent element has an id, that is enough for our path
            names.unshift(`#${el.id}`);
            break;
        } else if (el === document.body) {
            names.unshift('HTML > BODY');
            break;
        } else if (el === (document.head || document.getElementsByTagName('head')[0])) {
            names.unshift('HTML > HEAD');
            break;
        } else if (el.ownerDocument !== null && el === el.ownerDocument.documentElement) {
            names.unshift(el.tagName);
            break;
        } else {
            e = el;
            for (c = 1; e.previousElementSibling; c++) {
                e = e.previousElementSibling;
            }
            names.unshift(`${el.tagName}:nth-child(${c})`);
            if (el.parentElement !== null) {
                el = el.parentElement;
            }
        }
    }

    return names.join(' > ');
}

// @method formatCurrency @param {String} value @param {String} symbol @return {String}
export function formatCurrency(
    value: string | number,
    symbol?: string,
    noDecimalPosition?: boolean
): string {
    // This <string>cast is needed by SCIS legacy source code, could be deleted
    // after typescript migration ends, some times the value is undefined
    let value_float: number = parseFloat(<string>value);
    const negative: boolean = value_float < 0;
    let groupseparator = ',';
    let decimalseparator = '.';
    let negativeprefix = '(';
    let negativesuffix = ')';
    let thousand_string = '';
    let beforeValue = false;

    if (SC.Application.getConfig().isSCIS) {
        beforeValue = true;
    }

    const sessionInfo: Currency = SC.getSessionInfo && SC.getSessionInfo('currentCurrency');
    let currencySymbol = symbol;
    if (isNaN(value_float)) {
        return <string>value;
    }

    value_float = parseInt(`${(Math.abs(value_float) + 0.005) * 100}`, 10) / 100;

    let value_string: string = value_float.toString();

    const settings: SiteSettings =
        SC && SC.ENVIRONMENT && SC.ENVIRONMENT.siteSettings ? SC.ENVIRONMENT.siteSettings : {};

    if (Object.prototype.hasOwnProperty.call(settings, 'groupseparator')) {
        groupseparator = settings.groupseparator;
    }

    if (Object.prototype.hasOwnProperty.call(settings, 'decimalseparator')) {
        decimalseparator = settings.decimalseparator;
    }

    if (Object.prototype.hasOwnProperty.call(settings, 'negativeprefix')) {
        negativeprefix = settings.negativeprefix;
    }

    if (Object.prototype.hasOwnProperty.call(settings, 'negativesuffix')) {
        negativesuffix = settings.negativesuffix;
    }

    value_string = value_string.replace('.', decimalseparator);
    let decimal_position: number = value_string.indexOf(decimalseparator);

    // if the string doesn't contains a .
    if (decimal_position === -1) {
        if (!noDecimalPosition) {
            value_string += `${decimalseparator}00`;
        }
        decimal_position = value_string.indexOf(decimalseparator);
    }
    // if it only contains one number after the .
    else if (value_string.indexOf(decimalseparator) === value_string.length - 2) {
        value_string += '0';
    }

    for (let i: number = value_string.length - 1; i >= 0; i--) {
        // If the distance to the left of the decimal separator
        // is a multiple of 3 you need to add the group separator
        thousand_string =
            (i > 0 && i < decimal_position && (decimal_position - i) % 3 === 0
                ? groupseparator
                : '') +
            value_string[i] +
            thousand_string;
    }

    if (!currencySymbol) {
        if (!sessionInfo) {
            if (settings.shopperCurrency) {
                if (settings.shopperCurrency.beforeValue !== undefined) {
                    beforeValue = settings.shopperCurrency.beforeValue;
                }
                currencySymbol = settings.shopperCurrency.symbol;

                if (!beforeValue && currencySymbol) {
                    const matchingcurrency: Currency | undefined = _.findWhere(
                        settings.currencies,
                        {
                            symbol: currencySymbol
                        }
                    );

                    if (matchingcurrency) {
                        beforeValue = matchingcurrency.symbolplacement === 1;
                    }
                }
            }
        } else {
            if (sessionInfo.beforeValue !== undefined) {
                beforeValue = sessionInfo.beforeValue;
            }
            currencySymbol = sessionInfo.symbol;
        }

        if (!currencySymbol) {
            currencySymbol = '$';
        }
    }

    value_string = negative ? negativeprefix + thousand_string + negativesuffix : thousand_string;

    return beforeValue || _.isUndefined(beforeValue)
        ? currencySymbol + value_string
        : value_string + currencySymbol;
}

// @method formatQuantity Formats with commas as thousand separator (e.g. for displaying quantities)
// @param {String} number @return {String} the formatted quantity.
export function formatQuantity(number: number): string {
    const result: string[] = [];
    const parts: string[] = `${number}`.split('.');
    const integerPart: string[] = parts[0].split('').reverse();

    for (let i = 0; i < integerPart.length; i++) {
        if (i > 0 && i % 3 === 0 && integerPart[i] !== '-') {
            result.unshift(',');
        }

        result.unshift(integerPart[i]);
    }

    if (parts.length > 1) {
        result.push('.');
        result.push(parts[1]);
    }

    return result.join('');
}

// @method highlightKeyword  given a string containing a
// keyword it highlights it using html strong @param {String} text @param {String} keyword
export function highlightKeyword(text: string, keyword: string): string {
    text = text || '';
    text = _.escape(text);
    if (!keyword) {
        return text;
    }

    keyword = String(keyword)
        .trim()
        .replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');

    return text.replace(new RegExp(`(${keyword})`, 'ig'), function($1, match): string {
        return `<strong>${match}</strong>`;
    });
}

export interface UrlParameters {
    [key: string]: string | number;
}

// @method addParamsToUrl
// @param {String} baseUrl
// @param {Object} params the params mapping to add @return {String}
// @param {Boolean} avoidDoubleRedirect If true it will modify all the url
// parameters to be prepended with __.
// We do this to prevent Netsuite platform to process
// some parameters and generate a double redirect. See searchApi.ssp
// @return {String}
export function addParamsToUrl(
    baseUrl: string,
    params: UrlParameters,
    avoidDoubleRedirect?: boolean
): string {
    if (avoidDoubleRedirect) {
        const new_params: UrlParameters = {};
        _.each(params, (param_value: string, param_key: string) => {
            new_params[`__${param_key}`] = param_value;
        });
        params = new_params;
    }

    // We get the search options from the config file
    if (baseUrl && !_.isEmpty(params)) {
        const paramString: string = jQuery.param(params);
        const join_string = baseUrl.indexOf('?') !== -1 ? '&' : '?';

        return baseUrl + join_string + paramString;
    }

    return baseUrl;
}

// @method getDecodedURLParameter
// Takes an url parameter and returns a decoded version of it,
// if decodeURIComponent() wasn't previously called.
// Otherwise, returns the character itself.
// It prevents decodeURIComponent() function gets called twice over the same
// url parameter (EX: url_parameter = 10%+%20OFF)
// @param  {String} url_parameter
// @return {String}
export function getDecodedURLParameter(url_parameter: string): string {
    url_parameter = url_parameter || '';
    let position: number;
    let temporal: string;
    for (
        temporal = '';
        (position = url_parameter.indexOf('%')) >= 0;
        url_parameter = url_parameter.substring(position + 3)
    ) {
        temporal += url_parameter.substring(0, position);
        const extract: string = url_parameter.substring(position, position + 3);
        try {
            temporal += decodeURIComponent(extract);
        } catch (e) {
            temporal += extract;
        }
    }
    return temporal + url_parameter;
}

// @method parseUrlOptions
// Takes a url with options (or just the options part of the url) and returns an
// object. You can do the reverse operation (object to url string) using jQuery.param()
// @param {String} options_string
// @return {UrlParameters}
export function parseUrlOptions(options_string: string): UrlParameters {
    let urlOption: string | undefined = options_string || '';

    if (urlOption && urlOption.indexOf('?') !== -1) {
        urlOption = _.last(urlOption.split('?'));
    }

    if (urlOption && urlOption.indexOf('#') !== -1) {
        urlOption = _.first(urlOption.split('#'));
    }
    // @class UrlParameters @extend Dictionary<String,String>
    // This class is used as a dictionary where each string key is
    // a parameter from the passed in string and each value
    // is the corresponding value from the string being decodeURIComponent.
    // Example
    // input: /some-item?quantity=2&custcol3=12
    // output: {quantity: decodeURIComponent(2), custcol3: decodeURIComponent(12)}

    const options: UrlParameters = {};

    if (urlOption && urlOption.length > 0) {
        const tokens: string[] = urlOption.split(/&/g);
        let current_token: string[] = [];

        while (tokens.length > 0) {
            const firstElement: string | undefined = tokens.shift();
            if (firstElement) {
                current_token = firstElement.split(/=/g);
            }
            if (current_token && current_token.length && current_token[0].length !== 0) {
                options[current_token[0]] = getDecodedURLParameter(current_token[1]);
            }
        }
    }

    return options;
}

type ObjectAttributeType = string | number | (string | number)[];
interface ObjectAttribute {
    href?: ObjectAttributeType;
    id?: ObjectAttributeType;
    title?: ObjectAttributeType;
    data?: ObjectAttribute;
    'data-hashtag'?: ObjectAttributeType;
    'data-touchpoint'?: ObjectAttributeType;
    'data-permissions'?: ObjectAttributeType;
}

// @method objectToAtrributes @param {Object} obj @param {String} prefix @return {String}
export function objectToAtrributes(obj: ObjectAttribute, prefix: string = ''): string {
    const objectToAtrributesKeyMap = [
        'href',
        'id',
        'title',

        'data',
        'data-hashtag',
        'data-touchpoint',
        'data-permissions'
    ];
    let memo = '';
    Object.getOwnPropertyNames(obj).forEach((key: string) => {
        const value = obj[key];
        const prefixKey = prefix + key;
        if (_.contains(objectToAtrributesKeyMap, prefixKey) === true) {
            if (_.isObject(value)) {
                memo += objectToAtrributes(obj[key], `${key}-`);
            }
            if (_.isArray(value)) {
                memo += ` ${_.escape(prefixKey)}="${_.escape(value.join(' '))}"`;
            }
            if (!_.isObject(value)) {
                memo += ` ${_.escape(prefixKey)}="${_.escape(value)}"`;
            }
        }
    });
    return memo;
}

// @method isTargetActionable
// @param {Event} event
// @return {Boolean}
export function isTargetActionable(event: TriggeredEvent): boolean {
    // return true if the target is actionable
    const target = jQuery(event.target);
    const targetTagName = target.prop('tagName').toLowerCase();
    const targetParentTagName = target
        .parent()
        .prop('tagName')
        .toLowerCase();
    const isCheckbox = target.prop('type') === 'checkbox';

    return (
        targetTagName === 'a' ||
        targetParentTagName === 'a' ||
        targetTagName === 'i' ||
        targetParentTagName === 'button' ||
        targetTagName === 'button' ||
        (targetTagName === 'input' && isCheckbox === false)
    );
}

interface ImageSize {
    internalid: number;
    maxheight: number;
    maxwidth: number;
    name: string;
    urlsuffix: string;
}

// @method resizeImage @param {Array<Object>} sizes @param {String}
// url @param {String} size the size id @return {String}
export function resizeImage(sizes: ImageSize[], url: string, size: string): string {
    const resize: ImageSize = _.where(sizes, {
        name: size
    })[0];
    url = url || '';

    if (resize) {
        return url + (url.indexOf('?') !== -1 ? '&' : '?') + resize.urlsuffix;
    }

    return url;
}

// @method urlIsAbsolute @param {String} url @returns {Boolean}
export function isUrlAbsolute(url: string): boolean {
    return /^https?:\/\//.test(url);
}

// @method getAbsoluteUrl @param {String} file @returns {String}
export function getAbsoluteUrl(file: string = '', isServices2: boolean = false): string {
    const base_url: string = (SC && SC.ENVIRONMENT && SC.ENVIRONMENT.baseUrl) || '';
    const fileReplace: string = file;
    if (base_url && !isUrlAbsolute(fileReplace)) {
        return isServices2
            ? base_url.replace('/{{file}}', `_ss2/${fileReplace}`)
            : base_url.replace('{{file}}', fileReplace);
    }
    return file;
}

// @method getThemeAbsoluteUrlOfNonManagedResources @param {String} file @returns {String}
export function getThemeAbsoluteUrlOfNonManagedResources(
    default_value: string,
    file?: string
): string {
    if (!file) {
        file = '';
        if (SC.ENVIRONMENT.isExtended) {
            file = SC.ENVIRONMENT.themeAssetsPath || '';
        } else if (SC.ENVIRONMENT.BuildTimeInf && SC.ENVIRONMENT.BuildTimeInf.isSCLite) {
            if (SC.CONFIGURATION.unmanagedResourcesFolderName) {
                file = `site/${SC.CONFIGURATION.unmanagedResourcesFolderName}/`;
            } else {
                file = 'default/';
            }
        }

        file += default_value;
    }

    return getAbsoluteUrl(file);
}

// @method getAbsoluteUrlOfNonManagedResources @param {String} file @returns {String}
export function getAbsoluteUrlOfNonManagedResources(file: string): string {
    return getAbsoluteUrl(file);
}

// @method getDownloadPdfUrl @param {Object} params @returns {String}
export function getDownloadPdfUrl(params: UrlParameters): string {
    params = params || {};
    params.n =
        (SC &&
            SC.ENVIRONMENT &&
            SC.ENVIRONMENT.siteSettings &&
            SC.ENVIRONMENT.siteSettings.siteid) ||
        '';

    return addParamsToUrl(getAbsoluteUrl('download.ssp'), params);
}

export function getWindow(): Window {
    return window;
}

// @method doPost Performs a POST operation to a specific url @param {String} url
export function doPost(url: string): void {
    const form = jQuery(`<form id="do-post" method="POST" action="${url}"></form>`).hide();

    // we have to append it to the dom  for browser compatibility
    // check if the form already exists
    // (user could cancel the operation before it gets to the submit)
    let do_post: any = jQuery('#do-post');
    if (do_post && do_post[0]) {
        do_post[0].action = url;
        do_post[0].method = 'POST';
    } else {
        jQuery('html').append(form);
        do_post = jQuery('#do-post');
    }

    do_post[0].submit();
}

// @method getPathFromObject @param {Object} object @param {String}
// path a path with values separated by dots @param {Any}
// default_value value to return if nothing is found.
/**
 *
 * @deprecated The use of this method is not secure because it is not
 * possible to make a static type check
 **/
export function getPathFromObject(object, path: string, default_value?) {
    if (!path) {
        return object;
    }
    if (object) {
        const tokens = path.split('.');
        let prev = object;
        let n = 0;

        while (!_.isUndefined(prev) && n < tokens.length) {
            prev = prev[tokens[n++]];
        }

        if (!_.isUndefined(prev)) {
            return prev;
        }
    }

    return default_value;
}

// @method setPathFromObject @param {Object} object @param {String}
// path a path with values separated by dots @param {Any} value the value to set

/**
 *
 * @deprecated The use of this method is not secure because
 * it is not possible to make a static type check
 **/
export function setPathFromObject(object, path: string, value) {
    if (!path) {
        return;
    }
    if (!object) {
        return;
    }

    const tokens: string[] = path.split('.');
    let prev: any = object;

    for (let token_idx = 0; token_idx < tokens.length - 1; ++token_idx) {
        const current_token = tokens[token_idx];

        if (_.isUndefined(prev[current_token])) {
            prev[current_token] = {};
        }
        prev = prev[current_token];
    }
    const index: any = _.last(tokens);
    prev[index] = value;
}

let isScreenScrolling = false;
export function animatedScroll(element: HTMLElement): void {
    const { top } = jQuery(element).offset();
    if (!isScreenScrolling && top) {
        isScreenScrolling = true;
        jQuery('html, body').animate(
            { scrollTop: top },
            600,
            'swing',
            (): void => {
                isScreenScrolling = false;
            }
        );
    }
}

// @method ellipsis creates the ellipsis animation
// (used visually while waiting to something) @param {String} selector
export function ellipsis(selector: string): void {
    if (!jQuery(selector).data('ellipsis')) {
        const values: string[] = ['', '.', '..', '...', '..', '.'];
        let count = 0;
        let element: JQuery<HTMLElement> | null = jQuery(selector);

        element.data('ellipsis', true);
        element.css('visibility', 'hidden');
        element.html('...');
        element.css('width', element.css('width'));
        element.css('display', 'inline-block');
        element.html('');
        element.css('visibility', 'visible');

        const timer = setInterval(function() {
            if (jQuery(selector).length && element) {
                element.html(values[count % values.length]);
                count += 1;
            } else {
                clearInterval(timer);
                element = null;
            }
        }, 250);
    }
}

// @method reorderUrlParams
// @param {String} url
// @return {String} the url with reordered parameters
export function reorderUrlParams(url: string): string {
    let params: string[] = [];
    const url_array: string[] = url.split('?');

    if (url_array.length > 1) {
        params = url_array[1].split('&');
        return `${url_array[0]}?${params.sort().join('&')}`;
    }

    return url_array[0];
}

// @method isShoppingDomain determines if we are in shopping domain (secure or non secure)
// or single domain
// @return {Boolean} true if in checkout or in single domain
export function isShoppingDomain(): boolean {
    return SC.ENVIRONMENT.siteSettings.shoppingSupported;
}

// @method isCheckoutDomain determines if we are in a secure checkout
// domain or in a secure single domain environment
// @return {Boolean} true if in checkout or in single domain
export function isCheckoutDomain(): boolean {
    return SC.ENVIRONMENT.siteSettings.checkoutSupported;
}

// @method isSingleDomain determines if we are in a single domain environment
// @return {Boolean} true if single domain
export function isSingleDomain(): boolean {
    return SC.ENVIRONMENT.siteSettings.isSingleDomain;
}

// @method isInShopping determines if we are in shopping ssp
// used when there are frontend features only shown in the shopping domain
// @return {Boolean} true if in shopping domain, false if in checkout or myaccount
export function isInShopping(): boolean {
    return (
        isShoppingDomain() &&
        (SC.ENVIRONMENT.SCTouchpoint === 'shopping' ||
            SC.ENVIRONMENT.siteSettings.sitetype === 'STANDARD')
    );
}

// @method isInCheckout determines if we are in checkout or my account ssp
// @return {Boolean} true if in checkout domain
export function isInCheckout(): boolean {
    return !isSingleDomain()
        ? isCheckoutDomain()
        : isCheckoutDomain() &&
              (SC.ENVIRONMENT.SCTouchpoint === 'checkout' ||
                  SC.ENVIRONMENT.SCTouchpoint === 'myaccount');
}

// @method getParameterByName @param {String} url @param {String} param_name
export function getParameterByName(url: string, param_name: string): string {
    param_name = param_name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${param_name}=([^&#]*)`);
    const results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export function isPageGenerator(): boolean {
    return _.result(SC, 'isPageGenerator') || _.result(SC, 'isPageGenerator');
}

// @export function Remove script tags in a html text @param {String} text
export function removeScripts(text: string): string {
    const SCRIPT_REGEX = /<\s*script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (isPageGenerator() && text) {
        text = text.replace(/(<!--[\s\S]*?-->)/g, ' $1 '); // invalidates de XSS attack like <scr<!--cheat-->ipt> - keep the comment and add spaces
        while (SCRIPT_REGEX.test(text)) {
            text = text.replace(SCRIPT_REGEX, '');
        }
    }
    return text || '';
}

// @export function Reduce unnecessary spaces in html texts @param {String} text
export function minifyMarkup(text: string): string {
    return (
        text
            // remove spaces between tags.
            .replace(/\>\s+</g, '><')
            // remove html comments that our markup could have.
            .replace(/<!--[\s\S]*?-->/g, '')
            // replace multiple spaces with a single one.
            .replace(/\s+/g, ' ')
    );
}

export function oldIE(version: number = 7): boolean {
    const ie_version: number = version;
    // IE7 detection courtesy of Backbone
    // More info: http://www.glennjones.net/2006/02/getattribute-href-bug/
    const isExplorer = /msie [\w.]+/;
    const docMode: number | undefined = (<any>document).documentMode;
    let result = false;
    if (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= ie_version)) {
        result = true;
    }
    return result;
}

// @method require The motive for this method is being able to call require()
// of modules in-line without breaking amd-optimizer because we cannot use require()
// directly passing variables as dependencies because amd-optimizer will try to parse that and fail.
// @param {Array<String>} dependencies
// @param {Function} fn
export function requireModules(...args) {
    return srcRequire(...args);
}

// we are caching window width so this won't work on window resize.
// Same for data-templates in views.
let viewport_width: number | undefined = 0;
let viewport_height: number | undefined = 0;

// @method resetViewportWidth resets viewport width explicitly to be updated on resize.
export function resetViewportWidth(): void {
    viewport_width = 0;
}

// @method getViewportWidth @return {Number} the width of the viewport in pixels
export function getViewportWidth(): number | undefined {
    if (viewport_width !== undefined && jQuery(window).width() !== undefined) {
        viewport_width = jQuery(window).width();
    }
    return viewport_width;
}

// @method getViewportHeight @return {Number} the height of the viewport in pixels
export function getViewportHeight(): number | undefined {
    if (viewport_height !== undefined && jQuery(window).height() !== undefined) {
        viewport_height = jQuery(window).height();
    }
    return viewport_height;
}

export function getDeviceType(widthToCheck?: number): string {
    const width = widthToCheck || getViewportWidth();

    if (width !== undefined && width < 768) {
        return 'phone';
    }
    if (width !== undefined && width < 992) {
        return 'tablet';
    }
    return 'desktop';
}

// @method selectByViewportWidth depending on current viewport width it will
// return one of the passed options that are named 'phone', 'tablet' or 'desktop'
// @param {Object<String,Any>} options @param defaultValue @return {Any}
interface ViewPortOption {
    phone: string;
    tablet: string;
    desktop: string;
}

export function selectByViewportWidth(options: ViewPortOption, defaultValue: string): string {
    const device: string = getDeviceType();
    return options[device] || defaultValue;
}

export function isPhoneDevice(): boolean {
    return getDeviceType() === 'phone';
}

export function isTabletDevice(): boolean {
    return getDeviceType() === 'tablet';
}

export function isDesktopDevice(): boolean {
    return getDeviceType() === 'desktop';
}

export function isNativeDatePickerSupported(): boolean {
    const input = document.createElement('input');
    input.setAttribute('type', 'date');

    // if special input is not supported browser will fall back to text
    return input.type !== 'text';
}

export function initBxSlider($element: JQueryBxSlider, options: SliderOptions) {
    if ($element.bxSlider && !oldIE() && !SC.isPageGenerator()) {
        $element.bxSlider(options);
    }
    return $element;
}


interface ExponentialDelayOptions {
    x: number;
    settings: ExponentialDelayOptionsSettings;
}

interface ExponentialDelayOptionsSettings {
    base: number;
    y: number;
    retries: number;
}

export function getExponentialDelay(options: ExponentialDelayOptions): number {
    const settings = options.settings || {
        base: 1.5,
        y: 0.8,
        retries: 2
    };
    return (settings.base ** options.x - settings.y) * 1000;
}

// @function imageFlatten
// Helper function that receives the itemimages_detail (returned by the search api)
// and flattens it into an array of objects containing url and altimagetext
// @param {Object} images Receives the itemimages_detail
// (returned by the search api) which is a multi-level tree-like object grouped by "categories"
// @return {Array<ImageContainer>}
interface ImageContainer {
    urls?: UrlImage[];
    media?: ImageContainer;
}

interface UrlImage {
    url?: string;
    altimagetext?: string;
}

export function imageFlatten(images: ImageContainer): UrlImage[] {
    const result: UrlImage[][] = [];
    if ('url' in images && 'altimagetext' in images) {
        return [images];
    }
    Object.getOwnPropertyNames(images).forEach((key: string) => {
        if (_.isArray(images[key])) {
            result.push(images[key]);
        } else {
            result.push(imageFlatten(images[key]));
        }
    });
    return _.flatten(result);
}

// @method omitParameter
// Omit parameter from url
// @param {String} url - Url where the parameter is ommited
// @param {String} parameter - Parameter to be omitted
// @param {String} site - Site where params are added
// @return {String} Url genearated from site without the parameter
export function omitParameter(url: string, parameter: string, site: string): string {
    const url_data = parseUrlOptions(url);
    delete url_data[parameter];
    return addParamsToUrl(site, url_data);
}

// @method generateUrl
// Generate site from url
// @param {String} site - Ssp file name
// @param {String} [omitSearchParameter] - Parameter to be omitted in the search
// @return {String} Url genearated from site
export function generateUrl(site: string, omitSearchParameter?: string): string {
    const ssp: string =
        site + (window.location.href.indexOf('-local.ssp') !== -1 ? '-local.ssp' : '.ssp');
    let url: string = ssp + window.location.search;
    if (omitSearchParameter) {
        url = omitParameter(window.location.search, omitSearchParameter, ssp);
    }

    return window.location.pathname.replace(/\/c.(\w+)\/pos\/(.*)/, `/c.$1/pos/${url}`);
}

// Get a base64 representation of an image
// @param {String} src - Url for the image to download
// @param {String} callback - export function to invoke when the image is loaded and transformed
// @param {String} outputFormat - format of the image to download (defaults to image/png)
export function getBase64Image(src: string, outputFormat?: string): JQuery.Deferred<string> {
    const promise: JQuery.Deferred<string> = jQuery.Deferred();
    const img: HTMLImageElement = new Image();
    // img.crossOrigin = 'Anonymous';
    img.onload = function() {
        const canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement;
        const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        if (context) {
            context.drawImage(img, 0, 0);
        }

        const dataURL: string = canvas.toDataURL(outputFormat);
        promise.resolve(dataURL);
    };

    img.onerror = function() {
        promise.reject();
    };

    img.src = src;
    return promise;
}

interface ConfigurableImagesUrl {
    mainLogo: string;
    printableLogo: string;
    loginLogo: string;
    aboutLogo?: string;
    wallpaper?: string;
}

export function isTrue(value: string | boolean): boolean {
    return _.isBoolean(value) ? value : value === 'T';
}

export function isFalse(value: string | boolean): boolean {
    return _.isBoolean(value) ? !value : value === 'F';
}

export function getConfigurableImages(
    urls: ConfigurableImagesUrl
): JQuery.Deferred<ConfigurableImagesUrl> {
    const result = jQuery.Deferred();
    const def: JQuery.Deferred<string>[] = [];
    const configurableImage: ConfigurableImagesUrl = {
        mainLogo: '',
        printableLogo: '',
        loginLogo: ''
    };

    Object.getOwnPropertyNames(urls).forEach(key => {
        const image64 = getBase64Image(urls[key]);
        def.push(image64);
        image64.then(resultImage => {
            configurableImage[key] = resultImage;
        });
    });

    jQuery.when(...def).then(() => {
        result.resolve(configurableImage);
    });
    return result;
}

// Removes empty objects and arrays and deletes null, undefined and empty strings properties.
// This diminishes the total output weight and helps the templates
// use ifs with the "has_content" export function and get expected results.
// c: string
// n: number
// currency: string | null

interface JsonParamaters {
    [key: string]: JsonParamaters | string | number | JsonParamaters[];
    [key: number]: JsonParamaters | string | number | JsonParamaters[];
}
/**
 *
 * @deprecated
 */
export function cleanObject<T>(json: T): void {
    _.each(_.keys(json), function(key) {
        if (
            (!json[key] && json[key] !== 0 && json[key] !== false) ||
            (_.isObject(json[key]) && _.isEmpty(json[key]))
        ) {
            delete json[key];
        } else {
            cleanObject(json[key]);
        }

        // Check again in case all of the inner keys were deleted
        if (_.isObject(json[key]) && _.isEmpty(json[key])) {
            delete json[key];
        }
    });
}

// @method parseRichText
// Parse core data that comes from richtext
// @param {String} richtext - string containing partially encoded HTML
export function parseRichText(richtext: string): string {
    const div = jQuery('<div></div>');
    div.html(richtext);
    return div.text();
}

// @method addSlashToURL check if exist a slash at the beginning of the url
// and if not exist add a slash
// @return {string} This method return a url starting with a slash.
export function addSlashToURL(url: string): string {
    if (!/^\//.test(url)) {
        url = `/${url}`;
    }
    return url;
}

// custom add Html to pdf make function
  export function htmlToPdfMake(htmlText:any, options:any):string {
    // "use strict";
    this.wndw = options && options.window ? options.window : window;
    this.tableAutoSize =
      options && typeof options.tableAutoSize === "boolean"
        ? options.tableAutoSize
        : true;
    this.imagesByReference =
      options && typeof options.imagesByReference === "boolean"
        ? options.imagesByReference
        : false;
    this.fontSizes =
      options && Array.isArray(options.fontSizes)
        ? options.fontSizes
        : [10, 14, 16, 18, 20, 24, 28];
    this.defaultStyles = {
      b: { bold: true },
      strong: { bold: true },
      u: { decoration: "underline" },
      del: { decoration: "lineThrough" },
      s: { decoration: "lineThrough" },
      em: { italics: true },
      i: { italics: true },
      h1: { fontSize: 24, bold: true, marginBottom: 5 },
      h2: { fontSize: 22, bold: true, marginBottom: 5 },
      h3: { fontSize: 20, bold: true, marginBottom: 5 },
      h4: { fontSize: 18, bold: true, marginBottom: 5 },
      h5: { fontSize: 16, bold: true, marginBottom: 5 },
      h6: { fontSize: 14, bold: true, marginBottom: 5 },
      a: { color: "blue", decoration: "underline" },
      strike: { decoration: "lineThrough" },
      p: { margin: [0, 5, 0, 10] },
      ul: { marginBottom: 5, marginLeft: 5 },
      table: { marginBottom: 5  },
      th: { bold: true, fillColor: "#EEEEEE" },
    };
    this.imagesRef = [];
    this.changeDefaultStyles = function () {
      for (var keyStyle in options.defaultStyles) {
        if (this.defaultStyles.hasOwnProperty(keyStyle)) {
          if (
            options.defaultStyles.hasOwnProperty(keyStyle) &&
            !options.defaultStyles[keyStyle]
          ) {
            delete this.defaultStyles[keyStyle];
          } else {
            for (var k in options.defaultStyles[keyStyle]) {
              if (options.defaultStyles[keyStyle][k] === "")
                delete this.defaultStyles[keyStyle][k];
              else
                this.defaultStyles[keyStyle][k] =
                  options.defaultStyles[keyStyle][k];
            }
          }
        } else {
          this.defaultStyles[keyStyle] = {};
          for (var ks in options.defaultStyles[keyStyle]) {
            this.defaultStyles[keyStyle][ks] =
              options.defaultStyles[keyStyle][ks];
          }
        }
      }
    };
    if (options && options.defaultStyles) {
      this.changeDefaultStyles();
    }
    this.convertHtml = function (htmlText) {
      var parser = new this.wndw.DOMParser();
      var parsedHtml = parser.parseFromString(htmlText, "text/html");
      var docDef = this.parseElement(parsedHtml.body, []);
      return docDef.stack || docDef.text;
    };
    this.parseElement = function (element:any, parents:any) {
      var nodeName = element.nodeName.toUpperCase();
      var nodeNameLowerCase = nodeName.toLowerCase();
      var ret = { text: [] };
      var text,
        needStack = false;
      var dataset,
        i,
        key,
        _this = this;
      if (["COLGROUP", "COL"].indexOf(nodeName) > -1) return "";
      switch (element.nodeType) {
        case 3: {
          if (element.textContent) {
            text = element.textContent;
            var styleParentTextNode = this.parseStyle(
              parents[parents.length - 1],
              true
            );
            var hasWhiteSpace = false;
            for (i = 0; i < styleParentTextNode.length; i++) {
              if (
                styleParentTextNode[i].key === "preserveLeadingSpaces"
              ) {
                hasWhiteSpace = styleParentTextNode[i].value;
                break;
              }
            }
            if (!hasWhiteSpace)
              text = element.textContent.replace(/\n(\s+)?/g, "");
            if (options && typeof options.replaceText === "function")
              text = options.replaceText(text, parents);
            if (
              [
                "TABLE",
                "THEAD",
                "TBODY",
                "TFOOT",
                "TR",
                "UL",
                "OL",
              ].indexOf(parents[parents.length - 1].nodeName) > -1
            )
              text = text.replace(
                /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
                ""
              );
            if (text) {
              ret = { text: text };
              ret = this.applyStyle({ ret: ret, parents: parents });
              return ret;
            }
          }
          return "";
        }
        case 1: {
          ret["nodeName"] = nodeName;
          if (element.id) ret["id"] = element.id;
          parents.push(element);
          if (element.childNodes && element.childNodes.length > 0) {
            [].forEach.call(element.childNodes, function (child) {
              var res = _this.parseElement(child, parents);
              if (res) {
                if (Array.isArray(res.text) && res.text.length === 0)
                  res.text = "";
                ret.text.push(res);
              }
            });
            needStack = this.searchForStack(ret);
            if (needStack) {
              ret["stack"] = ret.text.slice(0);
              delete ret.text;
            } else {
              ret = this.applyStyle({ ret: ret, parents: parents });
            }
          }
          parents.pop();
          switch (nodeName) {
            case "TABLE": {
              var rowIndex, cellIndex;
              ret["table"] = { body: [] };
              var tbodies = ret["stack"] || ret.text;
              if (Array.isArray(tbodies)) {
                rowIndex = 0;
                var allRows = [];
                tbodies.forEach(function (tbody) {
                  var rows = tbody.stack || tbody.text;
                  if (Array.isArray(rows)) {
                    allRows = allRows.concat(rows);
                    rows.forEach(function (row) {
                      var cells = row.stack || row.text;
                      if (Array.isArray(cells)) {
                        cellIndex = 0;
                        ret["table"].body[rowIndex] = [];
                        cells.forEach(function (cell) {
                          ret["table"].body[rowIndex].push(cell);
                          if (cell.colSpan) {
                            i = cell.colSpan;
                            _this.setRowSpan({
                              rows: allRows,
                              cell: cell,
                              rowIndex: rowIndex,
                              cellIndex: cellIndex,
                            });
                            while (--i > 0) {
                              ret["table"].body[rowIndex].push({
                                text: "",
                              });
                              _this.setRowSpan({
                                rows: allRows,
                                cell: cell,
                                rowIndex: rowIndex,
                                cellIndex: cellIndex,
                              });
                              cellIndex++;
                            }
                          } else {
                            _this.setRowSpan({
                              rows: allRows,
                              cell: cell,
                              rowIndex: rowIndex,
                              cellIndex: cellIndex,
                            });
                          }
                          cellIndex++;
                        });
                        rowIndex++;
                      }
                    });
                  }
                });
              }
              delete ret["stack"];
              delete ret.text;
              ret = this.applyStyle({
                ret: ret,
                parents: parents.concat([element]),
              });
              if (this.tableAutoSize) {
                var cellsWidths = [];
                var cellsHeights = [];
                var tableWidths = [];
                var tableHeights = [];
                ret["table"].body.forEach(function (row, rowIndex) {
                  cellsWidths.push([]);
                  cellsHeights.push([]);
                  row.forEach(function (cell) {
                    var width =
                      typeof cell.width !== "undefined"
                        ? cell.width
                        : "auto";
                    var height =
                      typeof cell.height !== "undefined"
                        ? cell.height
                        : "auto";
                    if (width !== "auto" && cell.colSpan) {
                      if (!isNaN(width)) width /= cell.colSpan;
                      else width = "auto";
                    }
                    if (height !== "auto" && cell.rowSpan) {
                      if (!isNaN(height)) height /= cell.colSpan;
                      else height = "auto";
                    }
                    cellsWidths[rowIndex].push(width);
                    cellsHeights[rowIndex].push(height);
                  });
                });
                cellsWidths.forEach(function (row) {
                  row.forEach(function (cellWidth, cellIndex) {
                    var type = typeof tableWidths[cellIndex];
                    if (
                      type === "undefined" ||
                      (cellWidth !== "auto" &&
                        type === "number" &&
                        cellWidth > tableWidths[cellIndex]) ||
                      (cellWidth !== "auto" &&
                        tableWidths[cellIndex] === "auto")
                    ) {
                      tableWidths[cellIndex] = cellWidth;
                    }
                  });
                });
                cellsHeights.forEach(function (row, rowIndex) {
                  row.forEach(function (cellHeight) {
                    var type = typeof tableHeights[rowIndex];
                    if (
                      type === "undefined" ||
                      (cellHeight !== "auto" &&
                        type === "number" &&
                        cellHeight > tableHeights[rowIndex]) ||
                      (cellHeight !== "auto" &&
                        tableHeights[rowIndex] === "auto")
                    ) {
                      tableHeights[rowIndex] = cellHeight;
                    }
                  });
                });
                if (tableWidths.length > 0)
                  ret["table"].widths = tableWidths;
                if (tableHeights.length > 0)
                  ret["table"].heights = tableHeights;
              }
              if (element.dataset && element.dataset.pdfmake) {
                dataset = element.dataset.pdfmake;
                if (dataset.charAt(1) === "'")
                  dataset = dataset.replace(/'/g, '"');
                try {
                  dataset = JSON.parse(dataset);
                  for (key in dataset) {
                    if (key === "layout") {
                      ret["layout"] = dataset[key];
                    } else {
                      ret["table"][key] = dataset[key];
                    }
                  }
                } catch (e) {
                  console.error(e);
                }
              }
              break;
            }
            case "TH":
            case "TD": {
              if (element.getAttribute("rowspan"))
                ret["rowSpan"] = element.getAttribute("rowspan") * 1;
              if (element.getAttribute("colspan"))
                ret["colSpan"] = element.getAttribute("colspan") * 1;
              ret = this.applyStyle({
                ret: ret,
                parents: parents.concat([element]),
              });
              break;
            }
            case "SVG": {
              (<any>ret) = {
                svg: element.outerHTML.replace(/\n(\s+)?/g, ""),
                nodeName: "SVG",
                style: ["html-svg"],
              };
              break;
            }
            case "BR": {
              ret.text = [{ text: "\n" }];
              break;
            }
            case "SUB":
            case "SUP": {
              ret[nodeName.toLowerCase()] = {
                offset: "30%",
                fontSize: 8,
              };
              break;
            }
            case "HR": {
              var styleHR = {
                width: 514,
                type: "line",
                margin: [0, 12, 0, 12],
                thickness: 0.5,
                color: "#000000",
                left: 0,
              };
              if (element.dataset && element.dataset.pdfmake) {
                dataset = JSON.parse(element.dataset.pdfmake);
                for (key in dataset) {
                  styleHR[key] = dataset[key];
                }
              }
              ret["margin"] = styleHR.margin;
              ret["canvas"] = [
                {
                  type: styleHR.type,
                  x1: styleHR.left,
                  y1: 0,
                  x2: styleHR.width,
                  y2: 0,
                  lineWidth: styleHR.thickness,
                  lineColor: styleHR.color,
                },
              ];
              delete ret.text;
              break;
            }
            case "OL":
            case "UL": {
              ret[nodeNameLowerCase] = (ret["stack"] || ret.text).slice(0);
              delete ret["stack"];
              delete ret.text;
              ret = this.applyStyle({
                ret: ret,
                parents: parents.concat([element]),
              });
              if (element.getAttribute("start")) {
                ret["start"] = element.getAttribute("start") * 1;
              }
              switch (element.getAttribute("type")) {
                case "A":
                  ret["type"] = "upper-alpha";
                  break;
                case "a":
                  ret["type"] = "lower-alpha";
                  break;
                case "I":
                  ret["type"] = "upper-roman";
                  break;
                case "i":
                  ret["type"] = "lower-roman";
                  break;
              }
              if (ret["listStyle"] || ret["listStyleType"])
                ret["type"] = ret["listStyle"] || ret["listStyleType"];
              break;
            }
            case "LI": {
              if (ret["stack"] && !ret["stack"][ret["stack"].length - 1].text) {
                text = ret["stack"].slice(0, -1);
                (<any>ret) = [{ text: text }, ret["stack"][ret["stack"].length - 1]];
              }
              break;
            }
            case "IMG": {
              if (this.imagesByReference) {
                var src = element.getAttribute("src");
                var index = this.imagesRef.indexOf(src);
                if (index > -1) ret["image"] = "img_ref_" + index;
                else {
                  ret["image"] = "img_ref_" + this.imagesRef.length;
                  this.imagesRef.push(src);
                }
              } else {
                ret["image"] = element.getAttribute("src");
              }
              delete ret["stack"];
              delete ret.text;
              ret = this.applyStyle({
                ret: ret,
                parents: parents.concat([element]),
              });
              break;
            }
            case "A": {
              var setLink = function (pointer, href) {
                pointer = pointer || { text: "" };
                if (Array.isArray(pointer.text)) {
                  return setLink(pointer.text[0], href);
                }
                if (href.indexOf("#") === 0)
                  pointer.linkToDestination = href.slice(1);
                else pointer.link = href;
                pointer.nodeName = "A";
                return pointer;
              };
              if (element.getAttribute("href")) {
                ret = setLink(ret, element.getAttribute("href"));
              }
              break;
            }
            case "FONT": {
              if (element.getAttribute("color")) {
                ret["color"] = this.parseColor(
                  element.getAttribute("color")
                );
              }
              if (element.getAttribute("size")) {
                var size = Math.min(
                  Math.max(1, parseInt(element.getAttribute("size"))),
                  7
                );
                var fontSize = Math.max(
                  this.fontSizes[0],
                  this.fontSizes[size - 1]
                );
                ret["fontSize"] = fontSize;
              }
              ret = this.applyStyle({
                ret: ret,
                parents: parents.concat([element]),
              });
              break;
            }
            default: {
              if (options && typeof options.customTag === "function") {
                ret = options.customTag.call(this, {
                  element: element,
                  parents: parents,
                  ret: ret,
                });
              }
            }
          }
          if (
            Array.isArray(ret.text) &&
            ret.text.length === 1 &&
            ret.text[0].text &&
            !ret.text[0].nodeName
          ) {
            ret.text = ret.text[0].text;
          }
          if (
            ["HR", "TABLE"].indexOf(nodeName) === -1 &&
            element.dataset &&
            element.dataset.pdfmake
          ) {
            dataset = JSON.parse(element.dataset.pdfmake);
            for (key in dataset) {
              ret[key] = dataset[key];
            }
          }
          return ret;
        }
      }
    };
    this.searchForStack = function (ret) {
      if (Array.isArray(ret.text)) {
        for (var i = 0; i < ret.text.length; i++) {
          if (
            ret.text[i].stack ||
            [
              "P",
              "DIV",
              "TABLE",
              "SVG",
              "UL",
              "OL",
              "IMG",
              "H1",
              "H2",
              "H3",
              "H4",
              "H5",
              "H6",
            ].indexOf(ret.text[i].nodeName) > -1
          )
            return true;
          if (this.searchForStack(ret.text[i]) === true) return true;
        }
      }
      return false;
    };
    this.setRowSpan = function (params) {
      var cells;
      if (params.cell.rowSpan) {
        for (var i = 1; i <= params.cell.rowSpan - 1; i++) {
          cells =
            params.rows[params.rowIndex + i].text ||
            params.rows[params.rowIndex + i].stack;
          cells.splice(params.cellIndex, 0, { text: "" });
        }
      }
    };
    this.applyStyle = function (params) {
      var cssClass = [];
      var lastIndex = params.parents.length - 1;
      var _this = this;
      params.parents.forEach(function (parent, parentIndex) {
        var parentNodeName = parent.nodeName.toLowerCase();
        var htmlClass = "html-" + parentNodeName;
        if (
          htmlClass !== "html-body" &&
          cssClass.indexOf(htmlClass) === -1
        )
          cssClass.unshift(htmlClass);
        var parentClass = (parent.getAttribute("class") || "").split(
          " "
        );
        parentClass.forEach(function (p) {
          if (p) cssClass.push(p);
        });
        var style;
        var ignoreNonDescendentProperties = parentIndex !== lastIndex;
        if (_this.defaultStyles[parentNodeName]) {
          for (style in _this.defaultStyles[parentNodeName]) {
            if (
              _this.defaultStyles[parentNodeName].hasOwnProperty(style)
            ) {
              if (
                !ignoreNonDescendentProperties ||
                (ignoreNonDescendentProperties &&
                  style.indexOf("margin") === -1 &&
                  style.indexOf("border") === -1)
              ) {
                if (style === "decoration") {
                  if (!Array.isArray(params.ret[style]))
                    params.ret[style] = [];
                  if (
                    params.ret[style].indexOf(
                      _this.defaultStyles[parentNodeName][style]
                    ) === -1
                  ) {
                    params.ret[style].push(
                      _this.defaultStyles[parentNodeName][style]
                    );
                  }
                } else {
                  params.ret[style] = JSON.parse(
                    JSON.stringify(
                      _this.defaultStyles[parentNodeName][style]
                    )
                  );
                }
              }
            }
          }
        }
        if (parentNodeName === "tr")
          ignoreNonDescendentProperties = false;
        style = _this.parseStyle(parent, ignoreNonDescendentProperties);
        style.forEach(function (stl) {
          if (stl.key === "decoration") {
            if (!Array.isArray(params.ret[stl.key]))
              params.ret[stl.key] = [];
            params.ret[stl.key].push(stl.value);
          } else {
            if (params.ret.margin && stl.key.indexOf("margin") === 0) {
              switch (stl.key) {
                case "marginLeft":
                  params.ret.margin[0] = stl.value;
                  break;
                case "marginTop":
                  params.ret.margin[1] = stl.value;
                  break;
                case "marginRight":
                  params.ret.margin[2] = stl.value;
                  break;
                case "marginBottom":
                  params.ret.margin[3] = stl.value;
                  break;
              }
            } else {
              params.ret[stl.key] = stl.value;
            }
          }
        });
      });
      params.ret.style = cssClass;
      return params.ret;
    };
    this.parseStyle = function (element, ignoreProperties) {
      var style = element.getAttribute("style") || "";
      style = style.split(";");
      if (element.getAttribute("width")) {
        style.unshift("width:" + element.getAttribute("width") + "px");
      }
      if (element.getAttribute("height")) {
        style.unshift(
          "height:" + element.getAttribute("height") + "px"
        );
      }
      var styleDefs = style.map(function (style) {
        return style.toLowerCase().split(":");
      });
      var ret = [];
      var borders = [];
      var nodeName = element.nodeName.toUpperCase();
      var _this = this;
      styleDefs.forEach(function (styleDef) {
        if (styleDef.length === 2) {
          var key = styleDef[0].trim();
          var value = styleDef[1].trim();
          switch (key) {
            case "margin": {
              if (ignoreProperties) break;
              value = value.split(" ");
              if (value.length === 1)
                value = [value[0], value[0], value[0], value[0]];
              else if (value.length === 2) value = [value[1], value[0]];
              else if (value.length === 3)
                value = [value[1], value[0], value[1], value[2]];
              else if (value.length === 4)
                value = [value[3], value[0], value[1], value[2]];
              value.forEach(function (val, i) {
                value[i] = _this.convertToUnit(val);
              });
              if (value.indexOf(false) === -1)
                ret.push({ key: key, value: value });
              break;
            }
            case "text-align": {
              ret.push({ key: "alignment", value: value });
              break;
            }
            case "font-weight": {
              if (value === "bold")
                ret.push({ key: "bold", value: true });
              break;
            }
            case "text-decoration": {
              ret.push({
                key: "decoration",
                value: _this.toCamelCase(value),
              });
              break;
            }
            case "font-style": {
              if (value === "italic")
                ret.push({ key: "italics", value: true });
              break;
            }
            case "font-family": {
              ret.push({
                key: "font",
                value: value
                  .split(",")[0]
                  .replace(/"|^'|^\s*|\s*$|'$/g, "")
                  .replace(/^([a-z])/g, function (g) {
                    return g[0].toUpperCase();
                  })
                  .replace(/ ([a-z])/g, function (g) {
                    return g[1].toUpperCase();
                  }),
              });
              break;
            }
            case "color": {
              ret.push({
                key: "color",
                value: _this.parseColor(value),
              });
              break;
            }
            case "background-color": {
              ret.push({
                key:
                  nodeName === "TD" || nodeName === "TH"
                    ? "fillColor"
                    : "background",
                value: _this.parseColor(value),
              });
              break;
            }
            case "text-indent": {
              ret.push({
                key: "leadingIndent",
                value: _this.convertToUnit(value),
              });
              break;
            }
            case "white-space": {
              ret.push({
                key: "preserveLeadingSpaces",
                value:
                  value === "break-spaces" ||
                  value.slice(0, 3) === "pre",
              });
              break;
            }
            default: {
              if (
                key === "border" ||
                key.indexOf("border-left") === 0 ||
                key.indexOf("border-top") === 0 ||
                key.indexOf("border-right") === 0 ||
                key.indexOf("border-bottom") === 0
              ) {
                if (!ignoreProperties)
                  borders.push({ key: key, value: value });
              } else {
                if (
                  ignoreProperties &&
                  (key.indexOf("margin-") === 0 ||
                    key === "width" ||
                    key === "height")
                )
                  break;
                if (key.indexOf("padding") === 0) break;
                if (key.indexOf("-") > -1) key = _this.toCamelCase(key);
                if (value) {
                  var parsedValue = _this.convertToUnit(value);
                  ret.push({
                    key: key,
                    value: parsedValue === false ? value : parsedValue,
                  });
                }
              }
            }
          }
        }
      });
      if (borders.length > 0) {
        var border = [];
        var borderColor = [];
        borders.forEach(function (b) {
          var properties = b.value.split(" ");
          var width = properties[0]
            .replace(/(\d+)(\.\d+)?([^\d]+)/g, "$1$2 ")
            .trim();
          var index = -1,
            i;
          if (b.key.indexOf("-left") > -1) index = 0;
          else if (b.key.indexOf("-top") > -1) index = 1;
          else if (b.key.indexOf("-right") > -1) index = 2;
          else if (b.key.indexOf("-bottom") > -1) index = 3;
          if (index > -1) {
            border[index] = width > 0;
          } else {
            for (i = 0; i < 4; i++) border[i] = width > 0;
          }
          if (properties.length > 2) {
            var color = properties.slice(2).join(" ");
            if (index > -1) {
              borderColor[index] = _this.parseColor(color);
            } else {
              for (i = 0; i < 4; i++)
                borderColor[i] = _this.parseColor(color);
            }
          }
        });
        for (var i = 0; i < 4; i++) {
          if (border.length > 0 && typeof border[i] === "undefined")
            border[i] = true;
          if (
            borderColor.length > 0 &&
            typeof borderColor[i] === "undefined"
          )
            borderColor[i] = "#000000";
        }
        if (border.length > 0)
          ret.push({ key: "border", value: border });
        if (borderColor.length > 0)
          ret.push({ key: "borderColor", value: borderColor });
      }
      return ret;
    };
    this.toCamelCase = function (str) {
      return str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    };
    this.parseColor = function (color) {
      var haxRegex = new RegExp("^#([0-9a-f]{3}|[0-9a-f]{6})$");
      var rgbRegex = new RegExp(
        "^rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)$"
      );
      var nameRegex = new RegExp("^[a-z]+$");
      if (haxRegex.test(color)) {
        return color;
      } else if (rgbRegex.test(color)) {
        var decimalColors = rgbRegex.exec(color).slice(1);
        for (var i = 0; i < 3; i++) {
          var decimalValue = +decimalColors[i];
          if (decimalValue > 255) {
            decimalValue = 255;
          }
          var hexString = "0" + decimalValue.toString(16);
          hexString = hexString.slice(-2);
          decimalColors[i] = hexString;
        }
        return "#" + decimalColors.join("");
      } else if (nameRegex.test(color)) {
        return color === "transparent" ? "white" : color;
      } else {
        console.error('Could not parse color "' + color + '"');
        return color;
      }
    };
    this.convertToUnit = function (val) {
      if (!isNaN(parseFloat(val)) && isFinite(val)) return val * 1;
      var mtch = (val + "")
        .trim()
        .match(/^(\d+(\.\d+)?)(pt|px|r?em|cm)$/);
      if (!mtch) return false;
      val = mtch[1];
      switch (mtch[3]) {
        case "px": {
          val = Math.round(val * 0.75292857248934);
          break;
        }
        case "em":
        case "rem": {
          val *= 12;
          break;
        }
        case "cm": {
          val = Math.round(val * 28.34646);
          break;
        }
      }
      return val * 1;
    };
    var result = this.convertHtml(htmlText);
    if (typeof result === "string") result = { text: result };
    if (this.imagesByReference) {
      result = { content: result, images: {} };
      this.imagesRef.forEach(function (src, i) {
        result.images["img_ref_" + i] = src;
      });
    }
    return result;
  }




 export function createPDF(HtmlData:any) {

var iframe = document.createElement('iframe');  

iframe.style.visibility = "hidden"; 

iframe.setAttribute("style","height:100%;width:100%; display:none;");
document.body.appendChild(iframe);  
iframe.contentWindow.document.open();
iframe.contentWindow.document.write(HtmlData);      
// Add the IFrame to the web page.
iframe.contentWindow.focus();       
iframe.contentWindow.print(); // Print.
}


// end custom

/**
 * Use jQuery.trim instead
 * @deprecated
 */
export const { trim } = jQuery;
