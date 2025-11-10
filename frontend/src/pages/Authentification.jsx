
import LoginCommon  from "../components/common/LoginCommon.jsx";
import SignupInCommon from "../components/common/SignupInCommon.jsx";
import React from 'react'
import { useState } from "react";

export default function Authentification() {
    const [authProvider, setAuthProvider] = useState(false);
    
  return (
    <div>
        {!authProvider ? (
            <LoginCommon onSwitch={() => setAuthProvider(true)} />
        ) : (
            <SignupInCommon onSwitch={() => setAuthProvider(false)} />
        )}
    </div>
           
  );
}
