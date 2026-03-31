
# TodoDetailDto


## Properties

Name | Type
------------ | -------------
`id` | string
`summary` | string
`description` | string
`dueAt` | Date
`priority` | [TodoPriority](TodoPriority.md)
`state` | [TodoState](TodoState.md)
`project` | [ProjectDetailDto](ProjectDetailDto.md)
`section` | [SectionDetailDto](SectionDetailDto.md)

## Example

```typescript
import type { TodoDetailDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "summary": null,
  "description": null,
  "dueAt": null,
  "priority": null,
  "state": null,
  "project": null,
  "section": null,
} satisfies TodoDetailDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TodoDetailDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


