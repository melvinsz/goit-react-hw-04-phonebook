import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Input from 'components/Input/Input';
import Notification from 'components/Notification/Notification';

class Contacts extends Component {
  state = {
    filtered: '',
  };

  handleInputChange = e => {
    this.setState({ filtered: e.target.value });
  };

  render() {
    const { filtered } = this.state;
    const { contacts, onClickDelete } = this.props;
    const filteredContacts = contacts.filter(contact =>
      contact.name.includes(filtered)
    );

    return (
      <div>
        <Input
          label="Find contacts by name"
          value={filtered}
          onChange={this.handleInputChange}
          type="text"
          name="filter"
        />

        {!filteredContacts.length ? (
          <Notification message="Contact list is empty." />
        ) : (
          <ul>
            {filteredContacts.map(({ id, name, number }) => (
              <li key={id}>
                <span>{name}</span>
                <span>{number}</span>
                <button type="button" onClick={() => onClickDelete(id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Contacts;
