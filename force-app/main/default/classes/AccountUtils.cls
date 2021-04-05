public class AccountUtils {
    public static List<Account> accountsByState(string State){
        List<Account> accs = new List<Account>();
        
        accs = [SELECT ID, Name FROM Account WHERE BillingState = :State];
        
        return accs;
    }
}