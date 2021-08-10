# Experimental Toggles

To check whether an experimental toggle is enabled in a schema:
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
                    "$ref": ".../project/experiments/holidayCreatorFetaures.json", // This would be a relative import to the file
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

If the experimental toggle is removed in Minecraft, the `if` boolean should be set to `true` in the corresponding file.

Experimental toggles can be added in the `experimentalToggles.json` file.