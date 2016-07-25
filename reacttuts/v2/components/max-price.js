define(function(require) {
    'use strict';
    var React = require('react');
    var MaxPrice = function(props) {
        var onChange = function(event) {
            var changedMaxPrice = +event.target.value;
            props.eventDispatcher.trigger('request:setConstraintAttrs', {maxPrice: changedMaxPrice});
        };

        return (
            <div>
                <div className='synpMaxPriceSection_title'>Maximum price per mol of starting material</div>

                <p className='synpMaxPriceSection_instructions'>
                    A starting material will be considered a termination point for the search along a branch of the retrosynthetic tree, unless its cost is greater than the value below.
                </p>

                <p className='synpMaxPriceSection_instructions'>
                    The price per molecule stipulated is in United States Dollars per mol and is subject to change without warning by the respective starting material suppliers.
                </p>

                <div className='synpMaxPriceSection_inputSection'>
                    <label htmlFor='maxPrice'>$ </label>
                    <input
                        type='text'
                        id='maxPrice'
                        className='synpMaxPriceSection_input'
                        name='maxPrice'
                        onChange={onChange}
                        value={props.constraintAttrs.maxPrice} />
                    {
                        props.error ?
                            <div className='error'>
                                <div className='popover fade right in'>
                                    <div className='arrow'></div>
                                    <div className='popover-content'>You have entered an incorrect value.Please enter a positive value to a maximum of two decimal points </div>
                                </div>
                            </div>
                        : ''
                    }
                </div>
            </div>

        );
    };
    MaxPrice.propTypes = {
        constraintAttrs: React.PropTypes.shape({maxPrice: React.PropTypes.number.isRequired}),
        eventDispatcher: React.PropTypes.shape({trigger: React.PropTypes.func.isRequired})
    };

    return MaxPrice;
});
