<div class="place_order_custom_container">
  <header class="place_order_custom_title">
    <h1 class="place_order_custom_title_lable">
      Place order web items
    </h1>
  </header>

  <div data-view="List.Header"></div>

  {{!-- <div class="place_order_custom_add_to_cart_all-url" data-type="order-items">
    <button class="place_order_custom_add_to_cart_all_btn" data-action="add-to-cart-using-url">
      Add To Cart Using Url
    </button>
  </div> --}}
  {{!-- {{#if isLoading}}
  <p class="reorder-items-list-empty">{{translate 'Loading...'}}</p>
  {{/if}} --}}
  {{!-- {{#if itemsLength}} --}}

  {{#if showItems}}
  {{!-- <div class="place-order-custom-section">
    <div class="place-order-custom-search-narrow-by">
      <span class="place-order-custom-display-narrowedby-title">Narrowed By:</span>
      <a class="place-order-custom-display-filter" data-type="facet-selected" data-facet-id="black" href="/search">
        <span> black </span>
        <i class="place-order-custom-display-filter-delete-icon" title="Clear filter"></i>
      </a>
    </div> --}}

    <div class="place_order_custom_add_to_cart_all" data-type="order-items">
      <button class="place_order_custom_add_to_cart_all_btn" data-action="add-to-cart-all">
        Add To cart All
      </button>
      <div class="transaction-line-views-cell-actionable-alert-placeholders" data-type="alert-placeholder1"></div>
    </div>

  </div>

  {{#each itemData}}
  <div class="place_order_custom_row" data-type="order-item">
    <div class="place_order_custom_img col-sm-2">
      <a>
        <img src="{{resizeImage this.items.url 'thumbnail'}}" alt="{{thumbnail.altimagetext}}">
      </a>
    </div>

    <div class="place_order_custom_col1">
      <div class="place_order_custom_section">
        <div class="place_order_custom_item_name">
          <a href="#" class="place_order_custom_item_name_a">
            {{this.items.displayname}}
          </a>
        </div>

        <div class="place_order_custom_item-price">
          <span class="place_order_custom_item_price_lead" itemprop="price" data-rate="">
            ItemId - {{this.items.internalid}}
          </span>
        </div>
        <div class="place_order_custom_item-price">
          <span class="place_order_custom_item_price_lead" itemprop="price" data-rate="">
            ${{this.items.price}}
          </span>
        </div>

        <div class="place_order_custom_item-sku-container">

          {{#if this.items.color_label}}
          <div class="place_order_custom_item-grid">
          <span class="place_order_custom_item-sku-label">
            color :  <span class="placeorder-custom-selected-option-color-tile">
            <span
              class="placeorder-custom-selected-option-color-tile-color " title="{{this.items.color_label}}"
              style="background:{{this.items.color_label}}">
            </span>
          </span>
          </span>
          <span class="place_order_custom_item-col-label" itemprop="sku">
            {{this.items.color_label}}
          </span>
            </div>
          {{/if}}
            
          {{#if this.items.size_label}}
              <span class="place_order_custom_item-sku-label">
            size :
          </span>
          <span class="place_order_custom_item-size-label" data-line-size={{this.items.size_label}}>
            {{this.items.size_label}}
          </span>
          {{/if}}
        </div>
        <div class="place_order_custom_item_quantity-container">
          <span class="place_order_custom_item_quantity-label">Quantity:</span>
          <input type="number" class="place_order_custom_item_quantity" name="item_quantity" value={{this.items.quantity}}
            readonly>
        </div>

      </div>

    </div>

    <div class="place_order_custom_col2">

      <div class="place_order_custom_add-to-cart-button-container">
        <button data-item-id={{this.items.internalid}} data-line-id={{this.items.LineId}} data-parent-id="" data-item-options=""
          data-action="add-to-cart" class="place_order_custom-actions-add-to-cart">
          Add to Cart
        </button>
        <div class="transaction-line-views-cell-actionable-alert-placeholder" data-type="alert-placeholder"></div>

      </div>

    </div>

  </div>
  {{/each}}
  {{/if}}

  {{#if itemsNotFound}}
  <div class="placeorder-items-list-empty-section">

    {{#if noSearchDataFound}}
    <i class="list-header-view-search-by"></i>
      
    <h5>
      {{translate 'no search results found with'}}
      <span class="placeorder-items-search-not-found">"{{noSearchDataFound}}"</span>

      <i class="noitemfound"></i>
    </h5>

    <a class="placeroder-items-list-empty-button" href="/placeorder">{{translate 'Go Back'}}</a>
    {{/if}}
  </div>
  {{/if}}

  {{#if isLoading}}
  <p class="placeordercustom-items-list-empty">{{translate 'Loading...'}}</p>
  {{/if}}

  <div class="placeordercustom-items-list-paginator">
    <div class="palceOrdercustom-GlobalViewsPagination " data-view="GlobalViews.Pagination"></div>
    <div data-view="GlobalViews.ShowCurrentPage"></div>

  </div>
</div>