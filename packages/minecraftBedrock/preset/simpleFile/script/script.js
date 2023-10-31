import { system, world } from '@minecraft/server'

// Subscribe to events to run code when specific in game actions occur
world.afterEvents.entitySpawn.subscribe((event) => {
	console.warn(event.entity.typeId + ' spawned!')
})

// Use system to execute code every tick or after delays
system.run(() => {
	// Code in here will be run every tick
})

// See more at https://wiki.bedrock.dev/scripting/script-server.html
