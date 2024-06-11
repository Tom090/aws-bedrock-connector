import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { AWSBedrockConnectorAuth } from '../AWSBedrockConnectorAuth';
import { RunInferenceInput } from './input';
import { RunInferenceOutput } from './output';
import { globalConfigHttp } from '../GlobalConfig';
import { OperationHandlerResult, OperationHandlerError } from '@trayio/cdk-dsl/connector/operation/OperationHandler';

export const runInferenceHandler = OperationHandlerSetup.configureHandler<
	AWSBedrockConnectorAuth,
	RunInferenceInput,
	RunInferenceOutput
>((handler) =>
	handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
		http
			.post('/runtime/converse')
			.handleRequest((ctx, input, request) => {
				request = request.withBodyAsJson({
					assistantId: input.assistantId,
					sessionId: input.sessionId,
					inputText: input.inputText,
				});

				if (input.localeId) {
					request = request.addQueryString('localeId', input.localeId);
				}

				if (input.requestAttributes) {
					request = request.addQueryString('requestAttributes', JSON.stringify(input.requestAttributes));
				}

				if (input.responseAttributes) {
					request = request.addQueryString('responseAttributes', JSON.stringify(input.responseAttributes));
				}

				return request;
			})
			.handleResponse((ctx, input, response) =>
				response
					.withErrorHandling(() => {
						const status = response.getStatusCode();

						if (status === 400) {
							return OperationHandlerResult.failure(
								OperationHandlerError.userInputError('ValidationException')
							);
						}
						if (status === 404) {
							return OperationHandlerResult.failure(
								OperationHandlerError.userInputError('ResourceNotFoundException')
							);
						}
						if (status === 500) {
							return OperationHandlerResult.failure(
								OperationHandlerError.apiError('InternalServerException')
							);
						}
						if (status === 429) {
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
