"use client"

import {
  useGetDropdownOrganizations,
  useSetActiveOrganization
} from "@/src/hooks/use-organizations"
import { getInitialUsername } from "@/src/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger
} from "../ui/select"
import { Skeleton } from "../ui/skeleton"

function OrganizationOptions() {
  const { data: dropdownData, isLoading } = useGetDropdownOrganizations()
  const { mutate, isPending } = useSetActiveOrganization()

  const handleSetActiveOrganization = (organization_id: string) => {
    mutate({ organization_id: Number(organization_id) })
  }

  const currentDropdown = dropdownData?.data?.meta
  const activeOrgId = currentDropdown?.active_organization_info.id
  const dropdownOrgList = dropdownData?.data?.organizations

  if (isLoading || !dropdownData) return <Skeleton className="h-8 w-48 md:w-60" />

  return (
    <Select
      value={String(activeOrgId ?? "")}
      onValueChange={handleSetActiveOrganization}
      disabled={isPending}
    >
      <SelectTrigger className="w-full max-w-48 focus:ring-0 focus-visible:ring-0 md:max-w-60">
        <div className="flex items-center gap-2">
          <Avatar size="sm" className="rounded-sm">
            <AvatarImage src={currentDropdown?.active_organization_info.full_logo_url ?? ""} />
            <AvatarFallback className="rounded-sm">
              {getInitialUsername(currentDropdown?.active_organization_info.text ?? "")}
            </AvatarFallback>
          </Avatar>
          <span
            className="max-w-48 truncate md:max-w-52"
            title={currentDropdown?.active_organization_info.text}
          >
            {currentDropdown?.active_organization_info.text}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          {dropdownOrgList && dropdownOrgList.length > 0 ? (
            <>
              <SelectLabel>Organizations</SelectLabel>
              {dropdownOrgList.map((org) => (
                <SelectItem value={String(org.id)} key={org.id}>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" className="rounded-sm">
                      <AvatarImage src={org.full_logo_url ?? ""} />
                      <AvatarFallback className="rounded-sm">
                        {getInitialUsername(org.text)}
                      </AvatarFallback>
                    </Avatar>
                    <span title={org.text} className="max-w-48 truncate md:max-w-52">
                      {org.text}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </>
          ) : (
            <p className="text-muted-foreground py-3 text-center text-xs font-semibold">
              There is no other organization.
            </p>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default OrganizationOptions
