import './App.css';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

function App() {
  const session = useSession(); // tokens, when a session exists, we have a user
  const supabase = useSupabaseClient(); // links up to supabase

  return (
    <div className="App">

    </div>
  );
}

export default App;
