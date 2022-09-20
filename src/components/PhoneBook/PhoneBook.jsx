import { useState, useEffect } from 'react';
import AddForm from '../AddForm/AddForm';
import Contacs from '../Contacts/Contacs';
import FilterContact from '../FilterContact/FilterContact';

import { TitleOne, Wrapper, WrapperContact } from './PhoneBook.styled.js';

export const PhoneBook = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts') || [])
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number, id }) => {
    const isSameContacs = contacts.filter(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.number === number
    ).length;
    if (isSameContacs) {
      alert(`${name} is already in contacts`);
    } else {
      setContacts(prevState => {
        return [...prevState, { name, number, id }];
      });
    }
  };

  const onChangeFilter = ({ currentTarget: { value } }) => setFilter(value);

  const getVisibleContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <>
      <TitleOne>Phonebook</TitleOne>
      <Wrapper>
        <AddForm onSubmit={handleSubmit} />
        <WrapperContact>
          <FilterContact onChangeFilter={onChangeFilter} filter={filter} />
          <Contacs contacts={getVisibleContact()} onDelete={deleteContact} />
        </WrapperContact>
      </Wrapper>
    </>
  );
};

export default PhoneBook;
