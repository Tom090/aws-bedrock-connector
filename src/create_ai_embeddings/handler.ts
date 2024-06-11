import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { AWSBedrockConnectorAuth } from '../AWSBedrockConnectorAuth';
import { CreateAiEmbeddingsInput } from './input';
import { CreateAiEmbeddingsOutput } from './output';
import { globalConfigHttp } from '../GlobalConfig';
import { OperationHandlerResult, OperationHandlerError } from '@trayio/cdk-dsl/connector/operation/OperationHandler';

export const createAiEmbeddingsHandler = OperationHandlerSetup.configureHandler<
	AWSBedrockConnectorAuth,
	CreateAiEmbeddingsInput,
	CreateAiEmbeddingsOutput
>((handler) =>
	handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
		http
			.post('/model/invoke')
			.handleRequest((ctx, input, request) =>
				request
					.withBearerToken(ctx.auth!.user.access_token)
					.withBodyAsJson({ modelId: input.modelId, body: input.body })
			)
			.handleResponse((ctx, input, response) =>
				response
					.withErrorHandling(() => {
						const status = response.getStatusCode();
						if (status === 400) {
							return OperationHandlerResult.failure(
								OperationHandlerError.userInputError('ValidationException')
							);
						} else if (status === 404) {
							return OperationHandlerResult.failure(
								OperationHandlerError.userInputError('ResourceNotFoundException')
							);
						} else if (status === 500) {
							return OperationHandlerResult.failure(
								OperationHandlerError.apiError('InternalServerException')
							);
						} else if (status === 429) {
							return OperationHandlerResult.failure(
								OperationHandlerError.apiError('ThrottlingException')
							);
						}
						return OperationHandlerResult.failure(
							OperationHandlerError.apiError(`API error: ${status}`)
						);
					})
					.parseWithBodyAsJson()
			)
	)
);