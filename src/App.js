import logo from './logo.svg';
import './App.css';
import React from 'react'
import contacts from "./contacts.json"



let contactList = contacts

class App extends React.Component {

  state = {
    contactList: contacts
  }

  randomButton = () => {

   let randomContact = contacts[Math.floor(Math.random() * contacts.length)]

    this.setState(prevState => {
      return {
        contactList: prevState.contactList += randomContact
      }
    })
  }

  sortByName = () => {

    let sortedByName = contacts.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })
    this.setState(prevState => {
      return {
        contactList: prevState += sortedByName
      }
    })
  }

  sortByPopularity = () => {

    let sortedByPopularity = contacts.sort(function (a, b) {
      return parseFloat(b.popularity) - parseFloat(a.popularity);
    })

    this.setState(prevState => {
      return {
        contactList: prevState += sortedByPopularity
      }
    })
  }

  deleteContact = (contactId) => {
    this.setState(prevState => {
      return {
        contactList: prevState.contactList.filter(contact => contact.id !== contactId)
      }
    })
  }



  render() {
    return (
      <div className="contacts-container">

        <section className="buttons" />

        <button className="random-button"
          onClick={this.randomButton}> Add Random Contact </button>

        <button className="sort-name-button"
          onClick={this.sortByName}> Sort by Name </button>

        <button className="sort-pop-button"
          onClick={this.sortByPopularity}> Sort by Popularity </button>

        {
          contactList.map(contactObj => {
            return <Contacts key={contactObj.id} {...contactObj} methodToDeleteContact={() => { this.deleteContact(contactObj.id) }}/>
          })
        }
        <section/>
      </div>
    )
  }
}

class Contacts extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <section className="contacts">
        <h5> {this.props.name} </h5>
        <h5> {this.props.popularity} </h5>
        <img src={this.props.pictureUrl} alt={this.props.name} />
        <button className="delete-button"
          onClick={this.props.methodToDeleteContact}> Delete </button>
      </section>
    )
  }
}

export default App;
