import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {post} = this.props;

        if (!post) {
            return (
                <div>Loading...</div>
            )
        }
        return (
            <div>
                <div className="text-xs-left">
                    <Link className="btn btn-primary" to="/">
                        Back to list
                    </Link>
                </div>
                <div>
                    <h3>{post.title}</h3>
                    <h6>Categories: {post.categories}</h6>
                    <p>{post.content}</p>
                </div>
                <div>
                    <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>
                        Delete Post
                    </button>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {
    const r = { post: posts[ownProps.match.params.id] };
    console.log('postsShow:mapStateToProps', r);
    return r;
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
