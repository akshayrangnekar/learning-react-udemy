import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';
import _ from 'lodash';

const FIELDS = {
    title: {
        type: 'input',
        label: 'Title for post'
    },
    categories: {
        type: 'input',
        label: 'Categories'
    },
    content: {
        type: 'textarea',
        label: 'Post content'
    }
}

class PostNew extends Component {
    renderField(field) {
        const {meta: {touched, error}} = field
        const formClassName = `form-group ${ touched && error ? 'has-danger' : '' }`
        return (
            <div className={formClassName}>
                <label>{field.label}</label>
                <input className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    { touched && error }
                </div>
            </div>
        );
    }

    onSubmit(values) {
        console.log('Submit', values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
        // console.log(this.props);
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/">
                        Cancel
                    </Link>
                </div>
                <div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            name="title"
                            component={this.renderField}
                            label="Title"
                        />
                        <Field
                            name="categories"
                            component={this.renderField}
                            label="Categories"
                        />
                        <Field
                            name="content"
                            component={this.renderField}
                            label="Post content"
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <Link className="btn btn-danger" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        )
    }
}

function validate(values) {
    // console.log('validate', values);
    const errors = {};
    // if (!values.title || values.title.length < 3) {
    //     errors.title = "Enter a title that is at least 3 characters";
    // }
    //
    // if (!values.categories) {
    //     errors.categories = "Enter categories";
    // }
    //
    // if (!values.content) {
    //     errors.content = "Enter some content";
    // }
    _.each(FIELDS, (type, field) => {
        if (!values[field]) {
            errors[field] = `Enter a ${field}`;
        }
    });

    return errors;
}

export default reduxForm({
    form: 'PostNewForm',
    fields: _.keys(FIELDS),
    validate
})(
    connect(null, { createPost })(PostNew)
);
