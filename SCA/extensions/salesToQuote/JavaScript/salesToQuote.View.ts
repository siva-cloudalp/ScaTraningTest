/// <amd-module name="salesToQuote.View"/>
import * as salesToQuotey_tpl from 'SalesToQuote.tpl';
import * as _ from 'underscore';

import * as Utils from '../../UtilsExtension/JavaScript/Utils';
import * as jQuery from '../../../Commons/Core/JavaScript/jQuery';
import WizardView = require('../../../Advanced/Wizard/JavaScript/Wizard.View');
import OrderWizardStep = require('../../../Advanced/OrderWizard/JavaScript/OrderWizard.Step');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import AddressListView = require('../../../Commons/Address/JavaScript/Address.List.View');
 

export =  BackboneView.extend({
  template:salesToQuotey_tpl,
  title: 'SalesToQuote',
  page_header: '',
  attributes: {
    id: 'SalesToQuote',
    class: 'SalesToQuote'
},
events:{
  'click [data-action="download-csv"]': 'downloadcsv'
},
  initialize: function (options) {
  
    
  },
  downloadcsv:function(){
    var replaceData = `<table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
    <tr>
      <td>Ernst Handel</td>
      <td>Roland Mendel</td>
      <td>Austria</td>
    </tr>
    <tr>
      <td>Island Trading</td>
      <td>Helen Bennett</td>
      <td>UK</td>
    </tr>
    <tr>
      <td>Laughing Bacchus Winecellars</td>
      <td>Yoshi Tannamuri</td>
      <td>Canada</td>
    </tr>
    <tr>
      <td>Magazzini Alimentari Riuniti</td>
      <td>Giovanni Rovelli</td>
      <td>Italy</td>
    </tr>
  </table>`;
    var iframe = document.createElement('iframe');  

iframe.style.visibility = "hidden"; 

iframe.setAttribute("style","height:100%;width:100%; display:none;");
document.body.appendChild(iframe);  
iframe.contentWindow.document.open();
iframe.contentWindow.document.write(replaceData);      
// Add the IFrame to the web page.
iframe.contentWindow.focus();       
iframe.contentWindow.print(); // Print.
       
  
  },
   
  getContext:function(){
     let model = this.model.models;
  
    return{
      message:"hello"
    }    
  }
})  