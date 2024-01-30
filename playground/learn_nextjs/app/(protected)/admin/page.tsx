'use client'

import { UserRole } from '.prisma/client'
import { RoleGate } from '@/components/auth/role-gate'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch('/api/admin').then((res) => {
      if (res.ok) {
        console.log('OK')
      } else {
        console.log('Forbidden')
      }
    })
  }

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only server action</p>
          <Button>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdminPage
