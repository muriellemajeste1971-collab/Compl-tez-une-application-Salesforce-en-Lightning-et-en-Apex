@IsTest
private class CaseSelectorTest {

    @TestSetup
    static void setup() {
        Account testAccount = TestDataFactory.createTestAccount();
        TestDataFactory.createTestCase(testAccount.Id, 'Structural failure of generator base');
    }

    @IsTest
    static void testFindCasesBySubject() {
        Account testAccount = [SELECT Id FROM Account LIMIT 1];

        Test.startTest();
        List<Case> results = CaseSelector.findCasesBySubject(testAccount.Id, 'failure');
        Test.stopTest();

        System.assertNotEquals(0, results.size(), 'Should return at least one case');
    }
}
