interface Link {
  label: string
  href: string
}

const navLinks: Link[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Tasks', href: '/tasks' }
]

const taskSample = {
  title: 'Implement User Authentication System',
  description:
    "In this task, you are required to implement a comprehensive user authentication system for a new web application. Our project aims to provide users with secure access to our service, protecting their information from unauthorized access. You'll be responsible for creating both the backend and frontend components necessary for users to register, login, and manage their account information."
}

const taskTableFields = ['Task', 'Team', 'Status', 'Priority', 'Created', 'Deadline']

export { navLinks, taskSample, taskTableFields }
