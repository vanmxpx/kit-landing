using System.Collections.Generic;

namespace KitStarter.Server.Models
{
    public class PurchaseDTO
    {
        public CredentialsDTO Credentials { get; set; }
        public List<ProductDTO> Products { get; set; }

        public override string ToString()
        {
            return $"\r\n ------ \r\nCredentials: {Credentials.ToString()} \r\nProducts: {Products.ToString()}\r\n ------ \r\n";
        }
    }

    public class CredentialsDTO
    {
        public string Email { get; set; }
        public string Name { get; set; }

        public override string ToString()
        {
            return $"\r\nEmail: {Email} \r\nName: {Name} \r\n";
        }
    }
}