define(function(require){
	var React = require('react');
	var NumberOfStepsView = require('es6!./number-of-steps');
	var ReactionRules = require('es6!./reaction-rules');
	var MaxPrice = require('es6!./max-price');
	var TabsSwitcher = require('es6!./tab-switcher');
	var bindActionCreators = require('redux').bindActionCreators;
	var connect = require('react-redux').connect;

	// Actions
	var handleTabOver = function(index) {
		return {
			type: 'MOUSE_OVER_TAB',
			payload: index
		};
	};
	var handleTabOut = function() {
		return {
			type: 'MOUSE_OUT_TAB',
			payload: -1
		};
	};
	var handleTabClick = function(index) {
		return {
			type: 'MOUSE_CLICK_TAB',
			payload: index
		};
	}

	var SynthesisSearchOpsContainer = React.createClass({
		render: function() {
			var tabs =  [
				{title: 'Number of steps:', content: NumberOfStepsView},
				{title: 'Triggered reaction rules:', content: ReactionRules },
				{title: 'Maximum price in USD/mol:', content: MaxPrice }
			];
			var TabsContent = tabs[this.props.active].content;
			console.log(this.props);
			return(
				 <div className="synthesis-search-opts-container">
				 	<div className="table-container">
				 		<div className="table-row">
							<TabsSwitcher items={tabs}
								active={this.props.active}
								tabover={this.props.tabover}
								onTabOver={this.props.handleTabOver}
								onTabOut={this.props.handleTabOut}
								onTabClick={this.props.handleTabClick} />
							<div className='tabs-panels tabs-panel_selected'>
								<TabsContent />
							</div>
						</div>
					</div>

				</div>
			);
		}
	});

	function mapStateToProps(state) {
	    return {
	        tabover: state.syntOption.tabover,
	        active: state.syntOption.active
	    };
	}
	function matchDispatchToProps(dispatch){
	    return bindActionCreators({
	    	handleTabOver: handleTabOver,
	    	handleTabOut: handleTabOut,
	    	handleTabClick: handleTabClick
	    }, dispatch);
	}
	return connect(mapStateToProps, matchDispatchToProps)(SynthesisSearchOpsContainer);
});
