using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using KitStarter.Server.Library.Configuration;
using KitStarter.Server.Models;
using Microsoft.AspNetCore.Hosting;

namespace KitStarter.Server.Services
{
    public class EmailBodyBuilder
    {
        private readonly string templatesPath;
        private const string ExternalHtml = "external.html";
        private const string InternalHtml = "internal.html";
        private const string ProductHtml = "cart-item.html";
        private const string StylesCss = "styles.css";    

            // Product
        // {0}: product Name
        // {1}: product Description
        // {2}: product Quantity
        // {3}: product Cost
        // {4}: product Image
        // {5}: color product class

            // External body
        // {0}: Total Amount
        // {1}: Recipient Name
        // <<products>>: Purchased Products

        
            // Internal body
        // {0}: Total Amount
        // {1}: Recipient Name
        // {2}: Recipient Email
        // {3}: Recipient PhoneNumber
        // {4}: Recipient PaymentMethod
        // {5}: Recipient DeliveryMethod
        // {6}: Recipient Address
        // {7}: Recipient Comment

        // <<products>>: Purchased Products

        public EmailBodyBuilder(IHostingEnvironment hostingEnvironment)
        {
            templatesPath = hostingEnvironment.ContentRootPath + @"\EmailTemplates\";
        }

        public string Create(EmailType type, PurchaseDTO purchase)
        {

            string products = PrepareProducts(purchase.Products);
            string body = PrepareBody(type, purchase);

            body = body.Replace(@"<<products>>", products);
            return body;
        }

        private string PrepareProducts(List<ProductDTO> products)
        {
            StringBuilder productsHtml = new StringBuilder();
            string productTemplate = string.Empty;
            using (StreamReader sourceReader = System.IO.File.OpenText(templatesPath + ProductHtml))
            {
                productTemplate = sourceReader.ReadToEnd();
            }
            foreach (ProductDTO product in products)
            {
                var generated = string.Format(productTemplate,
                        product.Name,
                        product.Description,
                        product.Quantity,
                        product.Cost,
                        product.SelectedColor == "white" ? product.ImageWhite : product.ImageBlack,
                        product.SelectedColor);
                productsHtml.AppendLine(generated);
            }

            return productsHtml.ToString();
        }

        private string PrepareBody(EmailType type, PurchaseDTO purchase)
        {
            string bodyTemplate = string.Empty;
            string generated = string.Empty;
            string styles = string.Empty;
            int total = purchase.Products.Sum(val => val.Cost * val.Quantity);
            using (StreamReader sourceReader = System.IO.File.OpenText(templatesPath + StylesCss))
            {
                styles = sourceReader.ReadToEnd();
            }
            if (type == EmailType.External) 
            {
                using (StreamReader sourceReader = System.IO.File.OpenText(templatesPath + ExternalHtml))
                {
                    bodyTemplate = sourceReader.ReadToEnd();
                }

                generated = string.Format(bodyTemplate, 
                        styles,
                        total,
                        purchase.Credentials.Name);
            }
            else 
            { 
                using (StreamReader sourceReader = System.IO.File.OpenText(templatesPath + InternalHtml))
                {
                    bodyTemplate = sourceReader.ReadToEnd();
                }
                generated = string.Format(bodyTemplate, 
                        styles,
                        total,
                        purchase.Credentials.Name,
                        purchase.Credentials.Email,
                        purchase.Credentials.PhoneNumber,
                        purchase.PaymentMethod,
                        purchase.DeliveryMethod,
                        purchase.Credentials.Address,
                        purchase.Comment);
            }

            return generated;
        }
    }
}