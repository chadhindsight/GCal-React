import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createClient } from '@supabase/supabase-js';
import reportWebVitals from './reportWebVitals';
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient("https://mwdfdqtjinavxvejcqun.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13ZGZkcXRqaW5hdnh2ZWpjcXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyOTEyNzksImV4cCI6MTk4ODg2NzI3OX0.t2zfIa2u-x313P4qL_zR_30fFLxF7yStMF3zqxMQ74o"
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);

reportWebVitals();
