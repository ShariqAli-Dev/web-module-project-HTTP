import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const initialFormValues = {
  title: '',
  director: '',
  genre: '',
  metascore: NaN,
  description: '',
};

const AddMovieForm = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { addMovie } = props;
  const { push } = useHistory();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addMovie(formValues);
    push('/movies');
  };

  return (
    <div className='col'>
      <div className='modal-content'>
        <form onSubmit={onSubmit}>
          <div className='modal-header'>
            <h4 className='modal-title'>Adding A New Movie</h4>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Title</label>
              <input
                required
                value={formValues.title}
                onChange={onChange}
                name='title'
                type='text'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Director</label>
              <input
                required
                value={formValues.director}
                onChange={onChange}
                name='director'
                type='text'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Genre</label>
              <input
                required
                value={formValues.genre}
                onChange={onChange}
                name='genre'
                type='text'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Metascore</label>
              <input
                required
                value={formValues.metascore}
                onChange={onChange}
                name='metascore'
                type='number'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <textarea
                required
                value={formValues.description}
                onChange={onChange}
                name='description'
                className='form-control'
              ></textarea>
            </div>
          </div>
          <div className='modal-footer'>
            <input type='submit' className='btn btn-info' value='Save' />
            <Link to={`/movies`}>
              <input type='button' className='btn btn-default' value='Cancel' />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;
