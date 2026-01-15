@IsTest
private class AccountCasesControllerTest {

    @TestSetup
    static void setup() {
        Account testAccount = TestDataFactory.createTestAccount();
        TestDataFactory.createTestCase(testAccount.Id, 'Structural failure of generator base');
    }

    @IsTest
    static void testFindCasesBySubject() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];

        Test.startTest();
        List<Case> results = AccountCasesController.findCasesBySubject(testAccount.Id, 'failure');
        Test.stopTest();

        System.assertEquals(1, results.size(), 'Should return one case');
    }
}
