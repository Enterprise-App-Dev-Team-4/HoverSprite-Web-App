package rmit.hoversprite.Model.User;

public interface User {
    public void login();

    public void giveFeedback();

    public void deleteOrder();

    public void updateOrder();

    public void setPassword(String password);

    public String getPassword();
}
