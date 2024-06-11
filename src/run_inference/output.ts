export type RunInferenceOutput = {
	sessionId: string;
	messages: {
		contentType: string;
		content: string;
	}[];
	responseAttributes: Record<string, any>;
	sessionState: {
		sessionAttributes: Record<string, any>;
		dialogAction: {
			type: string;
		};
	};
};