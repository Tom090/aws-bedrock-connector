import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { createAiEmbeddingsHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(createAiEmbeddingsHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should create AI embeddings successfully', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({ modelId: 'valid-model-id', body: 'input data for inference' }))
				.then(({ output }) => {
					const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue.statusCode).toEqual(200);
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);