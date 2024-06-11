export type RunInferenceInput = {
	/**
	 * @title Assistant ID
	 * @description The identifier of the conversational agent
	 */
	assistantId: string;
	/**
	 * @title Session ID
	 * @description The identifier of the session
	 */
	sessionId: string;
	/**
	 * @title Input Text
	 * @description The user's input text
	 */
	inputText: string;
	/**
	 * @title Locale ID
	 * @description The locale of the input text
	 * @default en_US
	 */
	localeId?: string;
	/**
	 * @title Request Attributes
	 * @description Additional information to pass to the agent
	 */
	requestAttributes?: Record<string, any>;
	/**
	 * @title Response Attributes
	 * @description Attributes to be returned in the response
	 */
	responseAttributes?: any[];
};