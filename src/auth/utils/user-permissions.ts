import type { IUserItem } from 'src/types/user';

import type { UserType } from '../types';

export function canEditUserField(
  field: string,
  currentUser: IUserItem | undefined,
  authUser: UserType | null | undefined
): boolean {
  const isAdmin = authUser?.is_admin;
  const isSelf = currentUser?.id === authUser?.id;

  switch (field) {
    case 'is_admin':
    case 'farm':
    case 'isVerified':
      return !!isAdmin;

    case 'delete':
      return !!isAdmin && !isSelf;
    case 'changeFarm':
        return !!isAdmin && !isSelf;
    case 'Role':
        return !!isAdmin && !isSelf;
    // 👇 If needed in future
    case 'email':
    case 'phoneNumber':
      return isAdmin || isSelf;

    default:
      return true;
  }
}
