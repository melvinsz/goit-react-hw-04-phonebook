import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import Form from './Form/Form';
import Contacts from './Contacts/Contacts';
import Section from './Section/Section';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const onGetDataForm = data => {
    const hasName = contacts.some(contact => contact.name === data.name);
    if (hasName) {
      Notiflix.warning(`Contact "${data.name}" is already exist.`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, { ...data, id: nanoid() }]);
  };

  const deleteItem = deletedId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== deletedId)
    );
  };

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(storedContacts);
    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <Section title="Phonebook">
        <Form onSubmit={onGetDataForm} />
      </Section>
      <Section title="Contacts">
        <Contacts contacts={contacts} onClickDelete={deleteItem} />
      </Section>
    </div>
  );
};

// class App extends Component {
//   state = {
//     contacts: [],
//   };
//   onGetDataForm = data => {
//     const hasName = this.state.contacts.some(
//       contact => contact.name === data.name
//     );
//     if (hasName) {
//       Notiflix.warning(`Contact "${data.name}" is already exist.`);
//       return;
//     }

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, { ...data, id: nanoid() }],
//     }));
//   };

//   deleteItem = deletedId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(({ id }) => id !== deletedId),
//     }));
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parseContacts = JSON.parse(contacts);
//     if (parseContacts) {
//       this.setState({ contacts: parseContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     const { contacts } = this.state;
//     return (
//       <div>
//         <Section title="Phonebook">
//           <Form onSubmit={this.onGetDataForm} />
//         </Section>
//         <Section title="Contacts">
//           <Contacts contacts={contacts} onClickDelete={this.deleteItem} />
//         </Section>
//       </div>
//     );
//   }
// }

export default App;
