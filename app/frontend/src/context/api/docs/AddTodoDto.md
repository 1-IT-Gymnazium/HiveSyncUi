
# AddTodoDto


## Properties

Name | Type
------------ | -------------
`summary` | string
`description` | string
`dueAt` | Date
`projectId` | string
`sectionId` | string
`priorityId` | [TodoPriority](TodoPriority.md)
`stateId` | [TodoState](TodoState.md)

## Example

```typescript
import type { AddTodoDto } from ''

// TODO: Update the object below with actual values
const example = {
  "summary": null,
  "description": null,
  "dueAt": null,
  "projectId": null,
  "sectionId": null,
  "priorityId": null,
  "stateId": null,
} satisfies AddTodoDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AddTodoDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


