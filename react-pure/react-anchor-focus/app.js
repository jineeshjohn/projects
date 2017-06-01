define(function(require) {

    var React = require('react');

    var GalleryItem = React.createClass({
        componentDidMount: function() {
            if (this.props.selectedIndex === this.props.val) {
                this.selectedItem && this.selectedItem.focus();
                console.log(this.selectedItem);
            }
        },
        render: function(){
            return (
                <div className='box'>
                    <a href="#" ref={function(el){
                        this.selectedItem = el;
                    }.bind(this)} >JJ : {this.props.val}</a>
                </div>
            )
        }
    });
    var GalleryList = function(){
        var selectedIndex = 13;
        var list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
        var listItems = list.map(function(index, val){
            return <GalleryItem key={index} val={val} selectedIndex={selectedIndex} />
        });
        return (
            <div>{listItems}</div>
        );
    };

    var App = function() {
        return (
            <div>
                <GalleryList />
            </div>
        );
    }

    return App;
});
