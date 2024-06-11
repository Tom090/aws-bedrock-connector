import { OperationHandlerSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerSetup';
import { AWSBedrockConnectorAuth } from '../AWSBedrockConnectorAuth';
import { ListFoundationModelsDdlInput } from './input';
import { ListFoundationModelsDdlOutput } from './output';
import { globalConfigHttp } from '../GlobalConfig';
import { OperationHandlerResult, OperationHandlerError } from '@trayio/cdk-dsl/connector/operation/OperationHandler';

export const listFoundationModelsDdlHandler = OperationHandlerSetup.configureHandler<
	AWSBedrockConnectorAuth,
	ListFoundationModelsDdlInput,
	ListFoundationModelsDdlOutput
>((handler) =>
	handler.withGlobalConfiguration(globalConfigHttp).usingHttp((http) =>
		http
			.post('/model/list')
			.handleRequest((ctx, input, request) => {
				if (input.maxResults) {
					request = request.addQueryString('maxResults', input.maxResults.toString());
				}
				if (input.nextToken) {
					request = request.addQueryString('nextToken', input.nextToken);
				}
				return request.withoutBody();
			})
			.handleResponse((ctx, input, response) =>
				response
					.withErrorHandling(() => {
						const status = response.getStatusCode();
						if (status === 400) {
							return OperationHandlerResult.failure(
								OperationHandlerError.userInputError('ValidationException')
							);
						} else if (status === 500) {
							return OperationHandlerResult.failure(
								OperationHandlerError.apiError('InternalServerException')
							);
						} else if (status === 429) {
							return OperationHandlerResult.failure(
								OperationHandlerError.apiError('ThrottlingException')
							);
						} else if (status === 403) {
							return OperationHandlerResult.failure(
								OperationHandlerError.apiError('AccessDeniedException')
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