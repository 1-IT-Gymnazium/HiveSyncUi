
# SectionDetailDto


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`color` | string
`project` | [ProjectDetailDto](ProjectDetailDto.md)

## Example

```typescript
import type { SectionDetailDto } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "color": null,
  "project": null,
} satisfies SectionDetailDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SectionDetailDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


