import { useState } from 'react';
import {
  FormPhoneBook,
  InputPhoneBook,
  LabelPhoneBook,
  Button,
} from './AddForm.styled.js';
import Icon from './../../Assets/img/plus.svg';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const AddForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const onHandleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number, id: nanoid() });
    setName('');
    setNumber('');
  };

  return (
    <FormPhoneBook onSubmit={onHandleSubmit}>
      <LabelPhoneBook>
        Contact name
        <InputPhoneBook
          type="text"
          name="name"
          placeholder="Name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </LabelPhoneBook>
      <LabelPhoneBook>
        Phone number
        <InputPhoneBook
          type="tel"
          name="number"
          placeholder="Number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </LabelPhoneBook>
      <Button type="submit">
        <img src={Icon} alt="Plus" />
      </Button>
    </FormPhoneBook>
  );
};

export default AddForm;

AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
