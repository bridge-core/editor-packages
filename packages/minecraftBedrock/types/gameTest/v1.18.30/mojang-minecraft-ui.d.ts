// Type definitions for Minecraft Bedrock Edition script APIs (experimental) 0.1
// Project: https://docs.microsoft.com/minecraft/creator/
// Definitions by: Jake Shirley <https://github.com/JakeShirley>
//                 Mike Ammerlaan <https://github.com/mammerla>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* *****************************************************************************
   Copyright (c) Microsoft Corporation.
   ***************************************************************************** */

declare module 'mojang-minecraft-ui' {
	import * as mojangminecraft from 'mojang-minecraft'
	/**
	 * Builds a simple player form with buttons that let the player
	 * take action.
	 */
	export class ActionFormData {
		/**
		 * @remarks
		 * Method that sets the body text for the modal form.
		 * @param bodyText
		 */
		body(bodyText: string): ActionFormData
		/**
		 * @remarks
		 * Adds a button to this form with an icon from a resource
		 * pack.
		 * @param text
		 * @param iconPath
		 */
		button(text: string, iconPath?: string): ActionFormData
		/**
		 * @remarks
		 * Creates a new modal form builder.
		 */
		constructor()
		/**
		 * @remarks
		 * Creates and shows this modal popup form. Returns
		 * asynchronously when the player confirms or cancels the
		 * dialog.
		 * @param player
		 * Player to show this dialog to.
		 * @throws This function can throw errors.
		 */
		show(player: mojangminecraft.Player): Promise<ActionFormResponse>
		/**
		 * @remarks
		 * This builder method sets the title for the modal dialog.
		 * @param titleText
		 */
		title(titleText: string): ActionFormData
	}
	/**
	 * Returns data about the player results from a modal action
	 * form.
	 */
	export class ActionFormResponse extends FormResponse {
		/**
		 * If true, the form was canceled by the player (e.g., they
		 * selected the pop-up X close button).
		 */
		readonly 'isCanceled': boolean
		/**
		 * Returns the index of the button that was pushed.
		 */
		readonly 'selection': number
		protected constructor()
	}
	/**
	 * Base type for a form response.
	 */
	export class FormResponse {
		/**
		 * If true, the form was canceled by the player (e.g., they
		 * selected the pop-up X close button).
		 */
		readonly 'isCanceled': boolean
		protected constructor()
	}
	/**
	 * Builds a simple two-button modal dialog.
	 */
	export class MessageFormData {
		/**
		 * @remarks
		 * Method that sets the body text for the modal form.
		 * @param bodyText
		 */
		body(bodyText: string): MessageFormData
		/**
		 * @remarks
		 * Method that sets the text for the first button of the
		 * dialog.
		 * @param text
		 */
		button1(text: string): MessageFormData
		/**
		 * @remarks
		 * This method sets the text for the second button on the
		 * dialog.
		 * @param text
		 */
		button2(text: string): MessageFormData
		/**
		 * @remarks
		 * Creates a new modal form builder.
		 */
		constructor()
		/**
		 * @remarks
		 * Creates and shows this modal popup form. Returns
		 * asynchronously when the player confirms or cancels the
		 * dialog.
		 * @param player
		 * Player to show this dialog to.
		 * @throws This function can throw errors.
		 */
		show(player: mojangminecraft.Player): Promise<MessageFormResponse>
		/**
		 * @remarks
		 * This builder method sets the title for the modal dialog.
		 * @param titleText
		 */
		title(titleText: string): MessageFormData
	}
	/**
	 * Returns data about the player results from a modal message
	 * form.
	 */
	export class MessageFormResponse extends FormResponse {
		/**
		 * If true, the form was canceled by the player (e.g., they
		 * selected the pop-up X close button).
		 */
		readonly 'isCanceled': boolean
		/**
		 * Returns the index of the button that was pushed.
		 */
		readonly 'selection': number
		protected constructor()
	}
	/**
	 * Used to create a fully customizable pop-up form for a
	 * player.
	 */
	export class ModalFormData {
		/**
		 * @remarks
		 * Creates a new modal form builder.
		 */
		constructor()
		/**
		 * @remarks
		 * Adds a dropdown with choices to the form.
		 * @param label
		 * @param options
		 * @param defaultValueIndex
		 */
		dropdown(
			label: string,
			options: string[],
			defaultValueIndex?: number
		): ModalFormData
		/**
		 * @remarks
		 * Adds an icon to the form using a graphic resource from a
		 * resource pack.
		 * @param iconPath
		 */
		icon(iconPath: string): ModalFormData
		/**
		 * @remarks
		 * Creates and shows this modal popup form. Returns
		 * asynchronously when the player confirms or cancels the
		 * dialog.
		 * @param player
		 * Player to show this dialog to.
		 * @throws This function can throw errors.
		 */
		show(player: mojangminecraft.Player): Promise<ModalFormResponse>
		/**
		 * @remarks
		 * Adds a numeric slider to the form.
		 * @param label
		 * @param minimumValue
		 * @param maximumValue
		 * @param valueStep
		 * @param defaultValue
		 */
		slider(
			label: string,
			minimumValue: number,
			maximumValue: number,
			valueStep: number,
			defaultValue?: number
		): ModalFormData
		/**
		 * @remarks
		 * Adds a textbox to the form.
		 * @param label
		 * @param placeholderText
		 * @param defaultValue
		 */
		textField(
			label: string,
			placeholderText: string,
			defaultValue?: string
		): ModalFormData
		/**
		 * @remarks
		 * This builder method sets the title for the modal dialog.
		 * @param titleText
		 */
		title(titleText: string): ModalFormData
		/**
		 * @remarks
		 * Adds a toggle checkbox button to the form.
		 * @param label
		 * @param defaultValue
		 */
		toggle(label: string, defaultValue?: boolean): ModalFormData
	}
	/**
	 * Returns data about player responses to a modal form.
	 */
	export class ModalFormResponse extends FormResponse {
		/**
		 * An ordered set of values based on the order of controls
		 * specified by ModalFormData.
		 */
		readonly 'formValues': any[]
		/**
		 * If true, the form was canceled by the player (e.g., they
		 * selected the pop-up X close button).
		 */
		readonly 'isCanceled': boolean
		protected constructor()
	}
}
