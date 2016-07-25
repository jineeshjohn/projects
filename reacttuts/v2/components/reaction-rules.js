define(function(require) {
    'use strict';
    var React = require('react');
    var Rules = function(props) {
        return (
            <div>
                <div className="synpRulesSection_title">Reaction rules used in this search</div>

                <p className="synpRulesSection_instructions">
                    Rules are triggered according to the number of literature examples supporting them. Common
                    rules include reaction types that are frequently used in the lab, they are considered both
                    robust and versatile and are supported by many literature examples.
                </p>
                <p className="synpRulesSection_instructions">
                    Uncommon or Rare rules are supported by fewer examples, but may potentially expose more novel
                    synthetic approaches.
                </p>
                <p className="synpRulesSection_instructions">
                    The Uncommon set also includes the Common rules, and the Rare set includes both the Uncommon and
                    the Common rules.
                </p>

                <div className="synpRulesSection_inputSection">
                    <select className="synpRulesSection_input">
                        <option value="50">Common</option>
                        <option value="25">Uncommon</option>
                        <option value="5">Rare</option>
                    </select>
                </div>
            </div>
        );
    };
    return Rules;
});
