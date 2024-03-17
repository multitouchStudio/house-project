
$(document).ready(function(){

    //Currency Global Variables

    let 
        moneySpanSelector = 'span.money',
        currencyPickerSelector = '[name=currencies]';

    let currencyPicker = {
        loadCurrency: function(){
            /* Fix for customer account pages */
            jQuery('span.money span.money').each(function() {
                jQuery(this).parents('span.money').removeClass('money');
            });
                /* Saving the current price */
            jQuery('span.money').each(function() {
                jQuery(this).attr('data-currency-{{ shop.currency }}', jQuery(this).html());
            });

                // If there's no cookie.
            if (cookieCurrency == null) {
            if (shopCurrency !== defaultCurrency) {
                Currency.convertAll(shopCurrency, defaultCurrency);
            }
            else {
                Currency.currentCurrency = defaultCurrency;
            }
            }
            // If the cookie value does not correspond to any value in the currency dropdown.
            else if (jQuery('[name=currencies]').length && jQuery('[name=currencies] option[value=' + cookieCurrency + ']').length === 0) {
            Currency.currentCurrency = shopCurrency;
            Currency.cookie.write(shopCurrency);
            }
            else if (cookieCurrency === shopCurrency) {
            Currency.currentCurrency = shopCurrency;
            }
            else {
            Currency.convertAll(shopCurrency, cookieCurrency);
            }
        },
        onCurrencyChanged: function(){}
    }



jQuery('[name=currencies]').val(Currency.currentCurrency).change(function() {
    var newCurrency = jQuery(this).val();
    Currency.convertAll(Currency.currentCurrency, newCurrency);
    jQuery('.selected-currency').text(Currency.currentCurrency);
});

var original_selectCallback = window.selectCallback;
var selectCallback = function(variant, selector) {
original_selectCallback(variant, selector);
Currency.convertAll(shopCurrency, jQuery('[name=currencies]').val());
jQuery('.selected-currency').text(Currency.currentCurrency);
};

$('body').on('ajaxCart.afterCartLoad', function(cart) {
Currency.convertAll(shopCurrency, jQuery('[name=currencies]').val());
jQuery('.selected-currency').text(Currency.currentCurrency);  
});
jQuery('.selected-currency').text(Currency.currentCurrency);
})
