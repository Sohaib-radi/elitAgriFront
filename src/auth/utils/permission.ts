export function hasPermission(code: string, permissions: string[]) {
    return permissions.includes(code);
  }
  
  export function hasAnyPermission(codes: string[], permissions: string[]) {
    return codes.some((code) => permissions.includes(code));
  }
  
  export function hasAllPermissions(codes: string[], permissions: string[]) {
    return codes.every((code) => permissions.includes(code));
  }