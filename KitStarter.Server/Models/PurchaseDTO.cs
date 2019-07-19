using System.Collections.Generic;

namespace KitStarter.Server.Models
{
    public class PurchaseDTO
    {
        public CredentialsDTO Credentials { get; set; }
        public List<ProductDTO> Products { get; set; }
        public string Comment { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public DeliveryMethod DeliveryMethod { get; set; }

        public override string ToString()
        {
            return $"\r\n ------ \r\nCredentials: {Credentials.ToString()} \r\nDeliveryMethod: {DeliveryMethod.ToString()} \r\nPaymentMethod: {PaymentMethod.ToString()} \r\nComment: {Comment} \r\nProducts: {Products.ToString()}\r\n ------ \r\n";
        }
    }

    public class CredentialsDTO
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public override string ToString()
        {
            return $"\r\nEmail: {Email} \r\nName: {Name} \r\nPhoneNumber: {PhoneNumber} \r\nAddress: {Address} \r\n";
        }
    }

    public enum PaymentMethod
    {
        VisaMastercard,
        Cash
    }
    public enum DeliveryMethod
    {
        Post,
        Own
    }
}