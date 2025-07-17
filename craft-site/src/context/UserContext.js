"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const checkUser = async () => {
            let { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                await supabase.auth.refreshSession();
                ({ data: { user } } = await supabase.auth.getUser());
            }
            if (isMounted) {
                setUser(user);
                setLoading(false);
            }
        };
       checkUser();
       return () => { isMounted = false; };
     }, []);

     return (
       <UserContext.Provider value={{ user, loading }}>
         {children}
       </UserContext.Provider>
     );
   }

   export function useUser() {
     return useContext(UserContext);
   }