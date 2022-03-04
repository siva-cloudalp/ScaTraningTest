
<div class="place_order_custom_container" >
  <div class="place_order_custom_title">
    <h1 class="place_order_custom_title_lable">
      Place order web items
    </h1>
  </div>
  {{#if itemsLength}}
  <div class="place_order_custom_add_to_cart_all" data-type="order-items">
    <button class="place_order_custom_add_to_cart_all_btn" data-action="add-to-cart-all">
      Add To cart All
    </button>
    <div class="transaction-line-views-cell-actionable-alert-placeholders" data-type="alert-placeholder1"></div>
  </div>

    {{#each itemData}}
  <div class="place_order_custom_row" data-type="order-item">
      <div class="place_order_custom_img col-sm-2">
        <a>
					<img src="{{resizeImage this.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}">
				</a>
      </div>

    <div class="place_order_custom_col1" >
      <div class="place_order_custom_section">
      <div class="place_order_custom_item_name">
        <a href="#" class="place_order_custom_item_name_a">
          {{this.displayname}}
        </a>
      </div>

      <div class="place_order_custom_item-price">
        <span class="place_order_custom_item_price_lead" itemprop="price" data-rate={{this.pricelevel1}}>
          {{this.pricelevel1_formatted}}
        </span>
      </div>

      <div class="place_order_custom_item-sku-container">
        <span class="place_order_custom_item-sku-label">
          SKU:
        </span>
        <span class="place_order_custom_item-sku-value" itemprop="sku">
          {{this.displayname}}
        </span>
        </div>
        <div class="place_order_custom_item_quantity-container">
            <span class="place_order_custom_item_quantity-label">Quantity:</span>
            <input type="number"   class="place_order_custom_item_quantity" name="item_quantity" value={{this.quantity}} readonly >
        </div>

        </div>
        
        </div>

    <div class="place_order_custom_col2">
    
      <div class="place_order_custom_add-to-cart-button-container">
        <button data-item-id={{this.internalid}} data-line-id={{this.internalid}} data-parent-id="" data-item-options=""
          data-action="add-to-cart" class="place_order_custom-actions-add-to-cart">
          Add to Cart
        </button>  
        <div class="transaction-line-views-cell-actionable-alert-placeholder" data-type="alert-placeholder"></div>

      </div>
       
    </div>

  </div>
    {{/each}}
    
      {{else}}
        <div class="place-order-custom-oops">
          <h1 class="place-order-custom-oops-lable">
            Oops... no place order custom data found
          </h1>
        </div>
    {{/if}}

		 <div class="reorder-items-list-paginator">
			<div data-view="GlobalViews.Pagination"></div>
			<div data-view="GlobalViews.ShowCurrentPage"></div>
		 
		</div> 
</div>