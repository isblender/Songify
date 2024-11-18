import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the AuthContext type
interface AuthContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  loading: boolean; // Loading state to indicate if we are checking for stored credentials
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that wraps your app and provides the AuthContext
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true

  // Load userId from AsyncStorage when the app launches
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Failed to load userId from AsyncStorage:", error);
      } finally {
        setLoading(false); // Set loading to false once we are done
      }
    };

    loadUserId();
  }, []);

  // Function to update the userId and save it to AsyncStorage
  const updateUserId = async (id: string | null) => {
    try {
      if (id) {
        await AsyncStorage.setItem('userId', id);
      } else {
        await AsyncStorage.removeItem('userId');
      }
      setUserId(id);
    } catch (error) {
      console.error("Failed to save userId to AsyncStorage:", error);
    }
  };

  // Provide the userId, setUserId function, and loading state to the context
  return (
    <AuthContext.Provider value={{ userId, setUserId: updateUserId, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;