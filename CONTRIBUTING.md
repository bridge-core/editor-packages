# Contributing

Thank you for considering to contribute to bridge.'s editor data

## Schema Style

It should be noted that bridge.'s data uses draft 07 of the json schema standard. This should be specified at the top of every schema file with the line:
`"$schema": "http://json-schema.org/draft-07/schema"`

### Title

Titles of objects should be added to all objects and should be capitalised versions of the property key with the following exceptions:
- Abbreviations such as `min` or `max` replaced with `minimum` and `maximum`, with exceptions such as `HUD`, `FOV` etc. These exceptions should just be capitalised
- Event triggers should be prefixed with `Event: `, e.g. property `on_consume` should have a title of `Event: On Consume`

### Description

Descriptions should be copied exactly from the Add-On documentation, if no description exists, omit the field. All descriptions should:
- End with `.`
- Begin with a capital letter
- Have all occurences of `"` replaced with `'`

### Default

Whenever a default value is specified in the Add-On documentation, this should be specified with the `default` field. If the data dype is a `number`, add `.0` after the value. If the data type is a `integer`, ensure there are no decimal points in the value.

### Conditional Schemas

Across our schemas, we use a conditional schemas to propose auto-completions based on format version and experimental gameplay toggles.

#### Format Verison

Format version filtering should be done at the root of the schema where possible, using an `if` schema containing an `enum` of the format versions to validate for. See [the entity versioning implementation](https://github.com/bridge-core/editor-packages/blob/main/packages/minecraftBedrock/schema/entity/main.json) for an example.
All new features introduced should be versioned unless they are minor description changes, in which case the original schema can be modified.

If something is removed, we use the `doNotSuggest` and `deprecationMessage` fields to show a deprecation message. For consistency, this message should be in the format:
- `Deprecated as of v{VERSION} - {ORIGINAL DESCRIPTION}.`, **or**
- `Deprecated in favor of {REPLACEMENT PROPERTY} (format_version: v{FORMAT VERSION OF NEW PROPERTY}).`

To keep our versioning consistent, the structure should be as follows:
- A `main.json` file in the root of the file type's schema folder. This is where the versioning takes place.
- At the same level as this file, there is a directory for each version, e.g. `entity/v1.16.0`.
- In this directory there is another `main.json` file which is the root file for that version which is referenced by the `main.json` file in the root of the file type's schema folder.

#### Experimental Gameplay

We also filter schemas based on experimental gameplay toggles set in the project config. To be able to react to this in our schemas, we generate a schema file for each experimental gameplay file containing an `if` field set to `true` or `false` depending on whether the toggle is enabled or not. This allows us to conditionally apply schemas like this:

```json
{
    "$schema": "http://json-schema.org/draft-07/schema",
    "properties": {
        "minecraft:a_component": {
            "type": "object",
            "allOf": [
                {
                    // Default properties
                    "properties": {
                        "bool": {
                            "type": "boolean"
                        },
                        "string": {
                            "type": "string"
                        }
                    }
                },
                {
                    // HCF properties
                    "$ref": "../../project/experiments/holidayCreatorFetaures.json", // This would be a relative import to the file
                    "then": {
                        "properties": {
                            "secret": {
                                "type": "integer"
                            }
                        }
                    }
                }
            ]
        }
    }
}
```

If the experimental toggle is removed in Minecraft, the `if` boolean should be set to `true` in the corresponding file. This is so the schemas that are locked behind the toggle are permanently unlocked.

To add a new experimental toggle:
- Specify an `icon` and `id` in `experimentalToggles.json`
- Add a `name` and `description` in the `en.ts` locale file
- Add a schemaScript to `schemaScript/general/experimentalGameplay` to generate the schema

Experimental toggles can be added in the `experimentalToggles.json` file.

_Note: After using `$ref` to query the experimental toggle, all `$ref` fields within the `then` or `else` properties should be absoloute paths, e.g. `/data/packages/minecraftBedrock/schema/block/v1.16.0/main.json`_

### Dynamic Schemas

bridge. generates schemas dynamically so we can propose auto-completions relative to the context of the project and currently opened file. Dynamic schemas are generated in the `dynamic` folder of each file type. The dynamic folder also contains an additonal `currentContext` folder which contains the dynamic data fetched from the current file.

To use these dynamic auto-completions in schemas, the dynamic schemas in the `dynamic` folders can be directly referenced. However, for dynamic references such as identifiers, you should instead reference the identifier reference file in `general/reference/identifiers.json` which contains definitions for a variety of identifiers.

If there is dynamic data that is not already being collected that you want to reference, you can add new lightning cache definitions in the `lightningCache/<FILE_TYPE>.json` files.



If you have any other questions on editing bridge.'s data, feel free to ask us in our Discord server.