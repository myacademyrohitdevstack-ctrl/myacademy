import useAuthStore from "@/store/authStore";
import { useAcademyProfile } from "./useAcademy";

export function usePermissions() {
  const user = useAuthStore((state) => state.user);
  const { data: academy } = useAcademyProfile();

  const isSuperAdmin =
    user?.platformRole === "super_admin" || user?.role === "super_admin";

  const ownerId = academy?.owner?._id || academy?.owner;
  const userId = user?._id || user?.id;

  const isOwner =
    isSuperAdmin ||
    (user?.role === "admin" &&
      (!ownerId || String(ownerId) === String(userId)));

  const isStaff = user?.role === "academy_staff";

  const hasPermission = (permission) => {
    if (!user) return false;
    if (isSuperAdmin) return true;
    if (user.role === "admin") return true;
    if (isStaff) {
      if (!Array.isArray(user.permissions)) return false;
      return user.permissions.includes(permission);
    }
    return false;
  };

  const hasAnyPermission = (...permissions) => {
    return permissions.some((p) => hasPermission(p));
  };

  return {
    user,
    academy,
    isSuperAdmin,
    isOwner,
    isStaff,
    hasPermission,
    hasAnyPermission,
  };
}

export function useHasPermission(permission) {
  const { hasPermission } = usePermissions();
  return hasPermission(permission);
}

export function useIsOwner() {
  const { isOwner } = usePermissions();
  return isOwner;
}
