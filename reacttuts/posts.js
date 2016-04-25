const LatestPostsComponent = props => {
    const postPreviews = renderPostPreviews(props.posts);

    return (
        <section>
      <div><h1>Latest posts</h1></div>
      <div>
        { postPreviews }
      </div>
    </section>
    );
};

const renderPostPreviews = posts => (
    posts.map(post => renderPostPreview(post))
);

const renderPostPreview = post => (
    <article>
    <h3><a href={'/post/${post.slug}'}>{post.title}</a></h3>
    <time pubdate><em>{post.posted}</em></time>
    <div>
      <span>{post.blurb}</span>
      <a href={'/post/${post.slug}'}>Read more...</a>
    </div>
  </article>
);


var MessageView = p => <div>{p.message}</div>;

var RandomMessage = React.createClass({
    getInitialState: function() {
        var messages = {
            messages: [
                {slug:'earth1', posted:'somedate1', title:'This is title1', blurb:'this is a blurb1'},
                {slug:'earth2', posted:'somedate2', title:'This is title2', blurb:'this is a blurb2'},
                {slug:'earth3', posted:'somedate3', title:'This is title3', blurb:'this is a blurb3'}
            ]
        };

        return messages;
    },
    render: function() {
        return (
             <LatestPostsComponent posts={this.state.messages} />
        );
    }
});



ReactDOM.render(
    <RandomMessage />,
    document.getElementById('container')
);
