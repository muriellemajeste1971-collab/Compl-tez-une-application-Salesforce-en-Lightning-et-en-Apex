public with sharing class CaseSelector {
    public static List<Case> findCasesBySubject(Id accountId, String subjectSearchTerm) {
        return [SELECT Id, Subject, Status, Priority FROM Case WHERE AccountId = :accountId AND Subject LIKE :('%' + subjectSearchTerm + '%')];
    
    }
}