$(document).ready(function(){

    //currency global variables
   let 
        moneySpanSelector = 'span.money',
        currencyPickerSelector = '[name=currencies]',
        activeCurrencySelector = '.js-active-currency',
        currencyNoteSelector = '.js-cart-currency-note';


    let currencyPicker = {
        loadCurrency: function(){
            /* Fix for customer account pages */
            $(moneySpanSelector + ' ' + moneySpanSelector).each(function () {
                $(this).parents(moneySpanSelector).removeClass('money');
            });

            /* Saving the current price */
            $(moneySpanSelector).each(function () {
                $(this).attr('data-currency-', + shopCurrency, $(this).html());
            });


            // If there's no cookie.
            if (cookieCurrency == null) {
                if (shopCurrency !== defaultCurrency) {
                    Currency.convertAll(shopCurrency, defaultCurrency);
                } else {
                    Currency.currentCurrency = defaultCurrency;
                }
            }
            // If the cookie value does not correspond to any value in the currency dropdown.
            else if ($(currencyPickerSelector).length && $(currencyPickerSelector + ' option[value=' + cookieCurrency + ']').length === 0) {
                Currency.currentCurrency = shopCurrency;
                Currency.cookie.write(shopCurrency);
            } else if (cookieCurrency === shopCurrency) {
                Currency.currentCurrency = shopCurrency;
            } else {
                $(currencyPickerSelector).val(cookieCurrency);
                Currency.convertAll(shopCurrency, cookieCurrency);
            }

            currencyPicker.setCurrencyText();
        },
        onCurrencyChanged: function(event){
            let 
                newCurrency = jQuery(this).val(),
                $otherPickers = $(currencyPickerSelector).not($(this));

            Currency.convertAll(Currency.currentCurrency, newCurrency);
            currencyPicker.setCurrencyText(newCurrency);
           
            if($otherPickers.length > 0 ){
                $otherPickers.val(newCurrency)
            }
        },
        setCurrencyText: function(newCurrency = Currency.currentCurrency) {
            let 
                $activeCurrency = $(activeCurrencySelector),
                $currencyNote = $(currencyNoteSelector);

                if($activeCurrency.length > 0) {
                    $activeCurrency.text(newCurrency);
                }

                if($currencyNote.length > 0) {
                    if(newCurrency !== shopCurrency) {
                        $currencyNote.show();
                    }else {
                        $currencyNote.hide();
                    }

                }
        },
        onMoneySpanAdded: function () {
               Currency.convertAll(shopCurrency, Currency.currentCurrency);
               currencyPicker.setCurrencyText();
           },
        init: function() {
            if (showMultipleCurrencies !== true){
                return false;
        }
            currencyPicker.loadCurrency();
            $(document).on('change', currencyPickerSelector, currencyPicker.onCurrencyChanged);
       
        }
    }    
    currencyPicker.init();

    //Add to cart form
   let
    addToCartFormSelector = '#add-to-cart-form',
    productOptionSelector = addToCartFormSelector + ' [name*=option]';

    let productForm = {
    onProductOptionChanged: function(event) {
      let
        $form = $(this).closest(addToCartFormSelector),
        selectedVariant = productForm.getActiveVariant($form);
        },
         getActiveVariant: function($form) {
      let
        variants = JSON.parse(decodeURIComponent($form.attr('data-variants'))),
        formData = $form.serializeArray()
                console.log("variants log ->" + variants)
                // console.log(formData)
        },
        validate: function(){

        },
        init: function(){
            $(document).on('change', productOptionSelector, productForm.onProductOptionChanged)
        }
    }

    productForm.init()

})

