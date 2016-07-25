var BondBreakingConstraintsView = () => {
	var imgStyle = {width: '528px',height: '290px'};
	return(
		<div>
			<h3 className="heading">Bond breaking constraints</h3>
			<div>Choose the type of bond breaking constraint, then click individual bonds to apply.</div>
			<div>Learn more about bond breaking constraints.</div>
			<div><img src="mol.png" style={imgStyle} /></div>
			<div>
				<button>Protect (Do not break)</button>
				<button>Target (break first)</button>
				<button>Clear all constraints</button>
			</div>
		</div>
	);
}