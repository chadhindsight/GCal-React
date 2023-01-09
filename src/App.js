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
      alert("There was an error logging into Google provider with Supabase")
    }
  }

  return (
    <div className="App">

    </div>
  );
}

export default App;
