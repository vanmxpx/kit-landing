namespace KitStarter.Server.Models
{
    public class OfferCallDTO
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }

        public override string ToString()
        {
            return $"Name: {Name}, PhoneNumber: {PhoneNumber}";
        }
    }
}