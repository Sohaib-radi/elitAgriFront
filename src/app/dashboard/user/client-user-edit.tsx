'use client';

import type { IUserItem } from 'src/types/user';

import { useState, useEffect } from 'react';

import axios, { endpoints } from 'src/lib/axios';

import { UserEditView } from 'src/sections/user/view';

import { JWT_STORAGE_KEY } from 'src/auth/context/jwt/constant';

type Props = {
  userId: string;
};

export default function ClientUserEdit({ userId }: Props) {
  const [user, setUser] = useState<IUserItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(endpoints.users.getOne(userId), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // assuming your backend returns { user: {...} }
        console.log("User comming from backend")
        console.log(res.data )
        setUser(res.data || null);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found</p>;

  return <UserEditView user={user} />;
}
