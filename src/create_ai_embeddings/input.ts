export type CreateAiEmbeddingsInput = {
	/**
	 * @title Model ID
	 * @description The unique identifier for the model
	 */
	modelId: string;
	/**
	 * @title Body
	 * @description The input data to be passed to the model for inference
	 */
	body: string;
};