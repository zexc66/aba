import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthValue = {
  session: Session | null;
  user: User | null;
  ready: boolean;
  signIn: (email: string, redirectTo: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const Context = createContext<AuthValue | null>(null);

export function PlatformAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!supabase);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value: AuthValue = {
    session,
    user: session?.user ?? null,
    ready,
    signIn: async (email, redirectTo) => {
      if (!supabase) throw new Error("unconfigured");
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
    },
    signOut: async () => {
      if (!supabase) return;
      await supabase.auth.signOut();
    },
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function usePlatformAuth(): AuthValue {
  const value = useContext(Context);
  if (!value) throw new Error("usePlatformAuth requires PlatformAuthProvider");
  return value;
}
