using System.Collections.Generic;
using System.IO;
using System.Text;
using KitStarter.Server.Library.Configuration;
using KitStarter.Server.Models;
using Microsoft.AspNetCore.Hosting;

namespace KitStarter.Server.Services
{
    public class EmailBodyBuilder
    {
        private readonly string templatesPath;
        private readonly DefaultConfigProvider provider;

        // {0}: product Name
        // {1}: product Description
        // {2}: product Quantity
        // {3}: product Cost
        // {4}: product Image
        // {5}: color product class 

        public EmailBodyBuilder(IHostingEnvironment hostingEnvironment)
        {
            templatesPath = hostingEnvironment.ContentRootPath + @"\EmailTemplates\";
        }
        public string Create(List<ProductDTO> products)
        {
            StringBuilder builder = new StringBuilder();
            return builder.ToString();
        }
    }
}