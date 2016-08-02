define(function(){
	var React = require('react');
	var connect = require('react-redux').connect;

	var TabsSwitcher = (props) => {
			var active = props.active;
			var tabover = props.tabover;
			var showToolTip = function(e){
				console.log(e);
			};
			return (
				<div className='tabs-menu'>
					{props.items.map(function(item, index) {
						return (
							<div key={index}
							className={'tabs-menu-item ' + (active === index ? 'tab-menu-selected' : '')}
							onMouseOver={props.onTabOver.bind(null,index)}
							onMouseOut={props.onTabOut}
							onClick={props.onTabClick.bind(null,index)}> {item.title}
							{
								(tabover === index && active !== index)?
								<div className="popover fade right in popoverwrap">
	                                <div className="arrow"></div>
	                                <div className="popover-content">jj SM price in US Dollars per mol = <span>$1000</span></div>
	                            </div>
								:''
							}
							</div>

						);
					})}
					<div className="tabs-menu-item" style={{height:'50px',borderBottom:'none'}}>&nbsp;</div>
				</div>
			);
	};

	// function mapStateToProps(state) {
	// 	console.log(state);
	//     return {
	//         tabover: state.hover,
	//         active: state.clicked
	//     };
	// }
	return TabsSwitcher;
	//return connect(mapStateToProps)(TabsSwitcher);
});