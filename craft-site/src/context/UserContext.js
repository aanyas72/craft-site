"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true);

    // Extract user check logic to a function
    const refreshUser = async () => {
        setLoading(true);
        let { data: { user: refreshedUser } } = await supabase.auth.getUser();
        if (!refreshedUser) {
            await supabase.auth.refreshSession();
            ({ data: { user: refreshedUser } } = await supabase.auth.getUser());
        }
        setUser(refreshedUser);
        setLoading(false);
    };

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

    // Extract seller status check logic to a function
    const checkSellerStatus = async (userToCheck = user) => {
        if (!userToCheck) {
            setIsSeller(false);
            setIsSellerLoading(false);
            return;
        }
        // Check sessionStorage first
        const cachedStatus = sessionStorage.getItem(`seller_${userToCheck.id}`);
        if (cachedStatus !== null) {
            setIsSeller(cachedStatus === 'true');
            setIsSellerLoading(false);
            return;
        }
        // If not in sessionStorage, check database
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('is_seller')
                .eq('id', userToCheck.id)
                .single();
            if (profile && !error) {
                const sellerStatus = profile.is_seller;
                setIsSeller(sellerStatus);
                sessionStorage.setItem(`seller_${userToCheck.id}`, sellerStatus.toString());
            } else {
                setIsSeller(false);
                sessionStorage.setItem(`seller_${userToCheck.id}`, 'false');
            }
        } catch (error) {
            setIsSeller(false);
            sessionStorage.setItem(`seller_${userToCheck.id}`, 'false');
        }
        setIsSellerLoading(false);
    };

    // Expose a refresh function for seller status
    const refreshSellerStatus = async () => {
        setIsSellerLoading(true);
        // Clear cache so we always get fresh value
        if (user) sessionStorage.removeItem(`seller_${user.id}`);
        await checkSellerStatus(user);
    };

    useEffect(() => {
        let isMounted = true;
        setIsSellerLoading(true);
        checkSellerStatus(user);
        return () => { isMounted = false; };
    }, [user]);

    return (
        <UserContext.Provider value={{ user, loading, isSeller, isSellerLoading, refreshSellerStatus, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}