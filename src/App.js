import './App.css';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

function App() {
  const session = useSession(); // tokens, when a session exists, we have a user
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

  console.log(session)

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "30px auto" }}>
        {
          session ?
            <>
              <h2>Hi there {session.user.email}</h2>
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
