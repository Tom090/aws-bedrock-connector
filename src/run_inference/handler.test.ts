import { OperationHandlerTestSetup } from '@trayio/cdk-dsl/connector/operation/OperationHandlerTest';
import { OperationHandlerResult } from '@trayio/cdk-dsl/connector/operation/OperationHandler';
import { runInferenceHandler } from './handler';
import '@trayio/cdk-runtime/connector/operation/OperationHandlerTestRunner';

OperationHandlerTestSetup.configureHandlerTest(runInferenceHandler, (handlerTest) =>
	handlerTest
		.usingHandlerContext('test')
		.nothingBeforeAll()
		.testCase('should run inference successfully', (testCase) =>
			testCase
				.givenNothing()
				.when(() => ({
					assistantId: 'test-assistant-id',
					sessionId: 'test-session-id',
					inputText: 'Hello, how can I help you?'
				}))
				.then(({ output }) => {
					const outputValue = OperationHandlerResult.getSuccessfulValueOrFail(output);
					expect(outputValue.sessionId).toEqual('test-session-id');
					expect(outputValue.messages).toBeInstanceOf(Array);
				})
				.finallyDoNothing()
		)
		.nothingAfterAll()
);