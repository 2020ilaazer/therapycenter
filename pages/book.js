import React, { Component } from 'react';
import { withRouter } from 'next/router';
import moment from 'moment';
import base, { firebaseApp } from '../lib/base';
import Item from '../components/Item';
import sourceData from '../data';
import Calendar from '../components/booking/Calendar';

const Massage = withRouter(props => {
  const massageId = props.router.query.title;
  const currentMassage = sourceData.massages.find(
    massage => massage.id == massageId
  );
  return <Item service={currentMassage} key={currentMassage.id} />;
});

const Booking = withRouter(props => {
  let book = new Book();
  return (
    <div className="column is-8">
      <Calendar
        view={props.router.query.view}
        massageId={props.router.query.title}
        updateBooking={book.updateBooking}
      />
    </div>
  );
});

class Book extends Component {
  state = {
    loading: false,
    bookings: {}
  };

  componentDidMount() {
    console.log('🔥 Booking Mounted');
    this.setState({ loading: true });
    this.ref = base.syncState(`bookings`, {
      context: this,
      state: 'bookings',
      then: () => {
        console.log('✔🔄 Just synced with firebase');
        this.setState({ loading: false });
      }
    });
  }

  /**
   * @integer date: unix timestamp
   * @integer startFrom: a number between 9 to 18
   */
  updateBooking = (date, startFrom, updatedBooking) => {
    console.log('going to update the state');
    return new Promise((resolve, reject) => {
      const dateTimeStamp = moment.unix(date).format('YYYYMMDD');

      // This part should work with setState and re-base should take care of it. It doesn't work for now
      // let bookings = { ...this.state.bookings};
      // bookings[dateTimeStamp] = bookings[dateTimeStamp] || [];
      // bookings[dateTimeStamp][startFrom] = bookings[dateTimeStamp][startFrom] || {};
      // bookings[dateTimeStamp][startFrom] = updatedBooking;
      // this.setState({bookings});

      firebaseApp
        .database()
        .ref(`bookings/${dateTimeStamp}/${startFrom}`)
        .set(updatedBooking)
        .then(() => {
          resolve();
        });
    });
  };

  componentWillUnmount() {
    console.log('📤 App Unmounting');
    base.removeBinding(this.ref);
  }

  render() {
    return (
      <div className="container is-fluid">
        <div className="columns is-multiline">
          <Massage />
          <Booking />
        </div>
      </div>
    );
  }
}

export default Book;
