import { Permission, ROLE_PERMISSIONS } from "../config/permissions"
import { useOrganization } from "../context/organization-context"
import { Role } from "../types/member"

const usePermission = () => {
  const { organization } = useOrganization()

  const currentRole = organization.current_user_role as Role

  /**
   * Checks if the current user has the given permission.
   *
   * @param {Permission} permission The permission to check for.
   * @returns {boolean} True if the current user has the given permission, false otherwise.
   */
  const can = (permission: Permission): boolean => {
    const allowedPermissions = ROLE_PERMISSIONS[currentRole] || []
    return allowedPermissions.includes(permission)
  }

  /**
   * Checks if the current user has the given role.
   *
   * @param role The role to check for.
   * @returns True if the current user has the given role, false otherwise.
   */
  const is = (role: Role): boolean => {
    return currentRole === role
  }

  return {
    can,
    is,
    role: currentRole
  }
}

export { usePermission }
