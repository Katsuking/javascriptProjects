import { auth, signOut } from '@/auth'

const SettingsPage = async () => {
  const session = await auth()

  return (
    <div className="bg-white p-10 rounded-xl">
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <button typeof="submit">Sign out</button>
      </form>
    </div>
  )
}

export default SettingsPage
