import './App.css';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

function App() {
  //Date and Time related state
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState(new Date());
  const [eventDescription, setEventDescription] = useState(new Date());

  const session = useSession(); // when a session exists, we have a user
  const supabase = useSupabaseClient(); // links up to supabase

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    })
    if (error) {
      console.log(error);
      alert("There was an error logging into Google provider with Supabase")
    }
  }
  async function googleSignOut() {
    await supabase.auth.signOut()
  }

  async function createCalEvent() {

    const event = {
      "summary": eventName,
      "description": eventDescription,
      "start": {
        "dateTime": start.toISOString(),
        "timeZone": Intl.DateTimeFormat().timeZone
      },
      "end": {
        "dateTime": start.toISOString(),
        "timeZone": Intl.DateTimeFormat().timeZone
      }
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        "Authorization": "Bearer" + session.provider_token //Access token for google
      },
      body: JSON.stringify(event)
    }).then(data => {
      return data.json();
    }).then(data => {
      console.log(data)
      alert("Event created, check your Google Calendar")
    })
  }

  return (
    <div>
      <div style={{ width: "400px", margin: "30px auto" }}>
        {
          session ?
            <>
              <h2>Hi there {session.user.email}</h2>
              <p>Start your event</p>
              <DateTimePicker onChange={setStart} value={start} />
              <p>End of your event</p>
              <DateTimePicker onChange={setEnd} value={end} />
              <p>Event Name</p>
              <input type="text" onChange={(e) => setEventName(e.target.value)} />
              <p>Event Description</p>
              <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
              <hr />
              <button onClick={() => createCalEvent}>Create Calendar Event</button>
              <button onClick={() => googleSignOut()}>Sign In With Google</button>
            </> :
            <>
              <button onClick={() => googleSignIn()}>Sign Out</button>
            </>
        }
      </div>
    </div>
  );
}

export default App;
