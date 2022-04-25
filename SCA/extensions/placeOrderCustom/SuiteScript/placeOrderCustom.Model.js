/*
  © 2022 NetSuite Inc.
  User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
  provided, however, if you are an authorized user with a NetSuite account or log-in, you
  may use this code subject to the terms that govern your access and use.
*/

// placeOrderCustom.Model.js
// ----------
// Handles fetching of website Item Data custom records
define('placeOrderCustom.Model', [
  'SC.Model',
  'Application',
  'SiteSettings.Model',
  'Utils',
  'underscore'
], function (
  SCModel,
  Application,
  SiteSettingsModel,
  Utils,
  _

) {
  // @class placeOrderCustom.Model Defines the model used by the placeOrderCustom.Service.ss service
  // @extends SCModel
  return SCModel.extend({
    name: 'placeOrderCustom',
    search: function (option) {
    
      var filters = [];
      filters.push(new nlobjSearchFilter('custrecord_web_customer', null, 'is', nlapiGetUser()));
      filters.push(new nlobjSearchFilter('isinactive', null, 'is', 'F'));
      var columns = [];
      columns.push(new nlobjSearchColumn('custrecord_web_item'));
      columns.push(new nlobjSearchColumn('custrecordcustrecord_web_quantity'));
      columns.push(new nlobjSearchColumn('custrecord_web_size'));
      columns.push(new nlobjSearchColumn('custrecord_web_color'));
      columns.push(new nlobjSearchColumn('custrecord_web_customer'));
      columns.push(new nlobjSearchColumn('custrecordcustrecord_web_url'));

      const unsortResult = Application.getAllSearchResults('customrecord_web_item_data', filters, _.values(columns));
      const mapResults = _.map(unsortResult, function (line) {

        let internalid = line.getValue('custrecord_web_item');
        let displayname = line.getText('custrecord_web_item');
        let quantity = parseInt(line.getValue('custrecordcustrecord_web_quantity'));
        let color_id = line.getValue('custrecord_web_color');
        let color_label = line.getText('custrecord_web_color');;
        let size_id = line.getValue('custrecord_web_size');
        let size_label = line.getText('custrecord_web_size');
        let customerName = line.getText('custrecord_web_customer');
        let customerId = line.getValue('custrecord_web_customer');
        let url = line.getValue('custrecordcustrecord_web_url');

        let Primarykey;

        if (color_label != "" && size_label != "") {
          Primarykey = `${displayname}-${color_label}-${size_label}`
        } else if (color_label != "") {
          Primarykey = `${displayname}-${color_label}`
        } else if (size_label != "") {
          Primarykey = `${displayname}-${size_label}`
        } else {
          Primarykey = `${displayname}-`
        }
        return {
          Primarykey: Primarykey,
          internalid: internalid,
          displayname: displayname,
          quantity: quantity,
          color_id: color_id,
          color_label: color_label,
          size_id: size_id,
          size_label: size_label,
          customerName: customerName,
          customerId: customerId,
          url: url
        };

      });
      let UniqueAndUpdateItems = {};
      for (var i in mapResults) {
        let Primarykey = mapResults[i].Primarykey;
        let internalid = mapResults[i].internalid;
        let displayname = mapResults[i].displayname;
        let quantity = mapResults[i].quantity;
        let color_id = mapResults[i].color_id;
        let color_label = mapResults[i].color_label;
        let size_id = mapResults[i].size_id;
        let size_label = mapResults[i].size_label;
        let customerName = mapResults[i].customerName
        let customerId = mapResults[i].customerId
        let url = mapResults[i].url;
        if (UniqueAndUpdateItems.hasOwnProperty(Primarykey) === true) {
          UniqueAndUpdateItems[Primarykey].quantity += quantity;
        } else {

          UniqueAndUpdateItems[Primarykey] = {

            Primarykey: Primarykey,
            internalid: internalid,
            displayname: displayname,
            quantity: quantity,
            color_id: color_id,
            color_label: color_label,
            size_id: size_id,
            size_label: size_label,
            customerName: customerName,
            customerId: customerId,
            url: url
          }

        }
      }
        /* loading file */


      var file = nlapiLoadFile('1149143');
      var FileVal = file.getValue();
      var ParsApi = JSON.parse(FileVal);
      // nlapiLogExecution('DEBUG', 'File Details', 'FileVal = ' + FileVal);
      _.each(UniqueAndUpdateItems, cust => {
        _.each(ParsApi,api =>{
          var apiID = api.internalid.toString();
          var custID = cust.internalid.toString();

          if (api.matrixchilditems_detail) {

            _.find(api.matrixchilditems_detail,itemOptions => {
                // console.log("itemOptions",JSON.stringify(itemOpt.custitem22));
                if ((itemOptions.custitem22 == cust.color_label && itemOptions.custitem32 == cust.size_label) && (apiID == custID)) {
                    cust.LineId = itemOptions.internalid;
                    cust.priceF = api.onlinecustomerprice_detail.onlinecustomerprice_formatted;
                    cust.price = api.onlinecustomerprice_detail.onlinecustomerprice;
                }
                else if ((itemOptions.custitem22 == cust.color_label && cust.size_label == "") && (apiID== custID)) {
                  cust.LineId = itemOptions.internalid;
                  cust.priceF = api.onlinecustomerprice_detail.onlinecustomerprice_formatted;
                  cust.price = api.onlinecustomerprice_detail.onlinecustomerprice;

                }
                else if ((itemOptions.custitem23 == cust.size_label && cust.color_label == "") && (apiID== cust.internalid)) {
                  cust.LineId = itemOptions.internalid;
                  cust.priceF = api.onlinecustomerprice_detail.onlinecustomerprice_formatted;
                  cust.price = api.onlinecustomerprice_detail.onlinecustomerprice;
                }
            })
        } else if (apiID== cust.internalid) {
          cust.LineId = apiID ;
          cust.priceF = api.onlinecustomerprice_detail.onlinecustomerprice_formatted;
          cust.price = api.onlinecustomerprice_detail.onlinecustomerprice;


        }
        })
    }) 
      
  
    /* end load file*/
      const UniqCustomData = [];
      // console.warn("search", option.search)
      if (option.search) {
        let inputVal = option.search.toUpperCase();
        let arr = [];
          _.each(UniqueAndUpdateItems, x => {
          
            if (option.sort === 'name') {
              x.sortBy = "name"
            } else if(option.sort === 'internalid') {
              x.sortBy = "internalid"
            }
            else if(option.sort === 'price') {
              x.sortBy = "price"
            }
            if (option.order == 1) {
              x.sortlevel = 'high-low'
            } else if (option.order == -1) {
              x.sortlevel = 'low-high'
            };
          
            arr.push({ items: x })
          });
        
        arr.filter(el => {
          let displayname = el.items.displayname.toUpperCase();

          if (displayname.indexOf(inputVal) > -1) {
            return UniqCustomData.push(el);
          }
        })
      } else {
        _.each(UniqueAndUpdateItems, x => {
          if (option.sort === 'name') {
            x.sortBy = "name"
          } else if(option.sort === 'internalid') {
            x.sortBy = "internalid"
          }
          else if(option.sort === 'price') {
            x.sortBy = "price"
          }
          if (option.order == 1) {
            x.sortlevel = 'high-low'
          } else if (option.order == -1) {
            x.sortlevel = 'low-high'
          }
  
          UniqCustomData.push({ items: x })
        })
      };

      if (option.sort === 'name' && option.order == 1) {
        UniqCustomData.sort(function (a, b) {
          var textA = a.items.displayname.toUpperCase();
          var textB = b.items.displayname.toUpperCase();
          // return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; //a-z 
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0; // z-a       
        });
      } else if (option.sort === 'name' && option.order == -1) {
        UniqCustomData.sort(function (a, b) {
          var textA = a.items.displayname.toUpperCase();
          var textB = b.items.displayname.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0; //a-z 
          // return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;           
        });

      } else if (option.sort === 'id' && option.order == 1) {

        UniqCustomData.sort(function (a, b) {
          var idA = a.items.internalid;
          var idB = b.items.internalid;
          return (idA > idB) ? -1 : (idA < idB) ? 1 : 0;  // 10 - 1    
        });

      } else if (option.sort === 'id' && option.order == -1) {
        UniqCustomData.sort(function (a, b) {
          var idA = a.items.internalid;
          var idB = b.items.internalid;
          return (idA < idB) ? -1 : (idA > idB) ? 1 : 0; //1 - 10          
        });

      }else if (option.sort === 'price' && option.order == 1) {

        UniqCustomData.sort(function (a, b) {
          var idA = a.items.price;
          var idB = b.items.price;
          return (idA > idB) ? -1 : (idA < idB) ? 1 : 0;  // 10 - 1    
        });

      } else if (option.sort === 'price' && option.order == -1) {
        UniqCustomData.sort(function (a, b) {
          var idA = a.items.price;
          var idB = b.items.price;
          return (idA < idB) ? -1 : (idA > idB) ? 1 : 0; //1 - 10          
        });

      }
      let itemLen = UniqCustomData.length;
      let page = option.page;
      let PerPage = option.ShowperPage;
      let currentPage = (page * PerPage);
      let totalPages = Math.ceil(itemLen / PerPage);
      let pageData;
      let startRange = page * PerPage - PerPage;
      let endRange = page * PerPage

      if (PerPage < itemLen) {
        pageData = [];
        for (let i = startRange; i < endRange; i++) {
          if (itemLen > i) {
            pageData.push(UniqCustomData[i]);
          }
        }
      } else {
        pageData = UniqCustomData;

      }
      const result = {
        page: option.page,
        recordsPerPage: option.ShowperPage,
        // recordsPerPage:option.perpage,
        records: [],
        totalRecordsFound: itemLen,
      };

      var searchPar;
      if (option.search === " ") {
        searchPar = 'no empty spaces allowed'
      } else if (option.search) {
        searchPar = option.search
      }
      if (itemLen < 1) {
        result.NosearchFound = 'nosearchfound';
      }
      if (option.search) {
        result.search = searchPar;//UniqCustom;
        // result.search = [{searchPar:searchPar }];//UniqCustom;
      }
      result.records = pageData
      return result;
    }
,ItemSearchData: function (data) {
  var returnString = {};
  var DataPars = JSON.stringify(data);
  // console.warn('DataPars',DataPars)
  var dataFile = nlapiCreateFile('ItemData.txt', 'PLAINTEXT', JSON.stringify(data));
  // var dataFile = nlapiCreateFile('ItemData.json','JSON',JSON.stringify(data));
  dataFile.setFolder('2822');
  dataFile.setIsOnline(true);
  var fileId =  nlapiSubmitFile(dataFile);
  returnString.RecordId = fileId.toString();
  returnString.data = data;
  return returnString ;
}
  });

})




