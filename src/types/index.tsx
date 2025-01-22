import type { ReactNode } from "react"

// Department and Team types
export type Department = "Frontend" | "Backend" | "DevOps" | "HR" | "QA"

export interface Team {
  name: string
  department: Department
}

// Task and Step types
export interface Task {
  id: string
  description: string
  completed: boolean
}

export interface Step {
  title: string
  overview: string
  icon?: React.ReactNode
  content: ContentItem[]
  tasks: Task[]
}

export interface ContentItem {
  title?: string
  overview: string
  image?: string
  imageAlt?: string
  resources?: Resource[]
  requiredRepos?: string[]
  optionalRepos?: string[]
  libraries?: string[]
  environments?: string[]
  jiraProcess?: string[]
  steps?: string[]
}

export interface Resource {
  title: string
  link: string
}

// Component Props interfaces
export interface DescriptionProps {
  content: ContentItem[]
  tasks: Task[]
  onTaskComplete: (taskId: string, completed: boolean) => void
}

export interface SearchBarProps {
  onSearch: (query: string) => void
  className?: string
}

export interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick: (index: number) => void
  completedSteps: number[]
}

export interface SidebarItem {
  name: string
  icon?: React.ReactNode
  items?: SidebarItem[]
}

export interface SidebarProps {
  items: SidebarItem[]
  onItemSelect: (item: string) => void
  side: "left" | "right"
  header?: React.ReactNode
  className?: string
}

