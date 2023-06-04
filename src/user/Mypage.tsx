import { Button } from '@chakra-ui/react';
import { User, signOut, onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { auth } from '../FirebaseConfig';

type UserType = User | null;

export const Mypage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>(null);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  console.log(user);

  return (
    <div>
      {!loading && (
    <div>
      <h1>マイページ</h1>
      {user ? (
        <div>
          <Button colorScheme="teal" type="submit" onClick={logout}>
            ログアウト
          </Button>
        </div>
      ) : (
        <>未ログイン</>
      )}
    </div>
    )}
    </div>
  );
};
