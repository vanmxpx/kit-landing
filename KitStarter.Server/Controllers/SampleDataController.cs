using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using KitStarter.Server.Library.Configuration;
using KitStarter.Server.Models;
using KitStarter.Server.Tools.EmailSender;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using MimeKit;

namespace KitStarter.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private static string[] Summaries = new []
        {
            "Freezing",
            "Bracing",
            "Chilly",
            "Cool",
            "Mild",
            "Warm",
            "Balmy",
            "Hot",
            "Sweltering",
            "Scorching"
        };
        private readonly DefaultConfigProvider provider;

        public PurchaseController(DefaultConfigProvider provider)
        {
            this.provider = provider;
        }

        [HttpPost]
        public IActionResult ProcessPurchase(PurchaseDTO purchase)
        {
            EmailSender emailService = new MailKitSender(provider.STMPConnection);
            int timeout = provider.STMPConnection.TimeOut;
            var task = emailService.SendEmailAsync(purchase.Email, "Покупка совершена", purchase.Products);

            var cts = new CancellationTokenSource();

            try
            {
                // ***Set up the CancellationTokenSource to cancel after 2.5 seconds. (You
                // can adjust the time.)
                cts.CancelAfter(timeout);
                task.Wait();
            }
            catch (OperationCanceledException ex)
            {
                return NotFound("TimeoutException. " + ex.Message);
            }
            catch (Exception ex)
            {
                return NotFound("Request exception. " + ex.Message);
            }

            var task2 = emailService.SendEmailAsync(provider.STMPConnection.UserName, "Покупка совершена", purchase.Products);
            var cts2 = new CancellationTokenSource();

            try
            {
                // ***Set up the CancellationTokenSource to cancel after 2.5 seconds. (You
                // can adjust the time.)
                cts2.CancelAfter(timeout);
                task2.Wait(cts2.Token);
            }
            catch (OperationCanceledException ex)
            {
                return NotFound("TimeoutException. " + ex.Message);
            }
            catch (Exception ex)
            {
                return NotFound("Request exception. " + ex.Message);
            }

            cts = null;
            return Ok();
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int) (TemperatureC / 0.5556);
                }
            }
        }
    }
}