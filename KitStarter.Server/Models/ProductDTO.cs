namespace KitStarter.Server.Models
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public int Cost { get; set; }
        public int Quantity { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }

        public string ImageBlack { get; set; }

        public string ImageWhite { get; set; }

        public string SelectedColor { get; set; }

        public override string ToString()
        {
            return $"{{Id: {Id}, Name: {Name}, Cost: {Cost}, Quantity: {Quantity}, SelectedColor: {SelectedColor}}}";
        }
    }
}