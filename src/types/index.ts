export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type MeasureStatus = 'draft' | 'review' | 'published' | 'rejected'
export type ParameterType = 'table_column' | 'table' | 'value' | 'text'

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
}

export interface Tag {
  name: string
  slug: string
}

export interface DaxFunction {
  name: string
  docs_url: string | null
}

export interface Parameter {
  id: string
  key: string
  label: string
  placeholder: string | null
  description: string | null
  type: ParameterType
  required: boolean
  sort_order: number
}

export interface ExampleTable {
  headers: string[]
  rows: string[][]
  highlight_last?: boolean
}

export interface Measure {
  id: string
  name: string
  slug: string
  description: string
  use_cases: string | null
  script_template: string
  script_example: string
  example_table: ExampleTable | null
  category_id: string
  category_name: string
  category_slug: string
  category_icon: string | null
  category_color: string | null
  status: MeasureStatus
  difficulty: Difficulty
  view_count: number
  copy_count: number
  tags: Tag[]
  dax_functions: DaxFunction[]
  created_at: string
  updated_at: string
}

export interface MeasureWithParams extends Measure {
  parameters: Parameter[]
}
