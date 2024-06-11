import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { listFoundationModelsDdlHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(listFoundationModelsDdlHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should retrieve a list of foundation models', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({}))
				.then(({ output }) => {
					const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue.models).toBeInstanceOf(Array);
					// Additional assertions can be added here based on the expected structure of the models
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);