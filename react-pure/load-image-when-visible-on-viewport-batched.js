// Product list item image
var ProductImage = React.createClass({
    getDefaultProps: function() {
        return {
            loader: 'loader.gif',
            showImage: false
        };
    },

    componentDidUpdate: function(prevProps) {
        if (!this.props.showImages && prevProps.viewport) {
            this.updatePosition();
        }
    },

    updatePosition: function() {
        var el = ReactDOM.findDOMNode(this);
        this.props.updateImagePosition(el.offsetTop, el.offsetHeight);
    },

    render: function() {
        debugger;
        return (
            <div>
               { this.props.showImage ? (
                    this.props.data.map(function(item, value){
                        return <img key={value} src={item.image} />;
                    })
                ) : (<div>Loader</div>)
               }
            </div>
        );
    }
});

// Product list item
var Product = React.createClass({
    getInitialState: function() {
        return {
            showImage: false
        };
    },

    getDefaultProps: function() {
        return {
            showImage: false
        };
    },

    componentWillMount: function() {
        // allow image display override
        if (this.props.showImage) {
            setShowImage(true);
        }
    },

    updateImagePosition: function(currentElementTop, currentElementHeight) {
        // image is already displayed, no need to check anything
        if (this.state.showImage) {
            return;
        }

        // update showImage state if component element is in the viewport
        var scrolledHeight = this.props.viewport.top;
        var totalDisplayHeight = this.props.viewport.top + this.props.viewport.height;
        console.log(this.props.viewport);

        if ((scrolledHeight <= (currentElementTop + currentElementHeight) && currentElementTop <= (totalDisplayHeight - 300))) {
            this.setShowImage(true);
        }
    },

    setShowImage: function(show) {
        this.setState({
            showImage: !!(show)
        });
    },

    render: function() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div>
                    <ProductImage data={this.props.data} viewport={this.props.viewport} showImage={this.state.showImage}
                        updateImagePosition={this.updateImagePosition} />
                </div>
            </div>
        );
    }
});

// Product list
var ProductList = React.createClass({
    getInitialState: function() {
        return {
            viewport: {
                top: 0,
                height: 0
            }
        };
    },

    componentDidMount: function() {
        window.addEventListener('scroll', this.updateViewport, false);
        window.addEventListener('resize', this.updateViewport, false);
        this.updateViewport();
    },

    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.updateViewport);
        window.removeEventListener('resize', this.updateViewport);
    },

    updateViewport: function() {
        // TODO: debounce this call
        this.setState({
            viewport: {
                top: window.pageYOffset,
                height: window.innerHeight
            }
        });
    },

    render: function() {
        var self = this;
        debugger;
        var itemViews = this.props.items.map(function(item, index) {
            return <Product key={index} data={item} viewport={self.state.viewport} />
        });

        return (
            <div>
                <h1>Items</h1>
                {itemViews}
            </div>
        );
    }
});

var items = [
    [{ image: 'http://placekitten.com/311/313' }, { image: 'http://placekitten.com/311/313' }],
    [{ image: 'http://placekitten.com/302/302' }, { image: 'http://placekitten.com/302/302' }],
    [{ image: 'http://placekitten.com/303/303' }, { image: 'http://placekitten.com/303/303' }],
    [{ image: 'http://placekitten.com/304/304' }, { image: 'http://placekitten.com/304/304' }],
    [{ image: 'http://placekitten.com/305/305' }, { image: 'http://placekitten.com/305/305' }],
    [{ image: 'http://placekitten.com/306/306' }, { image: 'http://placekitten.com/306/306' }],
    [{ image: 'http://placekitten.com/307/307' }, { image: 'http://placekitten.com/307/307' }],
    [{ image: 'http://placekitten.com/308/308' }, { image: 'http://placekitten.com/308/308' }],
    [{ image: 'http://placekitten.com/310/310' }, { image: 'http://placekitten.com/310/310' }],
    [{ image: 'http://placekitten.com/311/311' }, { image: 'http://placekitten.com/311/311' }]
];

var el = document.querySelector('#example');
ReactDOM.render(<ProductList items={items} />, el);