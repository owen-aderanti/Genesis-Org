public class AccountTriggerHandler {
    public static void CreateAccounts(List<Account> x){
        for (Account a : x){
            if (a.BillingState != a.ShippingState){
                a.ShippingState = a.BillingState;
            }
        }
    }
}