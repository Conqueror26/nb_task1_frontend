import React, { Component, Fragment } from "react";
import "./Event.css";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import EventList from "../components/Events/EventList/EventList";
class EventPage extends Component {
  state = {
    creating: false,
    events: [],
    isLoading: false,
    selectedEvent: null,
  };

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.timeElRef = React.createRef();
    this.guestElRef = React.createRef();
    this.agendaElRef = React.createRef();
  }
  componentDidMount() {
    this.fetchEvents();
  }
  static contextType = AuthContext;

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };
  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const time = this.timeElRef.current.value;
    const guest = this.guestElRef.current.value;
    const agenda = this.agendaElRef.current.value;

    const event = { title, time, guest, agenda };
    console.log(event);

    const requestBody = {
      query: `
        mutation{
          createEvent(eventInput:{title:"${title}",agenda:"${agenda}",time:"${time}",guest:"${guest}"}){
            _id
            title
            agenda
            time
            guest
            creator{
              _id
              email
            }
          }
        }
        `,
    };

    // const email = this.context.email;
    fetch("https://nbbackend.onrender.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        this.fetchEvents();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  modalCancelHandler = () => {
    this.setState({ creating: false, selectedEvent: null });
  };

  fetchEvents() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
        query{
          events{
            _id
            title
            agenda
            time
            guest
           
           
           
          }
        }
        `,
    };

    // const email = this.context.email;
    fetch("https://nbbackend.onrender.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        const events = resData.data.events;
        this.setState({ events: events, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  showDetailHandler = (eventId) => {
    this.setState((prevState) => {
      const selectedEvent = prevState.events.find((e) => e._id === eventId);
      return { selectedEvent: selectedEvent };
    });
  };

  render() {
    return (
      <>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add Appointment"
            canCancel
            canConfirm
            onCancel={this.modalCancelHandler}
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div className="form-control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef} />
              </div>

              <div className="form-control">
                <label htmlFor="time">Date and Time</label>
                <input type="text" id="time" ref={this.timeElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="guest">Guest</label>
                <input type="text" id="guest" ref={this.guestElRef} />
              </div>
              <div className="form-control">
                <label htmlFor="agenda">Agenda</label>
                <textarea id="agenda" rows="4" ref={this.agendaElRef} />
              </div>
            </form>
          </Modal>
        )}
        {this.selectedEvent && (
          <Modal
            title={this.state.selectedEvent.title}
            canCancel
            onCancel={this.modalCancelHandler}
          >
            <h1>{this.state.selectedEvent.title}</h1>
            <h1>{this.state.selectedEvent.agenda}</h1>
            <h1>{this.state.selectedEvent.time}</h1>
            <h1>{this.state.selectedEvent.guest}</h1>
          </Modal>
        )}
        {this.context.email && (
          <div className="events-control">
            <p>Create your own Appointment</p>
            <button className="btn" onClick={this.startCreateEventHandler}>
              Create Appointment
            </button>
          </div>
        )}
        {/* {this.state.isLoading ? (
          <p>Loading..</p>
        ) : (
          <EventList
            events={this.state.events}
            // onViewDetail={this.showDetailHandler}
          />
          
        )} */}
        {this.context.email && <p className="tit"> Appointments</p>}

        {this.context.email && (
          <EventList
            events={this.state.events}
            // onViewDetail={this.showDetailHandler}
          />
        )}
      </>
    );
  }
}
export default EventPage;
